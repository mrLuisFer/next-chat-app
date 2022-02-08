import type { NextPage } from "next";
import { Grid } from "@chakra-ui/react";
import Chat from "components/home/Chat";
import LeftSidebar from "components/home/LeftSidebar";

const Home: NextPage = () => {
  return (
    <Grid
      width="100vw"
      gridTemplateColumns="250px 1fr"
      color="white"
      gridGap="10px"
    >
      <LeftSidebar />
      <Chat />
    </Grid>
  );
};

export default Home;
