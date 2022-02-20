import type { NextPage } from "next";
import { firestore, firebase } from 'lib/Firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const emailAuthProvider = firebase.auth.EmailAuthProvider.PROVIDER_ID
const googleAuthProvider = firebase.auth.GoogleAuthProvider.PROVIDER_ID

const Login: NextPage = () => {
	const uiConfig = {
		signInSuccessUrl: '/',
		signInOptions: [emailAuthProvider, googleAuthProvider],
	}

	const [value, loading, error] = useCollection(collection(firestore, 'users'), {})

	console.log(loading)
	if (!loading && value) {
		value.docs.map((doc) => console.log(doc.data()));
	}
	console.log(error)

	return (
		<div>
			<p>Login</p>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		</div>
	);
};

export default Login;
