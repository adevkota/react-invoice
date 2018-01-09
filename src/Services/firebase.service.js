const firebase = require("firebase/app");
// Required for side-effects
require("firebase/auth");
require("firebase/firestore");

let db;
const localStorageKey = 'me.adevkota.react-invoice';

export const firebaseAuth = firebase.auth;
export const firebaseInit = () => {
   let config = {
		apiKey: "AIzaSyAiqxhHbuMn3H0HmBR-BdDWckuCbX77o-w",
		authDomain: "invoice-aa086.firebaseapp.com",
		databaseURL: "https://invoice-aa086.firebaseio.com",
		projectId: "invoice-aa086",
		storageBucket: "invoice-aa086.appspot.com",
		messagingSenderId: "1090928850629"
   };
   firebase.initializeApp(config);
   db = firebase.firestore();
   // firebaseAuth().onAuthStateChanged(handleAuthStateChange);
}

// const handleAuthStateChange = (user) => {
//    if(!!user) {
//       window.localStorage.setItem(localStorageKey, user.uid);
//    } else {
//       window.localStorage.removeItem(localStorageKey);
//    }
// }

export const firebaseLogin = (email, pw) => {
   firebaseAuth()
	.signInWithEmailAndPassword(email, pw)
	.catch((error) => {
	   console.log(error);
	})
}
export const firebaseLogout = () => {
   firebaseAuth()
	.signOut()
	.catch((error) => {
	   console.log(error);
	})
}

export const isAuthenticated = () => {
   return !!firebaseAuth().currentUser || !!localStorage.getItem(localStorageKey);
}

export const getUserInfo = (id) => {
	return db.collection('users').doc(id).get();
}
	