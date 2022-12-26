import { Text, FormControl, Input, FormLabel, FormHelperText, FormErrorMessage } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface InputProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  errorMsg: string;
  placeholder?: string;
  helperMsg: string;
  required?: boolean;
  onError: boolean;
  name: string;
}

export default function ContactInput({
  label,
  value,
  setValue,
  errorMsg,
  placeholder = "",
  helperMsg,
  required = false,
  onError = false,
  name = "",
}: InputProps) {
  const [focus, setFocus] = useState<boolean>(false);
  const handleInputChange = (e: any) => setValue(e.target.value);

  return (
    <FormControl
      isInvalid={onError}
      isRequired={required}
      opacity={focus ? "1" : "0.6"}
      transition="0.2s ease"
      _hover={{ opacity: "1", borderColor: "black" }}
      _focus={{ borderColor: "black" }}
    >
      <FormLabel>{label}</FormLabel>
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleInputChange(e)}
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        name={name}
        _focus={{ borderColor: "black" }}
        _hover={{ borderColor: "black" }}
      />
      {onError ? <FormErrorMessage>{errorMsg}</FormErrorMessage> : <FormHelperText>{helperMsg}</FormHelperText>}
    </FormControl>
  );
}
