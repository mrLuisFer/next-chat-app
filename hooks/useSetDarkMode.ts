import { type ColorMode, useColorMode } from "@chakra-ui/react";

export const useSetDarkMode = (): { chakraColorMode: ColorMode; handleDarkMode: () => void } => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleDarkMode = (): void => {
    toggleColorMode();
    document.querySelector("html")?.classList.toggle("dark");
    const isDarkMode: boolean = document.querySelector("html")?.classList.contains("dark") ?? false;
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

  return { chakraColorMode: colorMode, handleDarkMode };
};
