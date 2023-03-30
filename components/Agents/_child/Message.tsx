import { BiCheck } from "react-icons/bi";
import IMessage from "@/interfaces/IMessage";
import React from "react";
const Message: React.FC<IMessage> = ({ type, children }) => {
  return (
    <div>
      {type == "success" && (
        <div className="success container mx-auto">
          <div className="flex justify-center mx-auto border border-yellow-200 bg-yellow-400 w-3/6 text-gray-900 text-md my-4 py-2 text-center bg-opacity-5">
            {children} <BiCheck size={25} color={"rgb(34,197,94)"}></BiCheck>
          </div>
        </div>
      )}
      {type == "error" && (
        <div className="success container mx-auto">
          <div className="flex justify-center mx-auto border border-red-200 bg-red-400 w-3/6 text-gray-900 text-md my-4 py-2 text-center bg-opacity-5">
            {children}
            <BiCheck size={25} color={"rgb(34,197,94)"}></BiCheck>
          </div>
        </div>
      )}
    </div>
  );
};
export default Message;
