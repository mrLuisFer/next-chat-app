
import { Input as ChakraInput, FormLabel, Box,FormHelperText,  Text} from "@chakra-ui/react"
import {Dispatch, SetStateAction} from "react"

interface InputProps {
  label: string
  onChange: Dispatch<SetStateAction<string>>
  errorMsg: string
  whenShowError: boolean
}

export default function Input({label, onChange, errorMsg = "", whenShowError = false}: InputProps) {
  return (
    <Box>
      <FormLabel fontSize="1.2rem" fontWeight="semibold" htmlFor={label.toLowerCase()} userSelect="none">
        {label}
      </FormLabel>
      <ChakraInput
        type="text"
        placeholder={`Enter your ${label}`}
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        onChange={(e) => onChange(e.target.value)}
      />
      {
        <FormHelperText color="red.600" opacity={whenShowError ? "1" : "0"}>
            <Text>{errorMsg}</Text>
          </FormHelperText>
      }
    </Box>
  )
}
