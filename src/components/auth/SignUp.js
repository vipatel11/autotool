import React, { useEffect, useState } from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import { signUpGmail } from '../../store/actions/authActions'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const SignUp = (props) => {

    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let newUser= {
            email: email,
            password : password,
            firstName: firstName,
            lastName: lastName,
        }
        props.signUp(newUser)
        console.log(newUser);
    }
    
    useEffect(() => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            props.signUpGmail(result);
            })
        }
    , [])
            
        const { auth, authError } = props;
        if (auth.uid) return <Redirect to='/' />
        return (
            <div className="container">
                <form onSubmit={handleSubmit} className="col s12 m6">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={handleEmailChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={handlePasswordChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="FirstName">First Name</label>
                        <input type="text" id="firstName" onChange={handleFirstNameChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={handleLastNameChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Register</button>
                        <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser)),
        signUpGmail: (newUser) => dispatch(signUpGmail(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

