import { Box, Input, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import Header from "../../components/shared/Header";
import { supabase } from "../../lib/supabaseClient";
import FormContainer from "../../components/auth/FormContainer";
import { useEffect, useRef } from "react";
import Link from "next/link";

const Register: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [err, setError] = useState(false);
  const router = useRouter();

  const registerMsgRef = useRef<HTMLAnchorElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement | HTMLDivElement> | any) => {
    e.preventDefault();

    if (!email || !password) {
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
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      } else {
        setError(false);
        console.log(data);
        router.push("/channels/[id]", "/channels/1");
      }
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement | HTMLDivElement> | any) => {
    const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$");
    setPasswordError(!passwordRegex.test(e.target.value));
    setPassword(e.target.value);
  };

  const handleChangeEmail = async (e: FormEvent<HTMLFormElement | HTMLDivElement> | any) => {
    const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$");
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
      <FormContainer titleForm="Login">
        <Box
          as="form"
          onSubmit={handleSubmit}
          mt={5}
          display="flex"
          flexDirection="column"
          gap="1.5rem"
          className="mx-0 mb-10"
        >
          <div className="flex flex-col w-full">
            <Input type="email" name="email" placeholder="Email" value={email} onChange={handleChangeEmail} />
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
              onChange={handleChangePassword}
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
            className="w-full bg-black text-white rounded-md py-2 font-bold transition active:scale-95 border-2 border-black dark:hover:border-white hover:border-gray-800"
          >
            Login
          </button>

          <div>
            <button
              className="bg-gray-700 px-4 py-2 rounded-lg active:scale-95 hover:brightness-105 hover:shadow-md"
              type="button"
              onClick={() => {
                setEmail("mrluisfeer@gmail.com");
                setPassword("@Luis21fer2121");
              }}
            >
              Autocomplete
            </button>
          </div>
        </Box>
        {err && <Text color="red.500">Something went wrong</Text>}
        <Text
          mt={5}
          className="text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition"
          onClick={() => registerMsgRef.current?.focus()}
        >
          {"Don't have an account?"}
          <Link href="/auth/register">
            <a
              ref={registerMsgRef}
              className="ml-2 bg-black text-white rounded-md px-4 py-1 cursor-pointer border-2 border-black hover:border-gray-700 dark:hover:border-gray-300 active:scale-95 transition"
            >
              Register
            </a>
          </Link>
        </Text>
      </FormContainer>
    </>
  );
};

export default Register;
