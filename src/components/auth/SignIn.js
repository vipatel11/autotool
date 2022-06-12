import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from "react-router-dom"
import jwt_decode from "jwt-decode"


function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value); 
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value); 
  };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("jk");
      console.log([email,password]);
  }
    
    function handleCallbackResponse(response){
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
    } 
      
    useEffect(()=> {
            /* global google */
            google.accounts.id.initialize({
              client_id: "351269892640-m1lf2srm7sfqo4b6fcp02c4vovtptvod.apps.googleusercontent.com",
              callback: handleCallbackResponse
            });
      
            google.accounts.id.renderButton(
              document.getElementById("signInDiv"),
              {
                theme: "outline", size: " extralarge"
              }
            )
      
    },[]);
    return (
            <div className="container">    
                <form onSubmit={handleSubmit} className="col s12 m6">
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={handleEmailChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={handlePasswordChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Login</button>
                    </div>
                    <div id = "signInDiv"></div>
                </form>
            </div>
        );

    };
    const mapStateToProps = (state) => {
      return {
          authError: state.auth.authError,
          auth: state.firebase.auth,
      }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
          signIn: ([email,password]) => dispatch(signIn([email,password]))
      }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
