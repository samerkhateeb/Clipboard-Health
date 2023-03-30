import {
  MutationObserverErrorResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import React, { useReducer } from "react";
import { addAgent, getAgents } from "@/lib/helper";

import { BiPlus } from "react-icons/bi";
import IProps from "@/interfaces/IPorps";
import Message from "./_child/Message";

// const formReducer = (state: any, event: any) => {
//   return {
//     ...state,
//     [event.target.name]: event.target.value,
//   };
// };

const Form_New: React.FC<IProps> = ({ formData, setFormData }) => {
  // const [formData, setFormData] = useReducer(formReducer, {});

  const queryClient = useQueryClient();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0) return console.log("No form Data");

    let { firstname, lastname, email, salary, date, status, facility, shift } =
      formData;

    const _data = {
      name: `${firstname} ${lastname}`,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 10
      )}.jpg`,
      email,
      salary,
      date,
      status: status ?? "Active",
      facility: facility,
      shifts: shift,
    };

    console.log(_data);
    addMutation.mutate(_data);
  };

  const addMutation: any = useMutation((_data) => addAgent(_data), {
    onSuccess: () => {
      queryClient.prefetchQuery("agent", getAgents);
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
            name="firstname"
            onChange={setFormData}
            placeholder="First Name"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="lastname"
            onChange={setFormData}
            placeholder="Last Name"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="email"
            onChange={setFormData}
            placeholder="Email"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="salary"
            onChange={setFormData}
            placeholder="Salary"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>

        <div className="input-type">
          <input
            type="date"
            name="date"
            onChange={setFormData}
            placeholder="Date"
            className="border px-5 py-3 focus:outline-none rounded-md"
          />
        </div>

        <div className="input-type">
          <input
            type="text"
            name="facility"
            onChange={setFormData}
            placeholder="Facility"
            className="border px-5 py-3 focus:outline-none rounded-md"
          />
        </div>

        <div className="input-type">
          <input
            type="text"
            name="shift"
            onChange={setFormData}
            placeholder="Shift"
            className="border px-5 py-3 focus:outline-none rounded-md"
          />
        </div>

        <div className="flex gap-10 items-center">
          <div className="form-check">
            <input
              type="radio"
              name="status"
              value="Active"
              onChange={setFormData}
              id="radioActive"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-contain float-left mr-2 cursor-pointer"
            />
            <label htmlFor="radioActive" className="inline-block text-gray-900">
              Active
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="status"
              value="Inactive"
              onChange={setFormData}
              id="radioInactive"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-contain float-left mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioInactive"
              className="inline-block text-gray-900"
            >
              Inactive
            </label>
          </div>
        </div>

        <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500 ">
          Add{" "}
          <span className="px-1">
            <BiPlus size={24}></BiPlus>
          </span>
        </button>
      </form>
    </>
  );
};
export default Form_New;
