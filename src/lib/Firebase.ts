import { getFirestore, Firestore } from "firebase/firestore"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { firebaseProdConfig } from "./firebase-prod"
import { firebaseDevConfig } from "./Firebase-dev"

const nodeProdEnv = process.env.NODE_ENV === "production"
console.log(process.env.NODE_ENV)
const app: firebase.app.App = firebase.initializeApp(nodeProdEnv ? firebaseProdConfig : firebaseDevConfig)
const firestore: Firestore = getFirestore(app)

export { app, firestore, firebase }
