import { getFirestore, Firestore } from "firebase/firestore"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
}

// Initialize Firebase
const app: firebase.app.App = firebase.initializeApp(firebaseConfig)
const firestore: Firestore = getFirestore(app)

export { app, firestore, firebase }
