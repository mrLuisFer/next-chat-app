import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { addChannel } from "../../../lib/store";
import Image from "next/image";
import { Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import { motion, Reorder } from "framer-motion";
import { BsFillCaretRightFill } from "react-icons/bs";
import SidebarChannelItem from "./SidebarChannelItem";
import SidebarUserItem from "./UserItem";

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
  const { user, userRoles } = useContext(UserContext);
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

  useEffect(() => {
    setChannelsState(channels);
  }, [channels]);

  return (
    <nav className="w-[400px] bg-gray-100 dark:bg-slate-800 text-gray-900 overflow-y-hidden overflow-x-hidden max-h-screen flex flex-col justify-between transition shadow-md hover:shadow-xl">
      <div>
        <div className="mb-6 border-b-2 border-gray-200 dark:border-gray-500 h-[80px] px-4 flex items-center justify-between shadow-sm">
          <Tooltip label="Reload page" hasArrow bg="blue.200">
            <div
              className="flex items-center gap-1 w-fit cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-slate-700 active:bg-blue-200 p-2 rounded-lg transition"
              onClick={() => {
                router.reload();
              }}
            >
              <Image src="/icons/chat.png" width={35} height={35} draggable={false} alt="chat icon" />
              <span className="font-bold text-2xl m-0 dark:text-gray-100 dark:hover:text-gray-50">Next Chat</span>
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
            className="font-bold text-gray-500 dark:text-gray-300 text-lg py-2 px-6 mb-2 hover:text-gray-800 dark:hover:text-gray-200 w-full transition flex items-center gap-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer select-none"
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
      <SidebarUserItem />
    </nav>
  );
}
