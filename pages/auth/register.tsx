import { Box, Input, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import type { FormEvent } from "react";
import Header from "../../components/shared/Header";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import FormContainer from "../../components/auth/FormContainer";

const Register: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [error, setError] = useState(false);
  const router = useRouter();

  const loginMsgRef = useRef<HTMLAnchorElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement | HTMLDivElement> | any): Promise<void> => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    if (emailError || passwordError) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error != null) {
        setError(true);
        // alert(`Signup Error ${error.message}`);

        setTimeout(() => {
          setError(false);
        }, 2000);
      } else {
        setError(false);
        console.info(data);
        void router.push("/auth/confirm-email");
      }
    } catch (error) {
      setError(true);
      console.log({ error });
    }
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement | HTMLDivElement> | any): Promise<void> => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    setPasswordError(!passwordRegex.test(e.target.value));
    setPassword(e.target.value);
  };

  const handleChangeEmail = async (e: FormEvent<HTMLFormElement | HTMLDivElement> | any): Promise<void> => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    setEmailError(!emailRegex.test(e.target.value));
    setEmail(e.target.value);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <Header />
      <FormContainer titleForm="Sign Up">
        <Box
          as="form"
          onSubmit={(e: FormEvent<HTMLElement>) => {
            void handleSubmit(e);
          }}
          mt={5}
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDirection="column"
          gap="1.5rem"
          className="mx-0 mb-10"
        >
          <div className="flex flex-col w-full">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                void handleChangeEmail(e);
              }}
            />
            {emailError && (
              <Text color="red.500" mt="2px" fontSize={14}>
                Email must be valid
              </Text>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                void handleChangePassword(e);
              }}
            />
            {passwordError && (
              <Text color="red.500" mt="2px" fontSize={14}>
                Password must contain at least 8 characters, including uppercase, lowercase, numbers and special
                characters
              </Text>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-bold rounded-md py-2 px-4 hover:shadow-sm active:scale-95 transition border-2 border-black dark:hover:border-white hover:border-gray-800"
          >
            Register
          </button>
          {error && <Text color="red.500">Something went wrong</Text>}
        </Box>
        <Text
          mt="1rem"
          className="text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition w-fit"
          onClick={() => loginMsgRef.current?.focus()}
        >
          Already have an account?
          <Link href="/auth/login">
            <a
              ref={loginMsgRef}
              className="ml-2 bg-black text-white rounded-md px-4 py-1 cursor-pointer border-2 border-black hover:border-gray-700 dark:hover:border-gray-300 active:scale-95 transition"
            >
              Login
            </a>
          </Link>
        </Text>
      </FormContainer>
    </>
  );
};

export default Register;
