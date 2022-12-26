import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const UserContext = createContext<{ user: {}; setUser: any }>(null as any);

export default function UserContextProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User | {}>({} as User);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }

      return () => {
        setUser({});
        unSub();
      };
    });
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
