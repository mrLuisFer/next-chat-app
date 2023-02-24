import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, type ThemeConfig, ColorModeScript } from "@chakra-ui/react";
import { theme } from "../lib/theme";
import UserContextProvider from "../context/UserContext";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const config: ThemeConfig = {
    useSystemColorMode: false,
    initialColorMode: "light",
  };

  useEffect(() => {
    const theme = localStorage?.getItem("theme");

    if (theme === null) return;

    const htmlElement = document.querySelector("html");
    if (htmlElement == null) return;

    if (theme === "light") {
      htmlElement.classList.remove("light");
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
      htmlElement.classList.add("light");
    }
  }, []);

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
