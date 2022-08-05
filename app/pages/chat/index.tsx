import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { Box, Text } from "@chakra-ui/react";
import ProfileSidebar from "../../components/chat/ProfileSidebar";
import io from "socket.io-client";
import ChatContent from "../../components/chat/Content";
import Channels from "../../components/chat/Channels";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useRouter } from "next/router";

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

const socket = io("http://localhost:3001");

const ChatPage: NextPage = () => {
  return (
    <Box minHeight="100vh" width="100%">
      <ChatHeader />
      <Box display="grid" gridTemplateColumns="250px 400px 1fr" minHeight="100vh">
        <ProfileSidebar />
        <Channels />
        <ChatContent socket={socket} />
      </Box>
    </Box>
  );
};

function ChatHeader() {
  return (
    <Box as="header" bg="black" color="gray.200" p="1rem 0.5rem" display="flex" justifyContent="space-between">
      <Text display="flex" alignItems="center" gridGap="0.3rem" fontWeight="semibold">
        <IoChatbubbleEllipses />
        Chat App
      </Text>
      <Text>Chat</Text>
    </Box>
  );
}

export default ChatPage;
