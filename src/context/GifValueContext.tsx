import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface IGifValue {
  gifValue: string
  setGifValue: Dispatch<SetStateAction<string>>
}

const ctxInitialValue: IGifValue = {
  gifValue: "",
  setGifValue: (s) => s,
}

export const GifValueContext = createContext(ctxInitialValue)

export default function GifValueContextProvider({ children }: { children: any }) {
  const [gifValue, setGifValue] = useState<string>("")

  return <GifValueContext.Provider value={{ gifValue, setGifValue }}>{children}</GifValueContext.Provider>
}

export const useGetGifValue = (): IGifValue => {
  const { gifValue, setGifValue } = useContext(GifValueContext)
  if (gifValue === undefined || setGifValue === undefined) {
    throw new Error("useChatCtx must be used within a ChatContextProvider")
  } else {
    return { gifValue, setGifValue }
  }
}

