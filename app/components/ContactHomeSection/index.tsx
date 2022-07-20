import { Box, Text, Heading, Textarea } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import ContactInput from "./ContactInput";
import { FaHourglassEnd } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { BiCheck } from "react-icons/bi";
import Image from "next/image";

const ContactFlex = ({ children }: { children: any }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-evenly" gap="6rem" mb="2rem">
      {children}
    </Box>
  );
};

type BtnStatus = "submitting" | "none" | "completed";

export default function ContactHomeSection() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [btnStatus, setBtnStatus] = useState<BtnStatus>("none");

  const emailRegex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+");
  const emailErr: boolean = !emailRegex.test(email);
  const nameErr: boolean = name.length <= 2;
  const msgErr: boolean = msg.length <= 5;
  const invalidBtn: boolean = emailErr || nameErr || msgErr;

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    setBtnStatus("submitting");
    console.log(e);
  };

  const renderSwitch = (iconStatus: BtnStatus) => {
    switch (iconStatus) {
      case "none":
        return <IoSend />;
      case "submitting":
        return <FaHourglassEnd />;
      case "completed":
        return <BiCheck />;
      default:
        return <IoSend />;
    }
  };

  return (
    <Box id="contactus">
      <Box display="flex" justifyContent="center">
        <Heading as="h2" fontWeight="semibold" lineHeight="1.5" mb="1rem" textAlign="center">
          Love to hear from you,{" "}
          <Text as="span" display="flex" alignItems="center" gridGap="1rem" userSelect="none">
            Get in touch
            <Image src="/images/contact-hand.svg" alt="Contact" width="60px" height="60px" draggable="false" />
          </Text>
        </Heading>
      </Box>
      <Box
        as="form"
        maxW="800px"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="space-between"
        m="0 auto"
        onSubmit={(e: FormEvent<HTMLElement>) => handleSubmit(e)}
      >
        <ContactFlex>
          <ContactInput
            label="Your name"
            value={name}
            setValue={setName}
            errorMsg="Name must be greater than 2"
            helperMsg=""
            placeholder="John"
            key="name"
            onError={nameErr}
          />
          <ContactInput
            label="Your email"
            value={email}
            setValue={setEmail}
            errorMsg="Pls insert a valid email"
            helperMsg=""
            placeholder="john@email.com"
            key="email"
            onError={emailErr}
          />
        </ContactFlex>
        <ContactFlex>
          <Textarea
            placeholder="Write your message here pls..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            resize="none"
            size="md"
          />
          <Box
            as="button"
            bg="black"
            opacity={invalidBtn ? "0.6" : "1"}
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="1rem 4rem"
            borderRadius="8px"
            w="360px"
            fontSize="1.2rem"
            gridGap="1rem"
            transition="0.2s ease"
            type="submit"
            cursor="default"
            disabled={invalidBtn}
            fontWeight="semibold"
            onClick={() => setBtnStatus("submitting")}
            _hover={{
              background: invalidBtn ? "" : "blue.500",
            }}
          >
            {renderSwitch(btnStatus)}
            Just send
          </Box>
        </ContactFlex>
      </Box>
    </Box>
  );
}
