import "../styles/globals.css";
import type { AppProps } from "next/app";
import ChatContextProvider from "context/ChatContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChatContextProvider>
      <Component {...pageProps} />
    </ChatContextProvider>
  );
}

export default App;
