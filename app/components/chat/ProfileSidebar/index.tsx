import { useSession, signOut, SignOutResponse } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { IoSettingsSharp, IoChatbubbles } from "react-icons/io5";
import { BsInfoCircleFill } from "react-icons/bs";
import { useState } from "react";
import { IconType } from "react-icons";

const hoverOpt = {
  bg: "black",
  borderRadius: "15px",
  color: "white",
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
};

const ProfileSidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    const data: SignOutResponse | any = await signOut({
      redirect: true,
      callbackUrl: "/auth/login",
    });

    if (data) {
      router.push(data.url);
    }
  };

  if (!session) {
    return <Box>Session not found</Box>;
  }

  console.log(session)
  const username: string = session!.user!.name!.toLowerCase().split(" ").join("-");

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      boxShadow="3px 0px 10px rgba(0, 0, 0, 0.1)"
      zIndex="9"
      p="2rem 0.5rem"
    >
      <Box>
        <SidebarTitle>Profile</SidebarTitle>
        <SidebarLink href={`/profile/${username}`}>
          <Image
            src={session!.user!.image || ""}
            alt={session!.user!.name || ""}
            width="50px"
            height="50px"
            className="profile-img"
          />
          <Text>{session!.user!.name || ""}</Text>
        </SidebarLink>
        <Box display="flex" flexDirection="column" gridGap="1rem" mt="3rem">
          <SidebarLink href="/chat" icon={<IoChatbubbles />}>
            Chat
          </SidebarLink>
          <SidebarLink href="/about" icon={<BsInfoCircleFill />}>
            About
          </SidebarLink>
        </Box>
      </Box>
      <Box>
        <SidebarTitle>Settings</SidebarTitle>
        <SidebarBtn icon={<IoSettingsSharp />}>Settings</SidebarBtn>
      </Box>
    </Box>
  );
};

type Icon = IconType | JSX.Element | any;
function SidebarBtn({ children, icon }: { children: any; icon?: Icon }) {
  return (
    <Box
      as="button"
      display="flex"
      alignItems="center"
      gridGap="0.8rem"
      justifyContent="flex-start"
      p="0.5rem"
      transition="0.2s ease"
      cursor="pointer"
      fontWeight="semibold"
      fontSize="1.1rem"
      w="100%"
      textTransform="capitalize"
      _hover={hoverOpt}
    >
      {icon ? <Text fontSize="1.5rem">{icon}</Text> : <></>}
      {children}
    </Box>
  );
}

function SidebarLink({ children, href, icon }: { children: any; href: string; icon?: Icon }) {
  const router = useRouter();
  const path: boolean = router.pathname === href;

  return (
    <Link href={href}>
      <Box
        as="a"
        display="flex"
        alignItems="center"
        gridGap="0.8rem"
        justifyContent="flex-start"
        p="0.5rem"
        transition="0.2s ease"
        cursor="pointer"
        fontWeight="semibold"
        fontSize="1.1rem"
        textTransform="capitalize"
        w="100%"
        borderRadius={path ? "15px" : ""}
        bg={path ? "black" : "auto"}
        color={path ? "white" : "black"}
        _hover={hoverOpt}
      >
        {icon ? <Text fontSize="1.5rem">{icon}</Text> : <></>}
        {children}
      </Box>
    </Link>
  );
}

function SidebarTitle({ children }: { children: any }) {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Text
      fontSize="0.9rem"
      display="flex"
      gridGap="1rem"
      alignItems="center"
      justifyContent="flex-start"
      pb="1rem"
      color="gray.300"
      fontWeight="semibold"
      userSelect="none"
      opacity={isHover ? "1" : "0.7"}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
      <Box
        as="span"
        bg="gray.300"
        h="2px"
        opacity={isHover ? "0.5" : "0"}
        w="100%"
        borderRadius="10px"
        transition="0.2s ease"
      ></Box>
    </Text>
  );
}

export default ProfileSidebar;
