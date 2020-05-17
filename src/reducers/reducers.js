import {SENDING_REQUEST, SET_AUTH} from '../actions/constants';

const initialState = {
  loggedState: false,
  sending: false
}

function reducer( state = initialState, action){
  switch (action.type) {
    case SENDING_REQUEST:
      return {...state, sending:action.sending}
    case SET_AUTH:
      return {...state, loggedState:action.loggedState}
    default:
      return state;
  }
}

export default reducer;