import {
  SIGNUP_REQUEST,
  SENDING_REQUEST,
  SET_AUTH,
  LOGIN_REQUEST,
  SESSION_REQUEST
} from '../actions/constants';
import {take, call, put, fork} from 'redux-saga/effects';
import auth from '../models/auth';

/**
 * Authorizing user
 * @param {object} data           User's data
 * @param {string} data.username  User's username
 * @param {string} data.password  User's password
 * @param {string} data.email     User's email (only register)
 * @param {string} data.country   User's country (only register)
 * @param {string} data.name      User's name (only register)
 * @param {object} options        Options
 * @param {string} authType       Can be either SIGNUP_REQUEST or LOGIN_REQUEST (default LOGIN_REQUEST)
 */

export function * authorize(data, authType){
  //We are sending a request, a chance to show loaders
  yield put({type:SENDING_REQUEST, sending:true});
  let response;
  try{
    if(authType === SIGNUP_REQUEST){
      response = yield call(auth.signup, data); 
    }
    else{
      response = yield call(auth.login, data);
    }
    return response;
  }
  catch (error){
    console.log("\noh no!");
    console.log(error);
  }
  finally{
    yield put({type:SENDING_REQUEST, sending: false});
  }
}

/**
 * Login saga
 */
export function * loginFlow(){
  //this saga is always listening for actions
  //the while will not go infinite since as a generator this stops each yield
  while(true){
    // Listening for `LOGIN_REQUEST` actions and copying its payload to `data`
    const request = yield take(LOGIN_REQUEST);
    const data = {...request.data};
    // We call the `authorize` task with the data, and the type (since `authorize` also signs up)
    // Returns `true` if the login was successful, `false` if not
    const success = yield call(authorize, data, LOGIN_REQUEST);

    if (success){
      yield put({ type: SET_AUTH, loggedState: true }); // User is logged in (authorized) after being registered
    }

  }
}
/**
 * Signup saga
 */
export function * signupFlow(){
  //this saga is always listening for actions
  //the while will not go infinite since as a generator this stops each yield
  while(true){
    const request = yield take(SIGNUP_REQUEST);
    const data = {...request.data};
    const success = yield call(authorize, data, SIGNUP_REQUEST);
    if(success){
      console.log("USER IS REGISTERED AND LOGGED!");
      yield put({type:SET_AUTH, loggedState:true});
    }
  }
}

export function * getSession(){
  try {
    return yield call(auth.checkIfUserIsAuthenticated);
  }
  catch (error) {
    console.log("\noh no!");
    console.log(error);
  }
}

/**
 * Check if user has active session
 */

export function * sessionFlow(){
  while (true){
    const request = yield take(SESSION_REQUEST);
    const success = yield call(getSession);
    if(success){
      yield put({ type: SET_AUTH, loggedState: true });
    }
  }
}


// Fork all sagas here, so they are listening since the start
export default function * root(){
  yield fork(signupFlow);
  yield fork(loginFlow);
  yield fork(sessionFlow);
}