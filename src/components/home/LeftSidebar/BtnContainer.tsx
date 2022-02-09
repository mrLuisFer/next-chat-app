import { Box } from "@chakra-ui/react";

export default function BtnContainer({
  children,
  ...props
}: {
  children: any;
  [props: string]: any;
}) {
  return (
    <Box
      display="flex"
      alignItems="center"
      p="0.5rem"
      transition="all 0.15s ease"
      borderRadius="10px"
      gap="0.5rem"
      cursor="pointer"
      userSelect="none"
      _hover={{ bg: "gray.700" }}
      _active={{ bg: "gray.600" }}
      {...props}
    >
      {children}
    </Box>
  );
}
