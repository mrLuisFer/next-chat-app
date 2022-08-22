import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { Box } from "@chakra-ui/react";
import ProfileSidebar from "../../components/chat/ProfileSidebar";
import io from "socket.io-client";
import ChatContent from "../../components/chat/Content";
import Channels from "../../components/chat/Channels";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: `${session!.user!.email!}`,
      },
    });


    return {
      props: {
        user
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {},
    };
  }
};

const socket = io("http://localhost:3001");

const ChatPage: NextPage = ({ user }: { user: any }) => {
  console.log(user)

  return (
    <Box minHeight="100vh" width="100%">
      <Box display="grid" gridTemplateColumns="250px 400px 1fr" minHeight="100vh">
        <ProfileSidebar />
        <Channels />
        <ChatContent socket={socket} />
      </Box>
    </Box>
  );
};

export default ChatPage;
