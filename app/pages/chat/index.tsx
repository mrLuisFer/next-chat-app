import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession, signOut, SignOutResponse } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import ProfileSidebar from "../../components/chat/ProfileSidebar";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const ChatPage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);

  const handleSignOut = async () => {
    const data: SignOutResponse | any = await signOut({
      redirect: true,
      callbackUrl: "/auth/login",
    });

    if (data) {
      router.push(data.url);
    }
  };

  return (
    <Box display="grid">
      <ProfileSidebar />
      <Box></Box>
      <Box></Box>
    </Box>
  );
};

export default ChatPage;
