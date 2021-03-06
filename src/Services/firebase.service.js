const firebase = require("firebase/app");

let db;
const localStorageKey = 'me.adevkota.react-invoice';
let data;
let fbAuth;

export const firebaseAuth = () => {
	return fbAuth;
}
export const firebaseInit = () => {
	return Promise.all([
		import('@firebase/auth'),
		import('@firebase/firestore')
	])
	.then(([auth, firestore]) => {
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
		fbAuth = firebase.auth();
	})
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
	.then(() => {
		data = undefined;
	})
	.catch((error) => {
	   console.log(error);
	})
}

export const isAuthenticated = () => {
   return !!firebaseAuth().currentUser || !!localStorage.getItem(localStorageKey);
}

export const  getUserInfo = async (id) => {
	if(!data) {
		data =  await db.collection('users').doc(id).get();
		// window.localStorage.setItem(localStorageKey, JSON.stringify(temp));
	}
	return data;
}
	