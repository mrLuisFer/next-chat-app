import type { NextPage } from "next"
import { firebase } from "lib/Firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

const emailAuthProvider = firebase.auth.EmailAuthProvider.PROVIDER_ID
const googleAuthProvider = firebase.auth.GoogleAuthProvider.PROVIDER_ID

const uiConfig = {
  signInSuccessUrl: "/chat",
  signInOptions: [{ provider: emailAuthProvider, requireDisplayName: true }, googleAuthProvider],
}

const Login: NextPage = () => {
  return (
    <div>
      <p>Login</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  )
}

export default Login
