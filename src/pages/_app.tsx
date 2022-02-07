import "../styles/globals.css";
import type { AppProps } from "next/app";
import ChatContextProvider from "context/ChatContext";
import UserContextProvider from "context/UserContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChatContextProvider>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </ChatContextProvider>
  );
}

export default App;
