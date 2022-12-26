import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ThemeConfig, ColorModeScript } from "@chakra-ui/react";
import { theme } from "../lib/theme";
import UserContextProvider from "../context/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  const config: ThemeConfig = {
    useSystemColorMode: false,
    initialColorMode: "light",
  };

  return (
    <ChakraProvider theme={{ ...theme, config }}>
      <UserContextProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Component {...pageProps} />
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
