import type { NextPage, GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { Box } from "@chakra-ui/react";

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
      <Box as="article" bg="gray.900" color="white" transition="0.15s ease-in-out" p="2rem 3rem" borderRadius="8px" _hover={{ borderRadius: "10px" }}>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
          </div>
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
