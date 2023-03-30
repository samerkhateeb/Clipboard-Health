import { useDispatch, useSelector } from "react-redux";

import { BiCalendarEdit } from "react-icons/bi";
import IAgent from "@/interfaces/IAgent";
import IProps from "@/interfaces/IPorps";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import React, { useState } from "react";
import { deleteFacility, getAgents, getFacilities } from "@/lib/helper";
import {
  rChangeEmpID,
  rToggleChangeAction,
  rDeleteAgent,
} from "@/redux/Agents/agentSlice";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteAgent } from "@/lib/helper";
import IFacility from "@/interfaces/IFacility";

const Facilities: React.FC<IProps> = () => {
  const { isLoading, isError, data, error } = useQuery(
    "facilities",
    getFacilities
  );

  if (isLoading) return <> Loading ..</>;
  if (isError) return <> Error is ${error} ..</>;
  return (
    <table className="min-w-full table-auto ">
      <thead>
        <tr className="bg-gray-900 text-white">
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>

          <th className="px-16 py-2">
            <span className="text-gray-200">Date</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Shifts</span>
          </th>

          <th className="px-16 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data?.map((facility: IFacility, index) => {
          return <Tr key={index} {...facility}></Tr>;
        })}
      </tbody>
    </table>
  );
};

const Tr = ({ _id, name, date, status }: IFacility) => {
  const visible = useSelector((state: any) => state.agents.client.toggleForm);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const openToggleHandler = (e: any) => {
    if (!visible) {
      dispatch(rToggleChangeAction(_id));
    }
    dispatch(rChangeEmpID(_id));
  };

  const deleteMutation = useMutation(() => deleteFacility(_id), {
    onSuccess: async (data) => {
      queryClient.prefetchQuery("facilities", getFacilities);
    },
  });

  const onDelete = async (e: React.MouseEvent<HTMLElement>) => {
    await deleteMutation.mutate();
  };

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2">
        <span>{name}</span>
      </td>
      <td className="px-16 py-2">
        <span>{date}</span>
      </td>

      <td className="px-16 py-2">
        <button className="cursor">
          <div
            className={`${
              status.toLowerCase() == "active" ? "bg-green-500" : "bg-red-500"
            } text-white px-5 py-1 rounded-full`}
          >
            {status.toLowerCase() == "active" ? "Active" : "Inactive"}
          </div>
        </button>
      </td>
      <td className="px-16 my-2 flex justify-around gap-5">
        <button className="cursor">
          <BiCalendarEdit
            size={25}
            color={"#333"}
            onClick={openToggleHandler}
          ></BiCalendarEdit>
        </button>
        <button className="cursor" onClick={onDelete} color={"#333"}>
          <MdDeleteForever size={25}></MdDeleteForever>
        </button>
      </td>
    </tr>
  );
};
export default Facilities;
