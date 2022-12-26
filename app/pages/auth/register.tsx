import { Box, Button, Container, Input, Text, Link as ChakraLink } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { UserCredential, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Header from "../../components/shared/Header";
import Title from "../../components/shared/Title";

const Register: NextPage = () => {
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement | HTMLDivElement> | any) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].files[0];
    console.log({ displayName, email, password, avatar });

    try {
      const userCredentials: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      console.log({ user });

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on(
        "state_changed",
        (error) => {
          setError(true);
          console.log({ error });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName,
              photoURL: downloadURL,
              email: user.email,
            });

            console.log("Upload complete");
          });
        }
      );
    } catch (error) {
      setError(true);
      console.log({ error });
    }
  };

  return (
    <>
      <Header />
      <Container pt={10}>
        <Title>Register</Title>
        <Box as="form" onSubmit={handleSubmit} mt={5}>
          <Input type="text" name="displayName" placeholder="Name" />
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <Input type="file" name="avatar" />
          <Button mt={4} type="submit">
            Register
          </Button>
        </Box>
        <Text>
          Already have an account?
          <Link href="/auth/login">
            <ChakraLink ml={2} color="blue.600">
              Login
            </ChakraLink>
          </Link>
        </Text>
        {error && <Text color="red.500">Something went wrong</Text>}
      </Container>
    </>
  );
};

export default Register;
