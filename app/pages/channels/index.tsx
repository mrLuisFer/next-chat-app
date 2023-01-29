import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import ProfileSidebar from "../../components/chat/ProfileSidebar";
import io from "socket.io-client";
import ChatContent from "../../components/chat/Content";
import Channels from "../../components/chat/Channels";
import { useUserContext } from "../../hooks/useUserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const socket = io("http://localhost:3002");

const ChatPage: NextPage = () => {
  const router = useRouter();
  const { user } = useUserContext();
  console.log(user);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      router.push("/");
    }
  }, [user]);

  if (Object.keys(user).length === 0) {
    return <Box>Loading...</Box>;
  }

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
