import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { deleteMessage, fetchUser } from "../../lib/store";
import { Avatar, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";
import capitalize from "../../helpers/capitalizeStr";

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
  const messageDate = new Date(message.inserted_at).toLocaleDateString();
  const currentDate = new Date().toLocaleDateString();
  const messageHourDate = new Date(message.inserted_at).getHours();
  const messageMinutesDate = new Date(message.inserted_at).getMinutes();
  const messageTime = `${messageHourDate}:${messageMinutesDate}`;
  const messageMonth = new Date(message.inserted_at).toLocaleString("default", { month: "long" });
  const messageDay = new Date(message.inserted_at).toLocaleDateString("es-MX", { weekday: "long" });
  const messageNumberDay = new Date(message.inserted_at).toLocaleString("default", { day: "numeric" });
  const messageYear = new Date(message.inserted_at).toLocaleString("default", { year: "numeric" });
  const fullMessageDateFormatted = capitalize(`${messageDay}, ${messageNumberDay} ${messageMonth} ${messageYear}`);

  useEffect(() => {
    const fetchClintUser = async (): Promise<void> => {
      const userFetched = await fetchUser(message.user_id);
      setmessageUser(userFetched);
    };

    void fetchClintUser();
  }, [message.user_id]);

  // {(user?.id === message.user_id || userRoles.some((role) => ["admin", "moderator"].includes(role))) && (
  return (
    <div className="flex items-center text-slate-900">
      <div className="hover:bg-gray-100 w-full p-6 rounded-lg flex items-start gap-2 relative group">
        {isAuthor && (
          <div className="absolute right-32 -top-2 bg-gray-200 hover:shadow-md hidden items-center font-bold rounded-lg group-hover:flex transition">
            <Tooltip label="Edit" hasArrow placement="top">
              <button className="text-gray-600 p-2 hover:bg-gray-300 hover:text-sky-500 rounded-l-lg transition">
                <AiOutlineEdit />
              </button>
            </Tooltip>
            <Tooltip label="Copy" hasArrow placement="top">
              <button className="text-gray-600 p-2 hover:bg-gray-300 hover:text-orange-500 transition">
                <MdOutlineContentCopy />
              </button>
            </Tooltip>
            <Tooltip label="Delete" hasArrow placement="top">
              <button
                className="text-gray-600 p-2 hover:bg-gray-300 rounded-r-lg hover:text-red-500 transition"
                onClick={() => {
                  void deleteMessage(message.id);
                }}
              >
                <AiOutlineDelete />
              </button>
            </Tooltip>
          </div>
        )}
        <Avatar name={messageUser?.username.replace("@gmail.com", "")} size="md" cursor="pointer" />
        <div>
          <div className="flex items-center gap-3">
            <Link href="">
              <a className="text-blue-500 font-bold hover:underline">
                {messageUser?.username.replace("@gmail.com", "")}
              </a>
            </Link>
            <Tooltip label={fullMessageDateFormatted} placement="top" hasArrow>
              <p className="text-gray-400 text-xs">
                {messageDate === currentDate ? "Hoy a las" : messageDate} {messageTime}
              </p>
            </Tooltip>
          </div>
          <p className="">{message.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
