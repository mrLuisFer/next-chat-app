import { FaSlackHash } from "react-icons/fa";
import { deleteChannel } from "../../../lib/store";
import Link from "next/link";
import { Box, Tooltip } from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Reorder, useMotionValue } from "framer-motion";

interface TSidebarItemProps {
  channel: {
    id: number;
    slug: string;
    created_by: string;
  };
  isActiveChannel: boolean;
  user: any;
  userRoles: string[];
}

const SidebarChannelItem = ({ channel, isActiveChannel, user, userRoles }: TSidebarItemProps): JSX.Element => {
  const isChannelOwner: boolean = channel.created_by === user?.id || userRoles.includes("admin");
  const y = useMotionValue(0);

  return (
    <Reorder.Item key={`${channel.id}`} value={channel} id={`${channel.id}`} style={{ y }}>
      <div className="p-2">
        <Link href="/channels/[id]" as={`/channels/${channel.id}`}>
          <a
            draggable={false}
            className={`${
              isActiveChannel ? "font-bold text-blue-500" : "text-gray-700 font-semibold"
            } hover:bg-gray-200 w-full px-6 py-3 cursor-pointer active:cursor-move transition group select-none rounded-lg flex items-center justify-between`}
          >
            <div className="flex gap-3 items-center">
              <Tooltip label="Public channel" hasArrow>
                <Box className={isActiveChannel ? "group-hover:brightness-105" : "group-hover:text-black"}>
                  <FaSlackHash />
                </Box>
              </Tooltip>
              <span className={isActiveChannel ? "group-hover:brightness-105" : "group-hover:text-black"}>
                {channel.slug}
              </span>
            </div>
            {channel.id !== 1 && isChannelOwner && (
              <div className="flex items-center gap-4">
                <Tooltip label="Edit channel" bg="blue.500" color="white" hasArrow>
                  <button
                    onClick={() => {
                      console.log("edit channel");
                    }}
                    className="hover:bg-gray-100 p-1 rounded-lg opacity-0 group-hover:opacity-100 text-gray-500 hover:text-blue-500 transition text-xl"
                  >
                    <AiOutlineEdit />
                  </button>
                </Tooltip>
                <Tooltip label="Delete channel" bg="red.400" color="white" hasArrow>
                  <button
                    onClick={() => {
                      void deleteChannel(channel.id);
                    }}
                    className="hover:bg-gray-100 p-1 rounded-lg opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition text-xl"
                  >
                    <AiOutlineDelete />
                  </button>
                </Tooltip>
              </div>
            )}
          </a>
        </Link>
      </div>
    </Reorder.Item>
  );
};

export default SidebarChannelItem;
