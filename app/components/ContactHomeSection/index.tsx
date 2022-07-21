import { Box, Text, Heading, Textarea, FormControl, FormLabel } from "@chakra-ui/react";
import ContactInput from "./ContactInput";
import { FaHourglassEnd } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { BiCheck } from "react-icons/bi";
import Image from "next/image";
import { FormEvent, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { BiTrashAlt } from "react-icons/bi";

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

  const formRef = useRef<any>();

  const emailRegex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+");
  const emailErr: boolean = !emailRegex.test(email);
  const nameErr: boolean = name.length <= 2;
  const msgErr: boolean = msg.length <= 5;
  const invalidBtn: boolean = emailErr || nameErr || msgErr;

  const clearInputs = () => {
    setName("");
    setEmail("");
    setMsg("");
  };

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    setBtnStatus("submitting");

    emailjs
      .sendForm(`${process.env.SERVICE_ID}`, `${process.env.TEMPLATE_ID}`, formRef.current, `${process.env.EMAIL_KEY}`)
      .then(
        (result: any) => {
          if (result.text === "OK") {
            setBtnStatus("completed");
            clearInputs();
            const timer = setTimeout(() => {
              setBtnStatus("none");
            }, 2000);

            return clearTimeout(timer);
          }
        },
        (error: any) => {
          console.log(error.text);
        }
      );
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
        ref={formRef}
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
            name="user_name"
          />
          <ContactInput
            label="Your email"
            value={email}
            setValue={setEmail}
            errorMsg="Pls insert a valid email"
            helperMsg=""
            placeholder="john@email.com"
            key="email"
            name="user_email"
            onError={emailErr}
          />
        </ContactFlex>
        <ContactFlex>
          <FormControl>
            <FormLabel>Message</FormLabel>
            <Textarea
              placeholder="Write your message here pls..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              resize="none"
              name="message"
              size="md"
            />
          </FormControl>
          <Box
            as="button"
            bg={btnStatus === "completed" ? "green.400" : "black"}
            opacity={btnStatus === "completed" ? "1" : invalidBtn ? "0.6" : "1"}
            color={btnStatus === "completed" ? "gray.900" : "white"}
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
            {btnStatus === "completed" ? "Completed" : "Just send"}
          </Box>
        </ContactFlex>
        <Box
          as="button"
          display="flex"
          type="button"
          alignItems="center"
          gridGap="0.5rem"
          fontSize="0.9rem"
          w="fit-content"
          p="0.5rem 1rem"
          transition="0.15s ease"
          cursor="default"
          borderRadius="1px"
          _hover={{ bg: "black", color: "white", borderRadius: "8px" }}
          onClick={() => {
            clearInputs();
            setBtnStatus("none");
          }}
        >
          <BiTrashAlt />
          Clear all inputs
        </Box>
      </Box>
    </Box>
  );
}
