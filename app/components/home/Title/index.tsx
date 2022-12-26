import { Box, useBoolean, Fade } from "@chakra-ui/react";
import { HiHashtag } from "react-icons/hi";

const HomeTittle = ({ children }: { children: any }) => {
  const [flag, setFlag] = useBoolean();

  return (
    <Box
      color="gray.800"
      fontWeight="semibold"
      fontSize="1.5rem"
      display="flex"
      alignItems="center"
      onMouseEnter={setFlag.on}
      onMouseLeave={setFlag.off}
      opacity="0.8"
      w="fit-content"
      cursor="default"
      transition="0.15s ease"
      _hover={{
        opacity: "1",
      }}
    >
      <Fade in={flag}>
        <HiHashtag />
      </Fade>
      {children}
    </Box>
  );
};

export default HomeTittle;
