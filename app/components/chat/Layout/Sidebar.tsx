import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { deleteChannel, addChannel } from "../../../lib/store";
import Link from "next/link";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

type TSidebarProps = {
  channels: any[];
  activeChannelId: string;
};

export default function Sidebar({ channels, activeChannelId }: TSidebarProps) {
  const { signOut, user, userRoles } = useContext(UserContext);

  const newChannel = async () => {
    const slug = prompt("Please enter your name");
    if (slug) {
      addChannel(slugify(slug), user.id);
    }
  };

  return (
    <nav
      className="w-64 bg-gray-900 text-gray-100 overflow-scroll "
      style={{ maxWidth: "20%", minWidth: 150, maxHeight: "100vh" }}
    >
      <div className="p-2 ">
        <div className="p-2">
          <button
            className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded w-full transition duration-150"
            onClick={() => newChannel()}
          >
            New Channel
          </button>
        </div>
        <hr className="m-2" />
        <div className="p-2 flex flex-col space-y-2">
          <h6 className="text-xs">{user?.email}</h6>
          <button
            className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded w-full transition duration-150"
            onClick={() => signOut()}
          >
            Log out
          </button>
        </div>
        <hr className="m-2" />
        <h4 className="font-bold">Channels</h4>
        <ul className="channel-list">
          {channels.map((x) => (
            <SidebarItem
              channel={x}
              key={x.id}
              isActiveChannel={x.id === activeChannelId}
              user={user}
              userRoles={userRoles}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}

type TSidebarItemProps = {
  channel: any;
  isActiveChannel: boolean;
  user: any;
  userRoles: string[];
};

const SidebarItem = ({ channel, isActiveChannel, user, userRoles }: TSidebarItemProps) => (
  <li className="flex items-center justify-between">
    <Link href="/channels/[id]" as={`/channels/${channel.id}`}>
      <a className={isActiveChannel ? "font-bold" : ""}>{channel.slug}</a>
    </Link>
    {channel.id !== 1 && (channel.created_by === user?.id || userRoles.includes("admin")) && (
      <button onClick={() => deleteChannel(channel.id)}>trash</button>
    )}
  </li>
);
