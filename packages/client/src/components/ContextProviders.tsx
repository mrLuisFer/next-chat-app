import { ChakraProvider } from "@chakra-ui/react"
import ChatContextProvider from "context/ChatContext"
import UserContextProvider from "context/UserContext"
import GifValueContextProvider from "context/GifValueContext"
import { theme } from "utils/chakraTheme"

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
