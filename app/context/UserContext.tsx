import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { supabase } from "../lib/supabaseClient";
import { fetchUserRoles } from "../lib/store";
import { useRouter } from "next/router";
import { Session, User } from "@supabase/supabase-js";

type UserContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  userLoaded: boolean;
  userRoles: any[];
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  session: Session;
};
export const UserContext = createContext<UserContextType>(null as any);

export default function UserContextProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User>({} as User);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const [session, setSession] = useState<Session>({} as Session);
  const [userRoles, setUserRoles] = useState([]);

  const router = useRouter();
  const signIn = async () => {
    await fetchUserRoles((userRoles: any) => setUserRoles(userRoles?.map((userRole: any) => userRole.role)));
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/");
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user) {
        setSession(session);
        setUserLoaded(!!session);
        signIn();
        router.push("/channels/[id]", "/channels/1");
      }
    });

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setSession(session);
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        setUserLoaded(!!currentUser);
        if (currentUser) {
          // signIn(currentUser.id, currentUser.email);
          signIn();
          router.push("/channels/[id]", "/channels/1");
        }
      }
    });

    return () => {
      // authListener.subscription.unsubscribe();
      authListener.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userLoaded, userRoles, signIn, signOut, session }}>
      {children}
    </UserContext.Provider>
  );
}
