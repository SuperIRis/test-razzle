import {SUCCESS_STATUS} from './constants';
import request from './request';

// we are saving the token in local storage
let localStorage;
if(global.process && process.env.NODE_ENV){
  //polyfill for testing
  localStorage = require('localStorage');
}
else{
  localStorage = global.window.localStorage;
}

const auth = {
  /**
   * Authorizing by login the user
   * @param {string} username  User's username 
   * @param {string} password  User's password 
   */
  login ({username, password}){
    console.log("logging in!!!")
    return request.post('mock/login.json', {username, password})
            .then(res=>{
              if (res.status === SUCCESS_STATUS) {
                if (res.result && res.result.token) {
                  localStorage.token = res.result.token;
                  localStorage.username = res.result.username || '';
                }
                return Promise.resolve(res);
              } else {
                return Promise.reject(res.error);
              }
            })
  },


  /**
   * Authorizing by signing up user
   * @param {string} username  User's username
   * @param {string} password  User's password
   * @param {string} email     User's email (only register)
   * @param {string} country   User's country (only register)
   * @param {string} name      User's name (only register)
   */
  signup ({username, password, email, country, fullName}){
    return request.post('mock/signup.json', {username, password, email, country, fullName})
            .then((res)=>{
              if (res.status === SUCCESS_STATUS) {
                return auth.login(username, password);
              } else {
                return Promise.reject(res.error);
              }
            });
  },

  /**
   * Authenticating users that have an active session
   */
  /**
   * @todo "Remember me" functionality, with a token in localStorage
   */
  checkIfUserIsAuthenticated (){
    return request.post('mock/auth.json').then(res => {
      if (res.status === SUCCESS_STATUS) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res.error);
      }
    });
  }
};

export default auth;