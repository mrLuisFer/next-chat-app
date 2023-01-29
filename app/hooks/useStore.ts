import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { fetchChannels, fetchMessages, fetchUser, fetchUserRoles } from "../lib/store";
import { supabase } from "../lib/supabaseClient";

type TUseStoreProps = {
  channelId: number; // the currently selected Channel
};

export const useStore = (props: TUseStoreProps) => {
  const [channels, setChannels] = useState<any[] | null>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<Map<string, {}>>(new Map());
  const [newMessage, handleNewMessage] = useState<{ [props: string]: any }>();
  const [newChannel, handleNewChannel] = useState<{ [props: string]: any }>();
  const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState<{ [props: string]: any }>();
  const [deletedChannel, handleDeletedChannel] = useState<{ [props: string]: any }>();
  const [deletedMessage, handleDeletedMessage] = useState<{ [props: string]: any }>();

  // Load initial data and set up listeners
  useEffect(() => {
    // Get Channels
    fetchChannels(setChannels);
    // Listen for new and deleted messages
    const messageListener = supabase
      .channel("public:messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) =>
        handleNewMessage(payload.new)
      )
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "messages" }, (payload) =>
        handleDeletedMessage(payload.old)
      )
      .subscribe();
    // Listen for changes to our users
    const userListener = supabase
      .channel("public:users")
      .on("postgres_changes", { event: "*", schema: "public", table: "users" }, (payload) =>
        handleNewOrUpdatedUser(payload.new)
      )
      .subscribe();
    // Listen for new and deleted channels
    const channelListener = supabase
      .channel("public:channels")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "channels" }, (payload) =>
        handleNewChannel(payload.new)
      )
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "channels" }, (payload) =>
        handleDeletedChannel(payload.old)
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(messageListener);
      supabase.removeChannel(userListener);
      supabase.removeChannel(channelListener);
    };
  }, []);

  // Update when the route changes
  useEffect(() => {
    if (props?.channelId > 0) {
      fetchMessages(
        props.channelId,
        () => {
          messages?.forEach(async (x) => {
            const user = await fetchUser(x.user_id, setUsers);
            setUsers(new Map(users.set(x.user_id, user)));
          });
        },
        setMessages
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.channelId]);

  // New message received from Postgres
  useEffect(() => {
    if (newMessage && newMessage.channel_id === Number(props.channelId)) {
      const handleAsync = async () => {
        let authorId = newMessage.user_id;
        if (!users.get(authorId)) await fetchUser(authorId, (user) => handleNewOrUpdatedUser(user as any));
        setMessages(messages.concat(newMessage));
      };
      handleAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  // Deleted message received from postgres
  useEffect(() => {
    if (deletedMessage) setMessages(messages.filter((message) => message.id !== deletedMessage.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedMessage]);

  // New channel received from Postgres
  useEffect(() => {
    if (newChannel && channels) setChannels(channels.concat(newChannel));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChannel]);

  // Deleted channel received from postgres
  useEffect(() => {
    if (deletedChannel && channels) setChannels(channels.filter((channel) => channel.id !== deletedChannel.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedChannel]);

  // New or updated user received from Postgres
  useEffect(() => {
    if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser);
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
