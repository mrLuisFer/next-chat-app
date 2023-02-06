import capitalize from "../../../helpers/capitalizeStr";
import { Tooltip } from "@chakra-ui/react";

export const MessageDate = ({ insertedAt }: { insertedAt: string }): JSX.Element => {
  const messageDate = new Date(insertedAt).toLocaleDateString();
  const currentDate = new Date().toLocaleDateString();
  const messageHourDate = new Date(insertedAt).getHours();
  const messageMinutesDate = new Date(insertedAt).getMinutes();
  const messageTime = `${messageHourDate}:${messageMinutesDate}`;
  const messageMonth = new Date(insertedAt).toLocaleString("default", { month: "long" });
  const messageDay = new Date(insertedAt).toLocaleDateString("es-MX", { weekday: "long" });
  const messageNumberDay = new Date(insertedAt).toLocaleString("default", { day: "numeric" });
  const messageYear = new Date(insertedAt).toLocaleString("default", { year: "numeric" });
  const fullMessageDateFormatted = capitalize(`${messageDay}, ${messageNumberDay} ${messageMonth} ${messageYear}`);

  return (
    <Tooltip label={fullMessageDateFormatted} placement="top" hasArrow>
      <p className="text-gray-400 text-xs">
        {messageDate === currentDate ? "Hoy a las" : messageDate} {messageTime}
      </p>
    </Tooltip>
  );
};
