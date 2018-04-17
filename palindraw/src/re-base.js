// Import rebase, database, and auth
import Rebase from "re-base"
import firebase from "firebase/app"
import database from "firebase/database"
import "firebase/auth"

// App object for firebase configuration
const app = firebase.initializeApp({
    apiKey: "AIzaSyAE-fBFUasyYdDSaZt7kl-JLXGPz7kY9kQ",
    authDomain: "palindraw.firebaseapp.com",
    databaseURL: "https://palindraw.firebaseio.com",
    projectId: "palindraw",
    storageBucket: "",
    messagingSenderId: "639443156123"
})

// const db = database(app);
const rebase = Rebase.createClass(app.database())

// export app, google, or base defaultly
export const auth = app.auth()
export const google = new firebase.auth.GoogleAuthProvider()
export default rebase