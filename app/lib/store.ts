import { Dispatch, SetStateAction } from "react";
import { supabase } from "./supabaseClient";

/**
 * Fetch all channels
 * @param {Function} setState Optionally pass in a hook or callback to set the state
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
export const fetchUser = async (userId: number, setState: Dispatch<SetStateAction<Map<any, any>>>) => {
  try {
    let { data } = await supabase.from("users").select(`*`).eq("id", userId);
    let user = data && data[0];
    if (setState) setState(new Map().set(user.id, user));
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
