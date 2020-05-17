//https://developers.facebook.com/docs/facebook-login/web
const FB_AUTHORIZED = 'connected';
const FB_UNAUTHORIZED = 'not_authorized';
const FB_UNKNOWN = 'unknown';
const FB = global.FB;
const Facebook = {
  appId: '2918674861552290',
  apiVersion: 'v6.0',
  init() {
    console.log('init fb');
    return new Promise((res, rej) => {
      if (typeof document === 'undefined') {
        rej({ error: 'FB Login not available on SSR' });
      } else {
        try {
          window.fbAsyncInit = function() {
            console.log('fb async');
            FB.init({
              appId: Facebook.appId,
              cookie: true,
              xfbml: true,
              version: Facebook.apiVersion,
            });
            FB.getLoginStatus(function(response) {
              console.log("login status", response)
              res(response);
            });
          };
          console.log('----');
          //load FB SDK
          (function(d, s, id) {
            var js,
              fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
              return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
          })(document, 'script', 'facebook-jssdk');
        } catch (error) {
          rej(error);
        }
      }
    });
  },
};

export default Facebook;