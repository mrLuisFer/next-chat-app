import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const ChatPage: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);

  return <div>chat</div>;
};

export default ChatPage;
