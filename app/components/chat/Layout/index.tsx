import Sidebar from "./Sidebar";

type TLayoutProps = {
  channels: any[];
  children: any;
  activeChannelId: string;
};

export default function Layout({ channels, children, activeChannelId }: TLayoutProps) {
  return (
    <main className="main flex h-screen w-screen overflow-hidden">
      <Sidebar channels={channels} activeChannelId={activeChannelId} />
      {/* Messages */}
      <div className="flex-1 bg-gray-800 h-screen">{children}</div>
    </main>
  );
}
