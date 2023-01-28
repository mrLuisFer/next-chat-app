import { Box, List, Text, Tooltip, useColorMode } from "@chakra-ui/react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { BsMoonStarsFill } from "react-icons/bs";
import { TiLightbulb } from "react-icons/ti";
import CustomButton from "../CustomButton";
import { useRouter } from "next/router";

const routesObj = {
  root: "/",
  contact: "/contact",
  login: "/auth/login",
  register: "/auth/register",
};

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const handleDarkMode = () => {
    toggleColorMode();
    document.querySelector("html")?.classList.toggle("dark");
  };

  console.log(router);
  return (
    <Box
      as="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p="1rem 2rem"
      boxShadow="0 3px 3px rgba(0, 0, 0, 0.05)"
      color="blackAlpha.600"
      fontSize="1rem"
    >
      <Box display="flex" alignItems="center" gridGap="1rem">
        <CustomButton
          display="flex"
          alignItems="center"
          asLink
          href="/"
          gap="5px"
          bg={router.asPath === routesObj.root ? "black" : ""}
          color={router.asPath === routesObj.root ? "white" : ""}
        >
          <IoChatbubbleEllipses size={20} />
          {router.asPath === routesObj.root ? "Chat App" : "Home"}
        </CustomButton>
        <List as="ul" display="flex" alignItems="center" gridGap="1.4rem">
          <CustomButton
            href="/contact"
            asLink
            bg={router.asPath === routesObj.contact ? "black" : ""}
            color={router.asPath === routesObj.contact ? "white" : ""}
          >
            Contact Us
          </CustomButton>
        </List>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-end" gridGap="1rem">
        <CustomButton
          asLink
          href="/auth/register"
          bg={router.asPath === routesObj.register ? "black" : ""}
          color={router.asPath === routesObj.register ? "white" : ""}
        >
          Register
        </CustomButton>
        <CustomButton
          asLink
          href="/auth/login"
          bg={router.asPath === routesObj.login ? "black" : ""}
          color={router.asPath === routesObj.login ? "white" : ""}
        >
          Login
        </CustomButton>
        <Tooltip label="Not stable yet" hasArrow>
          <Box position="relative">
            <CustomButton onClick={handleDarkMode}>
              {colorMode === "light" ? <BsMoonStarsFill size={15} /> : <TiLightbulb size={20} />}
            </CustomButton>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;
