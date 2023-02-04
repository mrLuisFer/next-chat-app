import PolicyFooter from "./PolicyFooter";

export default function FormContainer({
  children,
  titleForm,
}: {
  children: React.ReactNode | any;
  titleForm: string;
}): JSX.Element {
  return (
    <>
      <div className="flex justify-center items-start pt-32 h-screen">
        <div className="w-[500px] min-h-[460px] border-2  dark:border-gray-700 border-stone-200 hover:border-gray-400 dark:hover:border-gray-200 hover:shadow-sm dark:hover:shadow-lg transition rounded-lg p-8 dark:bg-gray-900 hover:scale-105">
          <h1 className="text-3xl font-bold dark:text-white mt-0">{titleForm}</h1>
          {children}
        </div>
      </div>
      <PolicyFooter />
    </>
  );
}
