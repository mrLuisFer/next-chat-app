import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { supabase } from "./supabaseClient";

type TUseStoreProps = {
  channelId: number; // the currently selected Channel
};

export const useStore = (props: TUseStoreProps) => {
  const [channels, setChannels] = useState<any[] | null>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [users] = useState(new Map());
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
          messages?.forEach((x) => users.set(x.user_id, x.author));
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
    messages: messages.map((x) => ({ ...x, author: users.get(x.user_id) })),
    channels: channels !== null ? channels.sort((a, b) => a.slug.localeCompare(b.slug)) : [],
    users,
  };
};

/**
 * Fetch all channels
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchChannels = async (setState: Dispatch<SetStateAction<any[] | null>>) => {
  try {
    let { data } = await supabase.from("channels").select("*");
    if (setState) setState(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/**
 * Fetch a single user
 * @param {number} userId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUser = async (userId: number, setState: Dispatch<SetStateAction<null>>) => {
  try {
    let { data } = await supabase.from("users").select(`*`).eq("id", userId);
    let user = data && data[0];
    if (setState) setState(user);
    return user;
  } catch (error) {
    console.log("error", error);
  }
};

/**
 * Fetch all roles for the current user
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUserRoles = async (setState: Dispatch<SetStateAction<any[] | null>>) => {
  try {
    let { data } = await supabase.from("user_roles").select(`*`);
    if (setState) setState(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/**
 * Fetch all messages and their authors
 * @param {number} channelId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchMessages = async (
  channelId: number,
  handler: () => void,
  setState: Dispatch<SetStateAction<any[]>>
) => {
  try {
    let { data } = await supabase
      .from("messages")
      // .select(`*, author:user_id(*)`)
      .select("*")
      .eq("channel_id", channelId);

    if (data) {
      handler();
      setState(data);
    }
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/**
 * Insert a new channel into the DB
 * @param {string} slug The channel name
 * @param {number} user_id The channel creator
 */
export const addChannel = async (slug: string, user_id: number | string) => {
  try {
    let { data } = await supabase
      .from("channels")
      .insert([{ slug, created_by: user_id }])
      .select();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/**
 * Insert a new message into the DB
 * @param {string} message The message text
 * @param {number} channel_id
 * @param {number} user_id The author
 */
export const addMessage = async (message: string, channel_id: number, user_id: number | string) => {
  try {
    console.log("addMessage:", message, channel_id, user_id);
    let { data } = await supabase.from("messages").insert([{ message, channel_id, user_id }]).select();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/**
 * Delete a channel from the DB
 * @param {number} channel_id
 */
export const deleteChannel = async (channel_id: number) => {
  try {
    let { data } = await supabase.from("channels").delete().match({ id: channel_id });
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/**
 * Delete a message from the DB
 * @param {number} message_id
 */
export const deleteMessage = async (message_id: number) => {
  try {
    let { data } = await supabase.from("messages").delete().match({ id: message_id });
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
