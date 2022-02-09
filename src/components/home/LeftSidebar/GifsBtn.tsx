import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineFileGif } from "react-icons/ai";
import BtnContainer from "./BtnContainer";

export default function GifsBtn() {
  return (
    <Link href="/gifs" passHref>
      <a>
        <BtnContainer>
          <AiOutlineFileGif size="2rem" />
          <Text fontSize="xl" fontWeight="medium">
            Gifs
          </Text>
        </BtnContainer>
      </a>
    </Link>
  );
}
