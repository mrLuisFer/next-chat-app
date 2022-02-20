import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { useAuth } from "hooks/useAuth"

const Gifs: NextPage = () => {
  const { authorized } = useAuth()

  return (
    <>
      {authorized && <Box>Hello</Box>}
    </>
  )

};

export default Gifs;
