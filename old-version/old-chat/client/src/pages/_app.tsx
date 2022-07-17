import "../styles/globals.css"
import { useEffect, useState } from "react"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { Grid, Box } from "@chakra-ui/react"
import ContextProviders from "components/ContextProviders"
import LeftSidebar from "components/common/LeftSidebar"

const App = ({ Component, pageProps }: AppProps) => {
  const [pathUrl, setPathUrl] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    setPathUrl(router.pathname)
  }, [router])

  const atLoginPath: boolean = pathUrl === "/"

  return (
    <ContextProviders>
      <Grid gridTemplateColumns={atLoginPath ? "1fr" : "220px 1fr"} color="white" gridGap="10px">
        {!atLoginPath && <LeftSidebar />}
        <Box p={atLoginPath ? "2rem" : "2rem 0"}>
          <Component {...pageProps} />
        </Box>
      </Grid>
    </ContextProviders>
  )
}

export default App
