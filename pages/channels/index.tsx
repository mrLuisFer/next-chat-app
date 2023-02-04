import type { NextPage } from "next";
import { Box, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

const ChatPage: NextPage = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const isNotUser = Object.keys(user).length === 0;
  useEffect(() => {
    if (isNotUser) {
      void router.push("/auth/login");
    } else {
      void router.push("/channels/1");
    }
  }, [router, isNotUser]);

  if (isNotUser) {
    return (
      <Box minHeight="100vh" className="grid place-items-center">
        <Spinner size="xl" speed="0.60s" />
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" className="grid place-items-center">
      <div className="flex items-center justify-center">
        <Spinner size="lg" speed="0.60s" />
        <span>Redirecting to the chat...</span>
      </div>
    </Box>
  );
};

export default ChatPage;
