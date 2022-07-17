import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

interface LinkProps {
  to: string;
  children: any;
  [styles: string]: any;
}

export default function Link({ to, children, ...styles }: LinkProps) {
  return (
    <NextLink href={to}>
      <ChakraLink {...styles}>{children}</ChakraLink>
    </NextLink>
  );
}
