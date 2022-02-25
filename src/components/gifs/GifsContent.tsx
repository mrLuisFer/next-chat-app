import { Box, Image, Spinner } from "@chakra-ui/react"

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
          {gifsData.map((gif: any) => {
            const width: number = parseInt(gif.images.preview_gif.width)
            const height: number = parseInt(gif.images.preview_gif.height)
            return (
              <Image
                key={gif.id}
                src={gif.images.preview_gif.url}
                width={width >= 500 ? width / 2 : width + 130}
                max-width="100%"
                height={height >= 400 ? height / 2 : height + 130}
                alt={gif.title}
                display="inline-block"
                alignItems="center"
                margin="0.2rem"
                borderRadius="10px"
              />
            )
          })}
        </Box>
      )}
    </>
  )
}
