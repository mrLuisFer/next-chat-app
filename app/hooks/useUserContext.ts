import { type Dispatch, type SetStateAction, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { type User } from "@supabase/supabase-js";

interface UseUserContextReturn {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const useUserContext = (): UseUserContextReturn => {
  const { user, setUser } = useContext(UserContext);
  if (user == null && setUser == null) throw new Error("useUserContext must be used within a UserContextProvider.");

  return { user, setUser };
};
