import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {signupRequest} from '../../actions/actions';
import UserInfoForm from '../UserInfoForm';
import Button from '../ui/Button';
import Facebook from '../../utils/Facebook';

const testMode = true;
const Signup = ({dispatch, data})=>{
  const [serverError, setServerError] = useState();
  const defaultData = process.env.NODE_ENV === 'development' && testMode ? {
    fullName:'Iris Vergara',
    email: 'iris@iris.com',
    username: 'superiris',
    country: 'Mexico', 
    password: 'Admin123',
    birthDay: '26',
    birthMonth: '8',
    birthYear: '1982'
  } : {};

  const submitForm = values => {
    console.log("submit")
    dispatch(signupRequest(values));
  };

  const initFacebook = ()=>{
    console.log('init from signup')
    Facebook.init();
  }

  if(!data.loggedState){
    return (
    <section>
      <h1>Signup</h1>
      <h2>Register with Facebook</h2>
      <Button onClick={initFacebook}>Facebook Yo!</Button>
      <h2>Register with your email</h2>
      <UserInfoForm onSubmit={submitForm} serverError={serverError} defaultData={defaultData} />
    </section>
    );
  }
  else{
    console.log("we are not redirecting now")
    //return <div>Go to login man</div>
    return <Redirect to={{ pathname: '/' }} />;
  }
}

function mapStateToProps(state) {
  return {
    data: state
  };
}

//connecting component to the store (https://react-redux.js.org/introduction/basic-tutorial)
export default connect(mapStateToProps)(Signup);