export const signIn = (credential) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase
            .auth()
            .signInWithEmailAndPassword(credential.email, credential.password)
            .then(() => {
                console.log('YOU SIGNED IN')
                dispatch({ type: 'LOGIN_SUCCESS' })
            })
            .catch((err) => {
                dispatch({ type: 'LOGIN_ERROR', err })
            })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: 'SIGNOUT_SUCCESS' })
            })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((resp) => {
                return firestore
                    .collection('users')
                    .doc(resp.user.uid)
                    .set({
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        initials: newUser.firstName[0] + newUser.lastName[0],
                    })
            })
            .then(() => {
                dispatch({ type: 'SIGNUP_SUCCESS' })
            })
            .catch((err) => {
                dispatch({ type: 'SIGNUP_ERROR', err })
            })
    }
}

export const signUpGmail = (newGmailUser) => {
    return (dispatch, getState, { getFirestore }) => {
        
        const firestore = getFirestore()
        let fullName = newGmailUser.user.displayName.split(" ");
        let firstName = fullName[0];
        let lastName = fullName[1];
                return firestore
                    .collection('users')
                    .doc(newGmailUser.user.uid)
                    .set({
                        firstName: firstName,
                        lastName: lastName,
                        initials: firstName[0] + lastName[0],
                    })
            .then(() => {
                dispatch({ type: 'SIGNUP_SUCCESS' })
            })
            .catch((err) => {
                dispatch({ type: 'SIGNUP_ERROR', err })
            })
    }
}
