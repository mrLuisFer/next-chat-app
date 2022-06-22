import type { NextPage } from "next"
import { FormControl, Input, FormLabel, Box, Button, FormHelperText, Spinner, Text, Heading } from "@chakra-ui/react"
import { FormEvent, useEffect, useState } from "react"
import axios from "axios"
import { BsCheck2 } from "react-icons/bs"
import type { User } from "../types/index.d.ts"
import router from "next/router"

interface DataResponse {
  ok: boolean
  status: number
  user: User
}

const Login: NextPage = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [activeBtn, setActiveBtn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [dataResponse, setDataResponse] = useState<DataResponse>({
    ok: false,
    status: 0,
    user: {
      username: "",
      password: "",
    },
  })

  useEffect(() => {
    setActiveBtn(username.length > 3 && password.length > 3)
  }, [username, password])

  const handleSubmitUser = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post("http://localhost:8000/user", {
        username,
        password,
      })

      setLoading(false)
      console.log(res.data)
      setDataResponse(res.data)
      // TODO: save the user in a global context
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
        <div>
          <FormLabel fontSize="1.2rem" fontWeight="semibold" htmlFor="username">
            Username
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter your username"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <FormLabel fontSize="1.2rem" fontWeight="semibold" htmlFor="password">
            Password
          </FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormHelperText color={password.length <= 3 ? "red.600" : "green.200"} opacity="0.6">
            {password.length <= 3 ? "Password must be greater than 3" : "Looks good ;)"}
          </FormHelperText>
        </div>
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
