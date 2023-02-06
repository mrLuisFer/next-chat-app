import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";
import { deleteMessage } from "../../../lib/store";
import { Tooltip } from "@chakra-ui/react";

interface IUtilsPopoverProps {
  isAuthor: boolean;
  messageId: number;
}

export default function UtilsPopover({ isAuthor, messageId }: IUtilsPopoverProps): JSX.Element {
  return (
    <>
      {isAuthor && (
        <div className="absolute right-32 -top-2 bg-gray-200 dark:bg-zinc-600 text-gray-600 dark:text-gray-200 hover:shadow-md hidden items-center font-bold rounded-lg group-hover:flex transition">
          <Tooltip label="Edit" hasArrow placement="top">
            <button className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-sky-500 dark:hover:text-blue-300 rounded-l-lg transition">
              <AiOutlineEdit />
            </button>
          </Tooltip>
          <Tooltip label="Copy" hasArrow placement="top">
            <button className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition">
              <MdOutlineContentCopy />
            </button>
          </Tooltip>
          <Tooltip label="Delete" hasArrow placement="top">
            <button
              className="p-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-r-lg hover:text-red-500 dark:hover:text-red-400 transition"
              onClick={() => {
                void deleteMessage(messageId);
              }}
            >
              <AiOutlineDelete />
            </button>
          </Tooltip>
        </div>
      )}
    </>
  );
}
