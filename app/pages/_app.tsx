import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ThemeConfig, ColorModeScript } from "@chakra-ui/react";
import { theme } from "../lib/theme";
import UserContextProvider from "../context/UserContext";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const config: ThemeConfig = {
    useSystemColorMode: false,
    initialColorMode: "light",
  };

  useEffect(() => {
    const theme: string = localStorage.getItem("theme")!;
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
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
