import { Box, BoxProps } from "@chakra-ui/react"

interface LayoutProps {
  children: any
  [props: string]: BoxProps
}

export default function Layout({ children, ...props }: LayoutProps) {
  return (
    <Box p="0 2rem 0 0.5rem" {...props}>
      <>{children}</>
    </Box>
  )
}
