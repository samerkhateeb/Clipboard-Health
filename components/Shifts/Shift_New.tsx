import { useMutation, useQuery, useQueryClient } from "react-query";
import React, { useReducer } from "react";
import { addShift, getFacilities, getFacility, getShifts } from "@/lib/helper";

import { BiPlus } from "react-icons/bi";
import IProps from "@/interfaces/IPorps";
import Message from "../Agents/_child/Message";

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const Shift_New: React.FC<IProps> = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useReducer(formReducer, {});

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0) return console.log("No form Data");
    console.log(formData);
    let { name, from, to, quarter, facility } = formData;

    // const {
    //   isLoading,
    //   isError,
    //   data: facilities_data,
    //   error,
    // } = useQuery(["facilities", facility], () => {
    //   getFacility(facility);
    // });

    // if (!isLoading) {
    // console.log("facilities_data =>", facilities_data);
    const _data = {
      name,
      from,
      to,
      quarter,
      facility,
    };
    // call method Mutate
    addMutation.mutate(_data);
    // }
  };

  const addMutation: any = useMutation((_data) => addShift(_data), {
    onSuccess: () => {
      queryClient.prefetchQuery("facilities", getShifts);
    },
  });

  return (
    <>
      {addMutation.isSuccess && (
        <Message type="success">Successfully Added!!</Message>
      )}

      {addMutation.isLoading && <div>loading ....</div>}
      {addMutation.isError && (
        <Message type="error">
          {addMutation.error instanceof Error ?? addMutation.error.message} ...
          Error Occured ..
        </Message>
      )}
      <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
        <div className="input-type">
          <input
            type="text"
            name="name"
            onChange={setFormData}
            placeholder="Name"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="quarter"
            onChange={setFormData}
            placeholder="Quarter"
            className="border px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="from"
            onChange={setFormData}
            placeholder="From"
            className="border px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="to"
            onChange={setFormData}
            placeholder="To"
            className="border px-5 py-3 focus:outline-none rounded-md"
          />
        </div>

        <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500 ">
          Add
          <span className="px-1">
            <BiPlus size={24}></BiPlus>
          </span>
        </button>
      </form>
    </>
  );
};
export default Shift_New;
