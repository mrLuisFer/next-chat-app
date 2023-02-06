import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { fetchUser } from "../../../lib/store";
import { Avatar, Popover, PopoverTrigger } from "@chakra-ui/react";
import UserCard from "../UserCard";
import UtilsPopover from "./UtilsPopover";
import { MessageDate } from "./MessageDate";

interface TMessageProps {
  message: {
    author:
      | undefined
      | {
          id: number;
          username: string;
        };
    channel_id: number;
    id: number;
    inserted_at: string;
    message: string;
    user_id: string;
  };
}

interface IUser {
  id: string;
  status: string;
  username: string;
}

const Message = ({ message }: TMessageProps): JSX.Element => {
  const { user } = useContext(UserContext);
  const [messageUser, setmessageUser] = useState<IUser>();
  const isAuthor = user?.id === messageUser?.id;

  const [showUsernameCard, setShowUsernameCard] = useState<boolean>(false);
  const [showAvatarCard, setShowAvatarCard] = useState<boolean>(false);

  useEffect(() => {
    const fetchClintUser = async (): Promise<void> => {
      const userFetched = await fetchUser(message.user_id);
      setmessageUser(userFetched);
    };

    void fetchClintUser();
  }, [message.user_id]);

  // {(user?.id === message.user_id || userRoles.some((role) => ["admin", "moderator"].includes(role))) && (
  return (
    <div className="flex items-center text-slate-900 dark:text-slate-100">
      <div className="hover:bg-gray-100 dark:hover:bg-zinc-800 w-full px-6 py-2 rounded-lg flex items-start gap-2 relative group transition">
        <UtilsPopover isAuthor={isAuthor} messageId={message.id} />
        <Popover>
          <PopoverTrigger>
            <div className="relative">
              <Avatar
                name={messageUser?.username.replace("@gmail.com", "")}
                size="sm"
                cursor="pointer"
                onClick={() => {
                  setShowAvatarCard(!showAvatarCard);
                }}
              />
            </div>
          </PopoverTrigger>
          <UserCard isOnAvatar />
        </Popover>
        <div>
          <div className="flex items-center gap-3 relative">
            <Popover>
              <PopoverTrigger>
                <p
                  className={`${isAuthor ? "text-blue-500" : "text-sky-600"} font-bold hover:underline text-md`}
                  onClick={() => {
                    setShowUsernameCard(!showUsernameCard);
                  }}
                >
                  {messageUser?.username.replace("@gmail.com", "")}
                </p>
              </PopoverTrigger>
              <UserCard />
            </Popover>
            <MessageDate insertedAt={message.inserted_at} />
          </div>
          <p className="">{message.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
