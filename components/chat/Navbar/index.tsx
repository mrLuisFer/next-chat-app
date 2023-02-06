import { Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSlackHash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoSettingsSharp, IoSunnySharp } from "react-icons/io5";
import { useSetDarkMode } from "../../../hooks/useSetDarkMode";
import { motion } from "framer-motion";

interface INavbarProps {
  activeChannelId: string;
  channels: any[];
}

interface Channel {
  created_by: string;
  id: number;
  inserted_at: string;
  slug: string;
  description: string;
}

export default function Navbar({ activeChannelId, channels }: INavbarProps): JSX.Element {
  const [currentChannel, setCurrentChannel] = useState<Channel>();
  const { handleDarkMode, chakraColorMode } = useSetDarkMode();

  useEffect(() => {
    const activeChannelName = channels.find((x) => `${x.id as string}` === activeChannelId);
    setCurrentChannel(activeChannelName);
  }, [activeChannelId, channels]);

  console.log({ currentChannel });
  return (
    <nav className="bg-gray-100 dark:bg-slate-800 px-4 h-[80px] text-zinc-900 dark:text-zinc-200 shadow-sm transition flex items-center justify-between border-b-2 border-gray-200 dark:border-gray-500">
      <div className="flex items-center gap-3">
        <button className="flex items-center font-bold gap-2 text-xl transition px-2 py-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl cursor-pointer select-none hover:shadow-sm active:shadow-md">
          <FaSlackHash />
          <span>{currentChannel?.slug}</span>
          <IoIosArrowDown />
        </button>
        {currentChannel?.description != null && (
          <p className="opacity-70 font-semibold hover:opacity-100 flex items-center group text-md">
            {currentChannel?.description}
            <Tooltip label="Edit channel" hasArrow>
              <button
                onClick={() => {
                  console.log("edit description");
                }}
                className="opacity-0 group-hover:opacity-100 transition duration-150 ml-2"
              >
                <AiOutlineEdit />
              </button>
            </Tooltip>
          </p>
        )}
      </div>
      <div className="pr-6 flex items-center gap-2">
        <button
          className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full transition text-sky-500"
          onClick={handleDarkMode}
        >
          {chakraColorMode === "light" ? (
            <motion.div
              initial={{ transform: "rotate(0deg)" }}
              animate={{ transform: "rotate(-360deg)" }}
              className="text-lg"
            >
              <BsFillMoonStarsFill />
            </motion.div>
          ) : (
            <motion.div
              initial={{ transform: "rotate(180deg)" }}
              animate={{ transform: "rotate(0deg)" }}
              className="text-xl"
            >
              <IoSunnySharp />
            </motion.div>
          )}
        </button>
        <Tooltip label="Open settings" hasArrow bg="green.400">
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full cursor-pointer transition text-green-500 active:shadow-sm text-lg">
            <IoSettingsSharp />
          </button>
        </Tooltip>
        <Tooltip label="Help" hasArrow>
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full cursor-pointer transition text-blue-500 dark:text-blue-400 active:shadow-sm text-xl">
            <BiHelpCircle />
          </button>
        </Tooltip>
      </div>
    </nav>
  );
}
