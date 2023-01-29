import { useState, useEffect } from "react";
import { fetchChannels, fetchMessages, fetchUser } from "../lib/store";
import { supabase } from "../lib/supabaseClient";

interface TUseStoreProps {
  channelId: number; // the currently selected Channel
}

interface UseStoreReturn {
  messages: any[];
  channels: any[];
  users: Map<string, unknown>;
}

export const useStore = (props: TUseStoreProps): UseStoreReturn => {
  const [channels, setChannels] = useState<any[] | null>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<Map<string, unknown>>(new Map());
  const [newMessage, handleNewMessage] = useState<Record<string, any>>();
  const [newChannel, handleNewChannel] = useState<Record<string, any>>();
  const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState<Record<string, any>>();
  const [deletedChannel, handleDeletedChannel] = useState<Record<string, any>>();
  const [deletedMessage, handleDeletedMessage] = useState<Record<string, any>>();

  // Load initial data and set up listeners
  useEffect(() => {
    // Get Channels
    void fetchChannels(setChannels);
    // Listen for new and deleted messages
    const messageListener = supabase
      .channel("public:messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        handleNewMessage(payload.new);
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "messages" }, (payload) => {
        handleDeletedMessage(payload.old);
      })
      .subscribe();
    // Listen for changes to our users
    const userListener = supabase
      .channel("public:users")
      .on("postgres_changes", { event: "*", schema: "public", table: "users" }, (payload) => {
        handleNewOrUpdatedUser(payload.new);
      })
      .subscribe();
    // Listen for new and deleted channels
    const channelListener = supabase
      .channel("public:channels")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "channels" }, (payload) => {
        handleNewChannel(payload.new);
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "channels" }, (payload) => {
        handleDeletedChannel(payload.old);
      })
      .subscribe();

    // Cleanup on unmount
    return () => {
      void supabase.removeChannel(messageListener);
      void supabase.removeChannel(userListener);
      void supabase.removeChannel(channelListener);
    };
  }, []);

  // Update when the route changes
  useEffect(() => {
    if (props?.channelId > 0) {
      const messagesHandler = (): void => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        messages?.forEach(async (x) => {
          await fetchUser(x.user_id, setUsers);
          setUsers(new Map(users.set(x.user_id, users)));
        });
      };

      void fetchMessages(props.channelId, messagesHandler, setMessages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.channelId]);

  // New message received from Postgres
  useEffect(() => {
    if (newMessage != null && newMessage.channel_id === Number(props.channelId)) {
      const handleAsync = async (): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const authorId: string = newMessage.user_id || newMessage.id;
        console.log("authorId", authorId);
        const isNotAuthorId: boolean = !users.has(authorId);
        if (isNotAuthorId)
          await fetchUser(authorId, (user) => {
            handleNewOrUpdatedUser(user as any);
          });
        setMessages(messages.concat(newMessage));
      };

      void handleAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  // Deleted message received from postgres
  useEffect(() => {
    if (deletedMessage != null) setMessages(messages.filter((message) => message.id !== deletedMessage.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedMessage]);

  // New channel received from Postgres
  useEffect(() => {
    if (newChannel != null && channels != null) setChannels(channels.concat(newChannel));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChannel]);

  // Deleted channel received from postgres
  useEffect(() => {
    if (deletedChannel != null && channels != null)
      setChannels(channels.filter((channel) => channel.id !== deletedChannel.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedChannel]);

  // New or updated user received from Postgres
  useEffect(() => {
    if (newOrUpdatedUser != null) users.set(newOrUpdatedUser.id, newOrUpdatedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrUpdatedUser]);

  return {
    // We can export computed values here to map the authors to each message
    messages: messages.map((x) => {
      return { ...x, author: users.get(x.user_id) };
    }),
    channels: channels !== null ? channels.sort((a, b) => a.slug.localeCompare(b.slug)) : [],
    users,
  };
};
