import type { NextPage, GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { Box, Text } from "@chakra-ui/react";

const LoginPage: NextPage<{ providers: any[] }> = ({ providers }) => {
  return (
    <Box
      as="section"
      bg="black"
      height="100vh"
      display="grid"
      placeContent="center"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        as="article"
        bg="gray.900"
        color="white"
        transition="0.15s ease-in-out"
        p="2rem 3rem"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        gridGap="1rem"
        _hover={{ borderRadius: "10px" }}
      >
        <Text
          textAlign="center"
          fontWeight="bold"
          fontSize="1.5rem"
          mb="1rem"
          borderBottom="2px solid"
          borderColor="gray.800"
          lineHeight="2"
        >
          Quick Login
        </Text>
        {Object.values(providers).map((provider) => (
          <Box
            as="button"
            key={provider.name}
            p="1rem 3rem"
            borderRadius="10px"
            _hover={{ bg: "black", color: "white" }}
            onClick={() => signIn(provider.id)}
          >
            <Box cursor="pointer" fontWeight="semibold" _hover={{ color: "blue.500" }}>
              Sign in with {provider.name}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/chat",
        permanent: false,
      },
    };
  }

  return {
    props: { providers },
  };
};

export default LoginPage;
