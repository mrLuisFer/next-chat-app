import Link from "next/link";
import { Box, ButtonProps, LinkProps } from "@chakra-ui/react";

interface CustomButtonProps {
  asLink?: boolean;
  children: any;
  href?: string;
  onClickFunc?: () => void | any;
  [props: string]: ButtonProps | LinkProps | any;
}

export default function CustomButton({
  asLink = false,
  children,
  href = "",
  onClickFunc,
  ...props
}: CustomButtonProps) {
  if (asLink) {
    return (
      <Link href={href}>
        <Box
          as="a"
          key={typeof children === "string" ? children : `button-${href}`}
          cursor="pointer"
          transition="0.15s ease-in-out"
          padding="0.3rem 0.5rem"
          borderRadius="8px"
          fontSize="0.9rem"
          fontWeight="semibold"
          _hover={{ color: "white", bg: "black", textDecoration: "none" }}
          _active={{ bg: "black" }}
          userSelect="none"
          {...props}
          className="dark:text-white"
        >
          {children}
        </Box>
      </Link>
    );
  }

  return (
    <Box
      key={typeof children === "string" ? children : `button-${href}`}
      cursor="pointer"
      transition="0.15s ease-in-out"
      padding="0.3rem 0.5rem"
      borderRadius="8px"
      fontSize="0.9rem"
      fontWeight="semibold"
      _hover={{ color: "white", bg: "black", textDecoration: "none" }}
      _active={{ bg: "black" }}
      userSelect="none"
      onClick={onClickFunc}
      {...props}
      className="dark:text-white"
    >
      {children}
    </Box>
  );
}
