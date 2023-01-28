import { Box, Button, Container, Input, Text, Link as ChakraLink } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import Header from "../../components/shared/Header";
import Title from "../../components/shared/Title";
import CustomButton from "../../components/shared/CustomButton";

const Register: NextPage = () => {
  const [err, setErr] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement | HTMLDivElement> | any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/chat");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <>
      <Header />
      <Container pt={10}>
        <Title>Login</Title>
        <Box as="form" onSubmit={handleSubmit} mt={5} display="flex" flexDirection="column" gap="1rem">
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          {/* <CustomButton mt={2} type="submit" bg="gray.100" p="10px 0" textAlign="center" fontWeight="600">
            Login
          </CustomButton> */}
          <button
            type="submit"
            className="w-32 bg-black text-white rounded-md py-2 font-bold transition active:scale-95"
          >
            Login
          </button>
        </Box>
        <Text mt={5}>
          {"Don't have an account?"}
          <CustomButton href="/auth/register" asLink ml={2}>
            Register
          </CustomButton>
        </Text>
        {err && <Text color="red.500">Something went wrong</Text>}
      </Container>
    </>
  );
};

export default Register;
