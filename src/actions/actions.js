import {SIGNUP_REQUEST, SENDING_REQUEST, SET_AUTH, LOGIN_REQUEST, SESSION_REQUEST} from './constants';


/**
 * Sets the `currentlySending` state, which displays loading indicator during requests
 * @param {boolean} sending       if true, a request is being sent
 */
export function sendingRequest(sending){
  return {type:SENDING_REQUEST, sending};
}

/**
 * Sets authentication state
 * @param {boolean} loggedUser   true if user is logged in 
 */
export function setAuthState(loggedUser) {
  console.log("\n:::::::::::::::::SET AUTH STATE?? \n")
  return {type:SET_AUTH, loggedUser};
}

/**  
* We want to signup a user
* @param {object} data            data used for signing up the user
* @param {string} data.name       user's name
* @param {string} data.username   user's username
* @param {string} data.password   user's password
* @param {string} data.email      user's email
* @param {string} data.country    user's country
*/
export function signupRequest(data){
  return {type:SIGNUP_REQUEST, data};
}

/**
 * We want to login a user
 * @param {object} data           data used for login the user
 * @param {string} data.username  user's username
 * @param {string} data.password  user's password
 */

 export function loginRequest(){
   return {type:LOGIN_REQUEST, data}
 }

 /**
  * We want to figure out if a user has an active session in server
  */

  export function sessionRequest(){
    return {type:SESSION_REQUEST};
  }