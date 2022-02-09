import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Grid, Box } from "@chakra-ui/react";
import ContextProviders from "components/ContextProviders";
import LeftSidebar from "components/home/LeftSidebar";

function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProviders>
      <Grid
        width="100vw"
        gridTemplateColumns="250px 1fr"
        color="white"
        gridGap="10px"
      >
        <LeftSidebar />
        <Box p="2rem 0">
          <Component {...pageProps} />
        </Box>
      </Grid>
    </ContextProviders>
  );
}

export default App;
