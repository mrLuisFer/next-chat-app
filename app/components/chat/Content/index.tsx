import { Box, List, ListItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { GrSend } from "react-icons/gr";

export default function ChatContent({ socket }) {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const receiveMessage = (message) => {
			setMessages([message, ...messages]);
		};

		socket.on("message", receiveMessage);

		return () => {
			socket.off("message", receiveMessage);
		};
	}, [messages]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const newMessage = {
			body: message,
			from: "Me",
		};
		setMessages([...messages, newMessage]);
		setMessage("");
		socket.emit("message", newMessage.body);
	};

	return (
		<Box p="3rem" zIndex="8" boxShadow="-3px 0px 10px rgba(0, 0, 0, 0.1)">
			<form onSubmit={handleSubmit}>
				<List>
					{messages.map((message, index) => (
						<ListItem
							key={index}
							bg={message.from === "Me" ? "blue.700" : "black"}
							ml={message.from === "Me" ? "auto" : "0"}
						>
							<b>{message.from}</b>:{message.body}
						</ListItem>
					))}
				</List>

				<input
					name="message"
					type="text"
					placeholder="Write your message..."
					onChange={(e) => setMessage(e.target.value)}
					value={message}
					autoFocus
				/>
				<Box as="button">
					Send <GrSend />
				</Box>
			</form>
		</Box>
	);
}
