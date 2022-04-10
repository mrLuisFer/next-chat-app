import { nanoid } from "nanoid"

export default function Messages({ receivedMessages, ably }: { receivedMessages: any[]; ably: any }) {
  return (
    <>
      {receivedMessages.map((message) => {
        const author = message.connectionId === ably.connection.id ? "me" : "other"
        return (
          <p key={nanoid()} data-author={author}>
            {message.data}
          </p>
        )
      })}
    </>
  )
}
