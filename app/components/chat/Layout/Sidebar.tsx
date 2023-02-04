import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { addChannel } from "../../../lib/store";
import Image from "next/image";
import { Tooltip, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut, FiPlus } from "react-icons/fi";
import { motion, Reorder } from "framer-motion";
import { BsFillCaretRightFill } from "react-icons/bs";
import SidebarChannelItem from "./SidebarChannelItem";

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

interface TSidebarProps {
  channels: any[];
  activeChannelId: string;
}

export default function Sidebar({ channels, activeChannelId }: TSidebarProps): JSX.Element {
  const { signOut, user, userRoles } = useContext(UserContext);
  const [showNewChannelMsg, setShowNewChannelMsg] = useState<boolean>(false);
  const [showChannels, setShowChannels] = useState<boolean>(true);
  const [channelsState, setChannelsState] = useState<any[]>([]);
  const router = useRouter();

  const newChannel = async (): Promise<void> => {
    const slug = prompt("Please enter your name");
    const description = prompt("Please enter a description");
    if (slug != null) {
      void addChannel(slugify(slug), user.id, description);
    }
  };

  console.log(user);
  const createdAt = new Date(user?.created_at).toLocaleDateString("en-US");

  useEffect(() => {
    setChannelsState(channels);
  }, [channels]);

  return (
    <nav className="w-[400px] bg-gray-100 dark:bg-slate-900 text-gray-900 overflow-y-hidden overflow-x-hidden max-h-screen flex flex-col justify-between transition shadow-md hover:shadow-xl">
      <div>
        <div className="mb-6 border-b-2 border-gray-200 h-[80px] px-4 flex items-center justify-between shadow-sm">
          <Tooltip label="Reload page" hasArrow bg="blue.200">
            <div
              className="flex items-center gap-1 w-fit cursor-pointer select-none hover:bg-gray-200 active:bg-blue-200 p-2 rounded-lg transition"
              onClick={() => {
                router.reload();
              }}
            >
              <Image src="/icons/chat.png" width={35} height={35} draggable={false} alt="chat icon" />
              <span className="font-bold text-2xl m-0">Next Chat</span>
            </div>
          </Tooltip>
          <motion.button
            className="bg-blue-500 text-white p-2 rounded-2xl font-bold transition text-sm duration-150 flex items-center justify-center gap-2 hover:shadow-md hover:brightness-105"
            onClick={() => {
              void newChannel();
            }}
            onMouseEnter={() => {
              setShowNewChannelMsg(true);
            }}
            onMouseLeave={() => {
              setShowNewChannelMsg(false);
            }}
            animate={{ width: showNewChannelMsg ? 140 : 30 }}
          >
            <FiPlus />
            {showNewChannelMsg && (
              <motion.span
                initial={{ opacity: 0, translateX: -10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.3 }}
              >
                NewChannel
              </motion.span>
            )}
          </motion.button>
        </div>
        <div className="overflow-y-auto overflow-x-hidden max-h-[720px] min-h-[710px] channelsScroll">
          <h4
            className="font-bold text-gray-500 text-lg py-2 px-6 mb-2 hover:text-gray-800 w-full transition flex items-center gap-4 hover:bg-gray-200 rounded-lg cursor-pointer select-none"
            onClick={() => {
              setShowChannels(!showChannels);
            }}
          >
            <span className={`${showChannels ? "rotate-90" : "rotate-0"} transition`}>
              <BsFillCaretRightFill />
            </span>
            Channels
          </h4>
          <Reorder.Group
            as="ul"
            onReorder={setChannelsState}
            values={channelsState}
            axis="y"
            animate={{
              height: showChannels ? "auto" : 0,
              opacity: showChannels ? 1 : 0,
              translateY: showChannels ? 0 : -15,
              display: showChannels ? "block" : "none",
            }}
          >
            {channelsState.map((x) => (
              <SidebarChannelItem
                channel={x}
                key={`${x.id as string}`}
                isActiveChannel={`${x.id as string}` === activeChannelId}
                user={user}
                userRoles={userRoles}
              />
            ))}
          </Reorder.Group>
        </div>
      </div>
      <div className="p-4 hover:bg-gray-200 border-t-2 border-gray-200 rounded-t-xl flex items-center justify-between transition">
        <div className="flex items-center gap-2 p-2 hover:bg-gray-300 rounded-lg group transition active:shadow-md select-none cursor-pointer">
          <Avatar name={user?.email} />
          <div>
            <h2 className="text-gray-400 group-hover:text-gray-700">
              Username: <span className="font-bold text-gray-800">{user?.email?.replace("@gmail.com", "")}</span>
            </h2>
            <p className="text-gray-400 group-hover:text-gray-700">
              Created: <span>{createdAt}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-lg">
          <Tooltip label="Open settings" hasArrow bg="green.200">
            <button className="p-2 hover:bg-gray-300 rounded-2xl cursor-pointer transition hover:text-green-600 active:shadow-sm">
              <IoSettingsSharp />
            </button>
          </Tooltip>
          <Tooltip label="Log out" hasArrow bg="red.200">
            <button
              className="p-2 hover:bg-gray-300 rounded-2xl cursor-pointer transition hover:text-red-500 active:shadow-md"
              onClick={() => {
                void signOut();
              }}
            >
              <FiLogOut />
            </button>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
}
