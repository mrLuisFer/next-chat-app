import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import ChatContextProvider from "context/ChatContext"
import UserContextProvider from "context/UserContext"
import GifValueContextProvider from "context/GifValueContext"

const theme = extendTheme({
	config: {
		initialColorMode: "dark",
		useSystemColorMode: false,
	},
})

export default function ContextProviders({ children }: { children: any }) {
	return (
		<ChakraProvider theme={theme}>
			<UserContextProvider>
				<ChatContextProvider>
					<GifValueContextProvider>{children}</GifValueContextProvider>
				</ChatContextProvider>
			</UserContextProvider>
		</ChakraProvider>
	)
}
