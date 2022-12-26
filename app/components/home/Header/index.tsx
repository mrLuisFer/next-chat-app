import { Box, List, Text, Link as ChakraLink, Button, useColorMode } from "@chakra-ui/react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import Item from "../ListItem";
import Link from "next/link";
import CustomLink from "../../Link";
import { BsMoonStarsFill } from "react-icons/bs";
import { TiLightbulb } from "react-icons/ti";
import CustomButton from "../../shared/CustomButton";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
        <CustomLink
          to="/"
          color="gray.900"
          display="flex"
          alignItems="center"
          fontWeight="bold"
          gridGap="0.3em"
          cursor="pointer"
          borderRadius="8px"
          p="0.3rem 0.8rem"
          transition="0.15s ease"
          _hover={{
            bg: "black",
            color: "white",
          }}
        >
          <IoChatbubbleEllipses />
          <Text as="span">Chat App</Text>
        </CustomLink>

        <CustomButton display="flex" alignItems="center" asLink href="/" gap="5px">
          <IoChatbubbleEllipses size={20} />
          Chat App
        </CustomButton>

        <List as="ul" display="flex" alignItems="center" gridGap="1.4rem">
          <Item key="Projects">
            <ChakraLink href="#projects" _hover={{ textDecoration: "none" }}>
              Projects
            </ChakraLink>
          </Item>
          <Item key="Contact Us">
            <ChakraLink href="#contactus" _hover={{ textDecoration: "none" }}>
              Contact Us
            </ChakraLink>
          </Item>
        </List>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end" gridGap="1rem">
        <Link href="/auth/register">
          <Box
            as="a"
            key={"Register"}
            cursor="pointer"
            transition="0.15s ease-in-out"
            padding="0.3rem 0.5rem"
            borderRadius="8px"
            fontSize="0.9rem"
            fontWeight="semibold"
            _hover={{ color: "white", bg: "black", textDecoration: "none" }}
            _active={{ bg: "blue.500" }}
            userSelect="none"
          >
            Register
          </Box>
        </Link>
        <Link href="/auth/login">
          <Box
            as="a"
            key={"Login"}
            cursor="pointer"
            transition="0.15s ease-in-out"
            padding="0.3rem 0.5rem"
            borderRadius="8px"
            fontSize="0.9rem"
            fontWeight="semibold"
            _hover={{ color: "white", bg: "black", textDecoration: "none" }}
            _active={{ bg: "blue.500" }}
            userSelect="none"
          >
            Login
          </Box>
        </Link>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <BsMoonStarsFill size={15} /> : <TiLightbulb size={20} />}
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
