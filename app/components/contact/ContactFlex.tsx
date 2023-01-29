import { Box } from "@chakra-ui/react";

const ContactFlex = ({ children }: { children: any }): JSX.Element => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-evenly" gap="6rem" mb="2rem">
      {children}
    </Box>
  );
};

export default ContactFlex;
