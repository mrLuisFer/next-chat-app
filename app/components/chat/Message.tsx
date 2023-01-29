import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { deleteMessage } from "../../lib/store";

interface TMessageProps {
  message: any;
}

const Message = ({ message }: TMessageProps): JSX.Element => {
  const { user, userRoles } = useContext(UserContext);

  console.log(message);
  return (
    <div className="py-1 flex items-center space-x-2">
      <div className="text-gray-100 w-4">
        {(user?.id === message.user_id || userRoles.some((role) => ["admin", "moderator"].includes(role))) && (
          <button
            onClick={() => {
              void deleteMessage(message.id);
            }}
          >
            trash
          </button>
        )}
      </div>
      <div>
        {Boolean(message.author) && <p className="text-blue-700 font-bold">{message?.author?.username}</p>}
        <p className="text-white">{message.message}</p>
      </div>
    </div>
  );
};

export default Message;
