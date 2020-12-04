import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyDi9wfOIy_mzVTCXqoPlC9-bO1YZ8ezKcA",
	authDomain: "fbmessengerclone-ba337.firebaseapp.com",
	databaseURL: "https://fbmessengerclone-ba337.firebaseio.com",
	projectId: "fbmessengerclone-ba337",
	storageBucket: "fbmessengerclone-ba337.appspot.com",
	messagingSenderId: "925294293851",
	appId: "1:925294293851:web:b1b94db86cac4bc1b5e07e",
});

const db = firebaseApp.firestore();

export default db;
