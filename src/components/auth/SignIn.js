import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

const SignIn = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        let credential = {
            email: email.trim(),
            password: password,
        }
        props.signIn(credential)    
    }

    const { auth, authError } = props
    if (auth.uid) return <Redirect to='/' />
    return (
        <div className='container'>
            <form onSubmit={handleSubmit} className='col s12 m6'>
                <h5 className='grey-text text-darken-3'>Sign In</h5>
                <div className='input-field'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        onChange={handleEmailChange}
                    />
                </div>
                <div className='input-field'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className='input-field'>
                    <button className='btn pink lighten-1 z-depth-0'>
                        Login
                    </button>
                    <div className='red-text center'>
                        {authError ? <p>{authError}</p> : null}
                    </div>
                </div>
            </form>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credential) => dispatch(signIn(credential)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
