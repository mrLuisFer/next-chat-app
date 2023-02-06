import Navbar from "../Navbar";
import Sidebar from "./Sidebar";

interface TLayoutProps {
  channels: any[];
  children: any;
  activeChannelId: string;
}

export default function Layout({ channels, children, activeChannelId }: TLayoutProps): JSX.Element {
  return (
    <main className="main flex h-screen w-screen overflow-hidden">
      <Sidebar channels={channels} activeChannelId={activeChannelId} />
      <div className="flex-1 bg-zinc-50 dark:bg-zinc-900 h-screen relative">
        <Navbar activeChannelId={activeChannelId} channels={channels} />
        {children}
      </div>
    </main>
  );
}
