import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { Tooltip, Avatar } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";

export default function SidebarUserItem(): JSX.Element {
  const { signOut, user } = useContext(UserContext);
  const createdAt = new Date(user?.created_at).toLocaleDateString("en-US");

  return (
    <div className="p-4 border-t-2 border-gray-200 dark:border-gray-500 flex items-center justify-between transition">
      <div className="flex items-center gap-2 p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg group transition active:shadow-md select-none cursor-pointer">
        <Avatar name={user?.email} />
        <div>
          <h2 className="text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
            Username:{" "}
            <span className="font-bold text-gray-800 dark:text-slate-200">
              {user?.email?.replace("@gmail.com", "")}
            </span>
          </h2>
          <p className="text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-400 text-sm">
            Created: <span>{createdAt}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-lg">
        <Tooltip label="Open settings" hasArrow bg="green.200">
          <button className="p-2 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-2xl cursor-pointer transition text-green-600 hover:text-green-400 active:shadow-sm">
            <IoSettingsSharp />
          </button>
        </Tooltip>
        <Tooltip label="Log out" hasArrow bg="red.200">
          <button
            className="p-2 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-2xl cursor-pointer transition text-red-500 hover:text-red-400 active:shadow-md"
            onClick={() => {
              void signOut();
            }}
          >
            <FiLogOut />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
