import { useState } from "react"
import { Image, Box, Text } from "@chakra-ui/react"

export default function SingleGif({ gif }: { gif: any }) {
  const [isHoverGif, setIsHoverGif] = useState<boolean>(false)

  const width: number = parseInt(gif.images.preview_gif.width)
  const height: number = parseInt(gif.images.preview_gif.height)

  return (
    <Box display="inline-block" position="relative" margin="0.2rem">
      {isHoverGif && (
        <Text
          position="absolute"
          m="0.5rem 0 0 0.5rem"
          isTruncated
          title={gif.title}
          width={width >= 500 ? width / 3 : width + 80}
        >
          {gif.title}
        </Text>
      )}
      <Image
        key={gif.id}
        src={gif.images.preview_gif.url}
        width={width >= 500 ? width / 2 : width + 130}
        max-width="100%"
        height={height >= 400 ? height / 2 : height + 130}
        alt={gif.title}
        alignItems="center"
        borderRadius="10px"
        onMouseEnter={() => setIsHoverGif(true)}
        onMouseLeave={() => setIsHoverGif(false)}
      />
    </Box>
  )
}
