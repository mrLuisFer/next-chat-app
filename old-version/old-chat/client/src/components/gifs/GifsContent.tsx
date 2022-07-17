import { Box, Spinner } from "@chakra-ui/react"
import SingleGif from "./SingleGif"

interface GifsContentProps {
  gifsData: any[]
  loading: boolean
}

export default function GifsContent({ gifsData, loading }: GifsContentProps) {
  if (loading) {
    return <Spinner size="xl" speed="0.65s" thickness="3px" />
  }

  return (
    <Box className="gifsContent">
      {gifsData.map((gif: any) => (
        <SingleGif gif={gif} key={gif.id} />
      ))}
    </Box>
  )
}
