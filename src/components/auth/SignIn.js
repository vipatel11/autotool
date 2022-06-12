import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { signIn, signUpGmail } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const SignIn = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [givenName, setGivenName] = useState('')
	const [familyName, setFamilyName] = useState('')
	const [pictureUrl, setPictureUrl] = useState('')

	const handleEmailChange = (e) => {
		setEmail(e.target.value)
	}

	const handleLoginChangeFromResponse = (userObject) => {
		setEmail(userObject.email)
		setGivenName(userObject.givenName)
		setFamilyName(userObject.familyName)
		setPictureUrl(userObject.picture)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		let credential = {
			familyName: familyName,
			givenName: givenName,
			email: email,
			password: password,
			pictureUrl: pictureUrl,
		}
		props.signIn(credential)
	}

	const handleGmailSignIn = (e) => {
		e.preventDefault()
		let credential = {
			familyName: familyName,
			givenName: givenName,
			email: email,
			pictureUrl: pictureUrl,
		}
		props.signUpGmail(credential)
	}

	function handleCallbackResponse(response) {
		//console.log('Encoded JWT ID token: ' + response.credential)
		handleLoginChangeFromResponse(jwt_decode(response.credential))
	}

	useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id:
				'351269892640-m1lf2srm7sfqo4b6fcp02c4vovtptvod.apps.googleusercontent.com',
			callback: handleCallbackResponse,
		})

		google.accounts.id.renderButton(document.getElementById('signInDiv'), {
			theme: 'outline',
			size: ' extralarge',
		})
	}, [])
	const { authError, auth } = props
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
				</div>
				<div id='signInDiv' onClick={handleGmailSignIn}></div>
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
		signUpGmail: (credential) => dispatch(signUpGmail(credential)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
