import ContactForm from "../components/contact/ContactForm";
import Header from "../components/shared/Header";
import { Box } from "@chakra-ui/react";

export default function Contact() {
  return (
    <>
      <Header />
      <Box id="contactus" mt={10}>
        <ContactForm />;
      </Box>
    </>
  );
}
