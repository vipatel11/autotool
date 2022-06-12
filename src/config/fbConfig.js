import firebase from 'firebase/compat/app'
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  } from "firebase/compat/auth";
import "firebase/compat/firestore";

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
// const auth = getAuth(app);
// const db = getFirestore(app);



// const googleProvider = new GoogleAuthProvider();
// const signInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     const user = res.user;
//     const q = query(collection(db, "users"), where("uid", "==", user.uid));
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

export default firebase;