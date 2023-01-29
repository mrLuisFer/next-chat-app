import { Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBackIosNew } from "react-icons/md";

export default function ConfirmEmail() {
  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')] h-screen w-screen bg-no-repeat object-cover bg-cover bg-center flex items-center justify-center">
      <div className="bg-gray-900 h-screen absolute top-0 left-0 w-screen opacity-[0.6]"></div>
      <div className="relative bg-gray-100 hover:bg-white dark:bg-slate-900 w-[600px] h-[475px] p-10 flex flex-col items-center justify-center shadow-lg hover:shadow-xl rounded-xl transition z-10">
        <Tooltip label="Go to homepage" hasArrow placement="top-start">
          <div className="absolute top-5 left-5 opacity-60 hover:opacity-100 transition">
            <Link href="/">
              <a className="flex items-center cursor-pointer">
                <MdArrowBackIosNew />
                <span>Go back</span>
              </a>
            </Link>
          </div>
        </Tooltip>
        <h1 className="font-bold text-4xl text-center mx-auto my-0 uppercase flex items-center gap-2">
          Confirm your email
          <Image draggable={false} src="/icons/happy-face.png" alt="happy emoji" width={40} height={35} />
        </h1>
        <p className="text-center mt-6 mb-10">
          We have sent you an email with a link to confirm your email address.
          <span className="block text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 w-fit mx-auto transition">
            Please check your inbox and click on the link
          </span>
        </p>
        <div className="flex items-center justify-center gap-6">
          <ConfirmEmailBtn
            icon="/icons/gmail.svg"
            label="Open Gmail"
            href="https://mail.google.com/mail/u/1/#inbox"
            target
          />
          <ConfirmEmailBtn
            icon="/icons/outlook.svg"
            label="Open Outlook"
            href="https://outlook.live.com/mail/inbox"
            target
          />
          <ConfirmEmailBtn icon="/icons/protonmail.svg" href="" target />
        </div>
        <div className="mt-8">
          <span className="text-gray-400 mb-2 block">Already verified your email?</span>
          <div className="max-w-[110px] mx-auto">
            <ConfirmEmailBtn icon="/icons/chat.png" label="Login" href="/auth/login" />
          </div>
        </div>
        <Tooltip label="Not working yet :(" hasArrow>
          <div className="absolute bottom-10">
            <p className="text-center mt-6 opacity-[0.7] hover:opacity-100">
              {"Didn't receive the email? "}
              <a href="#" className="text-blue-500 hover:underline">
                Resend
              </a>
            </p>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

const ConfirmEmailBtn = ({
  icon,
  label,
  href,
  target = false,
}: {
  icon: string;
  label?: string;
  href: string;
  target?: boolean;
}) => {
  return (
    <a href={href} target={target ? "_blank" : "_self"} rel="noopener noreferrer select-none" draggable={false}>
      <div className="flex items-center dark:bg-white dark:text-black justify-center gap-2 border-2 border-gray-200 px-3 py-2 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-lg cursor-pointer transition active:scale-95">
        <Image src={icon} alt="Gmail icon" width={label ? 30 : 120} height={30} />
        {label && <span>{label}</span>}
      </div>
    </a>
  );
};
