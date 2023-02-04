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
      <div className="flex-1 bg-gray-800 h-screen">{children}</div>
    </main>
  );
}
