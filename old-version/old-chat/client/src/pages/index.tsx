import type { NextPage } from "next"
import { FormControl, Box, Button, Spinner, Text, Heading } from "@chakra-ui/react"
import { FormEvent, useEffect, useState } from "react"
import axios from "axios"
import { BsCheck2 } from "react-icons/bs"
import router from "next/router"
import Input from "../components/login/Input"
import { useUserContext } from "../context/UserContext"
import { IUserCtx } from "types/IUserContext"

interface DataResponse {
  ok: boolean
  status: number
}

const Login: NextPage = () => {
  const [username, setFormUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [email, setFormEmail] = useState<string>("")

  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [activeBtn, setActiveBtn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [dataResponse, setDataResponse] = useState<DataResponse>({
    ok: false,
    status: 0,
  })
  const { setUser, user } = useUserContext()

  useEffect(() => {
    const emailRegex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+")
    setActiveBtn(username.length > 3 && password.length > 3 && email.length > 3)
    setValidEmail(emailRegex.test(email))
  }, [username, password, email])

  const handleSubmitUser = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post("/api/user", {
        username,
        password,
        email,
      })

      setLoading(false)
      console.log(res.data)
      setDataResponse(res.data)

      setUser({
        username: res.data.user.username,
        email: res.data.user.username,
        id: res.data.user.id,
        connected: true,
      })

      router.push("/chat")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box maxW="400px" m="2rem auto 0">
      <Heading as="h1">Welcome!</Heading>
      <FormControl
        as="form"
        isRequired
        display="flex"
        gridGap="2rem"
        flexFlow="column"
        method="POST"
        onSubmit={(e) => handleSubmitUser(e)}
      >
        <Input label="username" onChange={setFormUsername} errorMsg={""} whenShowError={false} />
        <Input label="email" onChange={setFormEmail} errorMsg={"Invalid email"} whenShowError={!validEmail} />
        <Input
          label="password"
          onChange={setPassword}
          errorMsg={"Password must be greater than 3"}
          whenShowError={password.length <= 3}
        />
        <Button type="submit" disabled={!activeBtn || dataResponse.ok}>
          {loading ? (
            <Spinner size="md" />
          ) : (
            <Box display="flex" alignItems="center" gridGap="0.5rem" color={dataResponse.ok ? "green.200" : "white"}>
              {dataResponse.ok ? <BsCheck2 size="1.5rem" /> : ""}
              Log In
            </Box>
          )}
        </Button>
      </FormControl>
      {dataResponse.ok && <Text>Redirecting to the chat...</Text>}
    </Box>
  )
}

export default Login
