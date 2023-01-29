import { createContext, useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { supabase } from "../lib/supabaseClient";
import { fetchUserRoles } from "../lib/store";
import { useRouter } from "next/router";
import { type Session, type User } from "@supabase/supabase-js";

interface UserContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  userLoaded: boolean;
  userRoles: any[];
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  session: Session;
}
export const UserContext = createContext<UserContextType>(null as any);

const userInitialState: User = {
  id: "",
  app_metadata: {},
  user_metadata: {},
  aud: "",
  created_at: "",
};

const sessionInitialState: Session = {
  access_token: "",
  refresh_token: "",
  expires_in: 0,
  token_type: "",
  user: userInitialState,
};

export default function UserContextProvider({ children }: { children: any }): JSX.Element {
  const [user, setUser] = useState<User>(userInitialState);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const [session, setSession] = useState<Session>(sessionInitialState);
  const [userRoles, setUserRoles] = useState([]);

  const router = useRouter();
  const signIn = async (): Promise<void> => {
    await fetchUserRoles((userRoles: any) => {
      setUserRoles(userRoles?.map((userRole: any) => userRole.role));
    });
  };

  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error != null) {
      void router.push("/");
    } else {
      console.error("Error to sign out", error);
      setUser(userInitialState);
      setUserLoaded(false);
      setUserRoles([]);
      void router.push("/");
    }
  };

  useEffect(() => {
    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user != null) {
        setSession(session);
        setUser(session.user);
        const isSession: boolean = Boolean(session);
        setUserLoaded(isSession);
        void signIn();
        void router.push("/channels/[id]", "/channels/1");
      }
    });

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session != null) {
        setSession(session);
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        setUserLoaded(Boolean(currentUser));
        if (currentUser != null) {
          // signIn(currentUser.id, currentUser.email);
          void signIn();
          void router.push("/channels/[id]", "/channels/1");
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
