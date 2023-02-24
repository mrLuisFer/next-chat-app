import { type ColorMode, useColorMode } from "@chakra-ui/react";

export const useSetDarkMode = (): { chakraColorMode: ColorMode; handleDarkMode: () => void } => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleDarkMode = (): void => {
    toggleColorMode();
    const htmlElement = document.querySelector("html");
    if (htmlElement == null) return;

    if (colorMode === "light") {
      htmlElement.classList.remove("light");
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
      htmlElement.classList.add("light");
    }

    localStorage.setItem("theme", colorMode);
  };

  console.log(colorMode);
  return { chakraColorMode: colorMode, handleDarkMode };
};
