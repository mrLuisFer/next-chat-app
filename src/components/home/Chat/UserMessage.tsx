import {Box} from '@chakra-ui/react'
import type { IMsg } from "types/IMsg";

interface UserMessageProps {
	msg: IMsg
}

export default function UserMessage({msg}: UserMessageProps) {
	return (
		<Box>
			<li>
				<p>{msg.user}</p>
				<span>
					{msg.msg}
				</span>
			</li>
		</Box>
	)
}