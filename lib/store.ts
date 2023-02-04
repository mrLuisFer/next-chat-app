import type { Dispatch, SetStateAction } from "react";
import { supabase } from "./supabaseClient";

/**
 * Fetch all channels
 * @param {Function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchChannels = async (setState: Dispatch<SetStateAction<any[] | null>>): Promise<unknown[]> => {
  try {
    const { data } = await supabase.from("channels").select("*");
    if (data != null) {
      setState(data);
      return data;
    }
    return [];
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

/** Fetch a single user */
export const fetchUser = async (userId: number | string, callback?: (user: any) => void): Promise<any> => {
  try {
    const { data } = await supabase.from("users").select(`*`).eq("id", userId);
    if (data == null) return {};
    const user = data?.[0];
    // setState(new Map().set(user.id, user));
    if (callback != null) {
      callback(user);
    }
    return user;
  } catch (error) {
    console.error("error", error);
    return {};
  }
};

/**
 * Fetch all roles for the current user
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUserRoles = async (setState: Dispatch<SetStateAction<any[] | null>>): Promise<unknown[]> => {
  try {
    const { data } = await supabase.from("user_roles").select(`*`);
    if (data != null) {
      setState(data);
      return data;
    }
    return [];
  } catch (error) {
    console.error("error", error);
    return [];
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
): Promise<unknown[]> => {
  try {
    const { data } = await supabase
      .from("messages")
      // .select(`*, author:user_id(*)`)
      .select("*")
      .eq("channel_id", channelId);

    if (data != null) {
      handler();
      setState(data);
      return data;
    }

    return [];
  } catch (error) {
    console.error("error", error);
    return [];
  }
};

/**
 * Insert a new channel into the DB
 * @param {string} slug The channel name
 * @param {number} userId The channel creator
 */
export const addChannel = async (
  slug: string,
  userId: number | string,
  description: string | null
): Promise<unknown[]> => {
  try {
    const { data } = await supabase
      .from("channels")
      .insert([{ slug, created_by: userId, description }])
      .select();

    if (data != null) {
      return data;
    }
    return [];
  } catch (error) {
    console.error("error", error);
    return [];
  }
};

/**
 * Insert a new message into the DB
 * @param {string} message The message text
 * @param {number} channelId
 * @param {number} userId The author
 */
export const addMessage = async (message: string, channelId: number, userId: number | string): Promise<unknown[]> => {
  try {
    console.log("addMessage:", message, channelId, userId);
    const { data } = await supabase
      .from("messages")
      .insert([{ message, channel_id: channelId, user_id: userId }])
      .select();
    if (data != null) {
      return data;
    }
    return [];
  } catch (error) {
    console.error("error", error);
    return [];
  }
};

/**
 * Delete a channel from the DB
 * @param {number} channelId
 */
export const deleteChannel = async (channelId: number): Promise<unknown[]> => {
  try {
    const { data } = await supabase.from("channels").delete().match({ id: channelId });
    if (data != null) {
      return data;
    }
    return [];
  } catch (error) {
    console.error("error:", error);
    return [];
  }
};

/**
 * Delete a message from the DB
 * @param {number} messageId
 */
export const deleteMessage = async (messageId: number): Promise<unknown[]> => {
  try {
    const { data } = await supabase.from("messages").delete().match({ id: messageId });
    if (data != null) {
      return data;
    }
    return [];
  } catch (error) {
    console.log("error", error);
    return [];
  }
};
