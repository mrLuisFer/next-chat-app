import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ChatContextProvider from "context/ChatContext";
import UserContextProvider from "context/UserContext";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ChatContextProvider>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </ChatContextProvider>
    </ChakraProvider>
  );
}

export default App;
