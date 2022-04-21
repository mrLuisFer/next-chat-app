import { Box, Spinner } from "@chakra-ui/react"
import SingleGif from "./SingleGif"

interface GifsContentProps {
  gifsData: any[]
  loading: boolean
}

export default function GifsContent({ gifsData, loading }: GifsContentProps) {
  return (
    <>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Box className="gifsContent">
          {gifsData.map((gif: any) => (
            <SingleGif gif={gif} key={gif.id} />
          ))}
        </Box>
      )}
    </>
  )
}
