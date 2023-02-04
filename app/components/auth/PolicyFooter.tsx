import Link from "next/link";

interface TFooterLink {
  title: string;
  href: string;
  external?: boolean;
}

const footerLinks: TFooterLink[] = [
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
  {
    title: "Terms of Service",
    href: "/terms",
  },
  {
    title: "GitHub",
    href: "https://github.com/mrLuisFer/next-chat-app",
  },
];

export default function PolicyFooter(): JSX.Element {
  return (
    <footer className="fixed bottom-4 mt-auto px-6">
      <div className="flex items-center gap-6">
        {footerLinks.map((link: TFooterLink) => (
          <Link href={link.href} key={link.title}>
            <a
              className="text-sm text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.title}
            </a>
          </Link>
        ))}
      </div>
    </footer>
  );
}
