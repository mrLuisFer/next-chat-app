import { Dispatch, SetStateAction } from "react"
import { Stack, InputGroup, InputLeftElement, Input } from "@chakra-ui/react"
import { AiOutlineSearch } from "react-icons/ai"

interface SearchBarProps {
  setGifsQuery: Dispatch<SetStateAction<string>>
  gifsQuery: string
}

export default function SearchBar({ setGifsQuery, gifsQuery }: SearchBarProps) {
  return (
    <Stack mb="1rem">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <AiOutlineSearch size="1.5rem" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search some awesome gif"
          value={gifsQuery}
          onChange={(e) => setGifsQuery(e.target.value)}
        />
      </InputGroup>
    </Stack>
  )
}
