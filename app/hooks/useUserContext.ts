import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useUserContext = () => {
  const { user, setUser } = useContext(UserContext);
  if (!user && !setUser) throw new Error("useUserContext must be used within a UserContextProvider.");

  return { user, setUser };
};
