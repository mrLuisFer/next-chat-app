import { Box } from "@chakra-ui/react";

export default function BtnContainer({
  children,
  ...props
}: {
  children: any;
  [props: string]: any;
}) {
  const boxShadowValue: string = "0px 1px 5px rgba(0, 0, 0, 0.2)";

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
      _hover={{ bg: "gray.700", boxShadow: boxShadowValue }}
      _active={{ bg: "gray.600", boxShadow: boxShadowValue }}
      {...props}
    >
      {children}
    </Box>
  );
}
