import { useDispatch, useSelector } from "react-redux";

import { BiCalendarEdit } from "react-icons/bi";
import IProps from "@/interfaces/IPorps";
import { MdDeleteForever } from "react-icons/md";
import React from "react";
import { deleteShift, getShifts } from "@/lib/helper";
import { rChangeEmpID, rToggleChangeAction } from "@/redux/Agents/agentSlice";
import { useMutation, useQuery, useQueryClient } from "react-query";
import IShift from "@/interfaces/IShift";

const Shift: React.FC<IProps> = () => {
  const { isLoading, isError, data, error } = useQuery("shifts", getShifts);

  if (isLoading) return <>Loading ...</>;
  if (isError) return <> Error is ${error} ..</>;
  return (
    <table className="min-w-full table-auto ">
      <thead>
        <tr className="bg-gray-900 text-white">
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>

          <th className="px-16 py-2">
            <span className="text-gray-200">From</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">To</span>
          </th>

          <th className="px-16 py-2">
            <span className="text-gray-200">Quarter</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200"></span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data?.map((shift: IShift, index) => {
          return <Tr key={index} {...shift}></Tr>;
        })}
      </tbody>
    </table>
  );
};

const Tr = ({ _id, name, from, to, quarter }: IShift) => {
  const visible = useSelector((state: any) => state.shifts.client.toggleForm);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const openToggleHandler = (e: any) => {
    if (!visible) {
      dispatch(rToggleChangeAction(_id));
    }
    dispatch(rChangeEmpID(_id));
  };

  const deleteMutation = useMutation(() => deleteShift(_id), {
    onSuccess: async (data) => {
      queryClient.prefetchQuery("shifts", getShifts);
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
      <td className="px-16 py-2">{from}</td>
      <td className="px-16 py-2">{to}</td>
      <td className="px-16 py-2">{quarter}</td>

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
export default Shift;
