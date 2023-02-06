import { PopoverContent, Portal, PopoverCloseButton } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

interface IUserCardProps {
  setState?: Dispatch<SetStateAction<boolean>>;
  isOnAvatar?: boolean;
}

export default function UserCard({ isOnAvatar = false }: IUserCardProps): JSX.Element {
  return (
    <Portal>
      <PopoverContent>
        <PopoverCloseButton />
        <div className="py-4 px-2">user name</div>
      </PopoverContent>
    </Portal>
  );
}
