import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZTEIcHD7jN9YcQXxOBh-ngeLsLzyB_iQ",
  authDomain: "careercatalyst-e87cf.firebaseapp.com",
  projectId: "careercatalyst-e87cf",
  storageBucket: "careercatalyst-e87cf.appspot.com",
  messagingSenderId: "1011751785232",
  appId: "1:1011751785232:web:1b9bbb0a1c1fccf5adcb95",
  measurementId: "G-LZEHQ4HTNS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
