import type { NextPage } from "next"
import { FormControl, Input, FormLabel, Box, Button, FormHelperText } from "@chakra-ui/react"
import { FormEvent, useEffect, useState } from "react"

const Login: NextPage = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [activeBtn, setActiveBtn] = useState<boolean>(false)

  useEffect(() => {
    setActiveBtn(username.length > 3 && password.length > 3)
  }, [username, password])

  const handleSubmitUser = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    const userObj = {
      username,
      password,
    }
  }

  return (
    <Box maxW="400px" m="2rem auto 0">
      <FormControl
        as="form"
        isRequired
        display="flex"
        gridGap="2rem"
        flexFlow="column"
        action="http://localhost:8000/user"
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
        <Button type="submit" disabled={!activeBtn}>
          Log In
        </Button>
      </FormControl>
    </Box>
  )
}

export default Login
