import Link from "next/link"
import BtnContainer from "./BtnContainer"
import { Text } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { nanoid } from "nanoid"

type SidebarBtnProps = {
  to: string
  text: string
  Icon: IconType
}

export default function SimpleSidebarBtn({ to, text, Icon }: SidebarBtnProps) {
  return (
    <Link href={to}>
      <a>
        <BtnContainer key={nanoid()}>
          <Icon size="2rem" />
          <Text>{text}</Text>
        </BtnContainer>
      </a>
    </Link>
  )
}
