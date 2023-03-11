import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyADmvLEIpA6thrXnAMtDr-nGCzExx6dJ0A",
    authDomain: "autotool-7755.firebaseapp.com",
    databaseURL: "https://autotool-7755.firebaseio.com",
    projectId: "autotool-7755",
    storageBucket: "autotool-7755.appspot.com",
    messagingSenderId: "351269892640",
    appId: "1:351269892640:web:0373921db62050f7668245",
    measurementId: "G-9XN4F6TYGN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;