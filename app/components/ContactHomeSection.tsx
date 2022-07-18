import { Box, Text, Heading, FormControl, Input } from "@chakra-ui/react";

export default function ContactHomeSection() {
  return (
    <Box id="contactus">
      <Heading as="h2" fontWeight="semibold" lineHeight="1.5">
        Love to hear you, <Text as="span" display="block">Get in touch</Text>
      </Heading>
      <FormControl>
      <Input type="text" />
      </FormControl>
    </Box>
  );
}
