import { Html, Head, Main, NextScript, NextDocument } from "next/document"
import { ColorModeScript } from "@chakra-ui/react"
import { theme } from "utils/chakraTheme"

const CustomDocument: NextDocument = () => (
  <Html lang="en">
    <Head></Head>
    <body>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default CustomDocument
