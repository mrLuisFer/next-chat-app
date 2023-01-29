import { useRouter } from "next/router";
import { addMessage } from "../../lib/store";
import { useStore } from "../../hooks/useStore";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import Layout from "../../components/chat/Layout";
import Message from "../../components/chat/Message";
import MessageInput from "../../components/chat/MessageInput";

const ChatIdPage = (): JSX.Element => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Else load up the page
  const { id: channelId } = router.query;
  const { messages, channels } = useStore({ channelId: Number(channelId) });

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [messages]);

  // redirect to public channel when current channel is deleted
  useEffect(() => {
    if (!channels.some((channel) => channel.id === Number(channelId))) {
      void router.push("/channels/1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels, channelId]);

  // validate if user exists
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      void router.push("/auth/login");
    }
  }, [user, router]);

  console.info("messages", messages);
  console.info("user", user, "keys:", Object.keys(user).length);

  const handleSubmitMessage = async (message: string): Promise<void> => {
    await addMessage(message, Number(channelId), user.id);
  };

  return (
    <Layout channels={channels} activeChannelId={channelId as string}>
      <div className="relative h-screen">
        <div className="h-full pb-16">
          <div className="p-2 overflow-y-auto">
            {messages.map((x) => (
              <Message key={x.id} message={x} />
            ))}
            <div ref={messagesEndRef} style={{ height: 0 }} />
          </div>
        </div>
        <div className="p-2 absolute bottom-0 left-0 w-full">
          <MessageInput
            onSubmit={(message: string) => {
              void handleSubmitMessage(message);
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ChatIdPage;
