import { Box, Button, Container, Input, Text, Link as ChakraLink } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import { FormEvent } from "react";

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
    <Container pt={10}>
      <Box as="form" onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
        <Button mt={4} type="submit">
          Login
        </Button>
      </Box>
      <Text>
        {"Don't have an account?"}
        <Link href="/auth/register">
          <ChakraLink ml={2} color="blue.600">
            Register
          </ChakraLink>
        </Link>
      </Text>
      {err && <Text color="red.500">Something went wrong</Text>}
    </Container>
  );
};

export default Register;
