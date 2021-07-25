import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({

    auth: authReducer,
    project: projectReducer,
    // sync firestore state to redux store state
    firestore: firestoreReducer,
    //sync user auth state from  firebase to redux store state
    firebase: firebaseReducer
});

export default rootReducer
