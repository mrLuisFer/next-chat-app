import { ListItem } from "@chakra-ui/react";

const Item = ({ children, key }: { children: any; key: string }) => {
  return (
    <ListItem
      key={key}
      transition="0.15s ease-in-out"
      userSelect="none"
      borderBottom="2px solid"
      lineHeight="-3px"
      borderColor="transparent"
      _hover={{ color: "blackAlpha.700", borderColor: "blackAlpha.700" }}
    >
      {children}
    </ListItem>
  );
};

export default Item;
