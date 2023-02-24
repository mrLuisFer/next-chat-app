import { Box } from "@chakra-ui/react";
import PolicyFooter from "./PolicyFooter";
import { useSetDarkMode } from "../../hooks/useSetDarkMode";

export default function FormContainer({
  children,
  titleForm,
}: {
  children: React.ReactNode | any;
  titleForm: string;
}): JSX.Element {
  const { chakraColorMode } = useSetDarkMode();

  return (
    <>
      <Box className="context">
        <Box className="flex justify-center items-start pt-32 h-screen" position="relative" zIndex={10}>
          <div className="w-[500px] min-h-[460px] border-2 bg-stone-100 dark:border-gray-700 border-stone-200 hover:border-stone-800 dark:hover:border-gray-200 hover:shadow-sm dark:hover:shadow-lg transition rounded-lg p-8 dark:bg-gray-900 hover:scale-105">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mt-0 lg:text-center">
              {titleForm}
            </h1>
            {children}
          </div>
        </Box>
        <PolicyFooter />
      </Box>
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className={chakraColorMode === "light" ? "area-light" : "area"}>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}
