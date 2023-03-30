import { useDispatch, useSelector } from "react-redux";

import { BiCalendarEdit } from "react-icons/bi";
import IAgent from "@/interfaces/IAgent";
import IProps from "@/interfaces/IPorps";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import React, { useState } from "react";
import { getAgents } from "@/lib/helper";
import {
  rChangeEmpID,
  rToggleChangeAction,
  rDeleteAgent,
} from "@/redux/Agents/agentSlice";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteAgent } from "@/lib/helper";
import IShift from "@/interfaces/IShift";

const Table: React.FC<IProps> = () => {
  const { isLoading, isError, data, error } = useQuery("agents", getAgents);

  if (isLoading) return <>Agent is Loading ..</>;
  if (isError) return <> Error is ${error} ..</>;
  return (
    <table className="min-w-full table-auto ">
      <thead>
        <tr className="bg-gray-900 text-white">
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Salary</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Facility</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Shifts</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data?.map((agent: IAgent, index) => {
          return <Tr key={index} {...agent}></Tr>;
        })}
      </tbody>
    </table>
  );
};

const Tr = ({
  _id,
  name,
  avatar,
  email,
  salary,
  date,
  status,
  facility,
  shifts,
}: IAgent) => {
  const visible = useSelector((state: any) => state.agents.client.toggleForm);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  // const [empId, setEmpId]  = useState(Number);

  const openToggleHandler = (e: any) => {
    if (!visible) {
      dispatch(rToggleChangeAction(_id));
      // console.log("_id in Table->", _id);
    }
    dispatch(rChangeEmpID(_id));
  };

  // const deleteMutation = useMutation(() => deleteAgent(_id), {
  //   onSuccess: async (data) => {
  //     // console.log("deleted successfully");
  //     queryClient.prefetchQuery("agents", getAgents);
  //   },
  // });

  const onDelete = async (e: React.MouseEvent<HTMLElement>) => {
    // const { isLoading, isError, data, error } = useQuery(
    //   ["agents", _id],
    //   () => deleteAgent(_id)
    // );

    dispatch(rDeleteAgent(_id));
    // await deleteMutation.mutate();
  };

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <Image
          src={avatar}
          alt={name}
          width={8}
          height={8}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className=" text-center ml-2 font-semibold">{name}</div>
      </td>
      <td className="px-16 py-2">
        <span>{email}</span>
      </td>
      <td className="px-16 py-2">
        <span>{salary}</span>
      </td>
      <td className="px-16 py-2">
        <span>{facility && facility.name}</span>
      </td>
      <td className="px-16 py-2">
        {shifts.map((shift: IShift) => {
          return (
            <span>{`${shift.name}: ${shift.from} - ${shift.to} / Q-${shift.quarter}`}</span>
          );
        })}
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
export default Table;
