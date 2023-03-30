import React, { useReducer } from "react";

import { BiBrush } from "react-icons/bi";
import IProps from "@/interfaces/IPorps";
import Message from "./_child/Message";
import { useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAgent, getAgents, updateAgent } from "@/lib/helper";
import IAgent from "@/interfaces/IAgent";
import { rToggleChangeAction } from "@/redux/Agents/agentSlice";

const Form_Update: React.FC<IProps> = ({ _id, formData, setFormData }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { isLoading, isError, data, error } = useQuery(["agents", _id], () =>
    getAgent(_id)
  );

  const UpdateMutation = useMutation(
    (newFormData) => updateAgent(_id!, newFormData),
    {
      onSuccess: async (data) => {
        console.log("data updated");
        queryClient.prefetchQuery("agents", getAgents);
        dispatch(rToggleChangeAction(_id));
      },
    }
  );

  const updateHandler = async (e: any) => {
    e.preventDefault();

    let empName = `${formData.firstname ?? firstname} ${
      formData.lastname ?? lastname
    }`;

    // combine all objects toghether
    // assign the values all together
    // data.name => formData.name
    let newFormData = Object.assign({}, data, formData, { name: empName });

    console.log(newFormData);

    await UpdateMutation.mutate(newFormData);
  };

  if (isLoading) return <div>Loading ....</div>;
  if (isError) return <>Error occured {error} ....</>;

  const { name, avatar, email, salary, date, status }: IAgent = data!;
  const [firstname, lastname] = name ? name.split(" ") : formData;

  return (
    <>
      {/* {console.log("Object.keys(formData).length", Object.keys(formData))} */}
      {Object.keys(formData).length != 0 && (
        <Message type="success">Successfully Added!!</Message>
      )}
      <form
        className="grid lg:grid-cols-2 w-4/6 gap-4"
        onSubmit={updateHandler}
      >
        <div className="input-type">
          <input
            type="text"
            defaultValue={firstname}
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
            defaultValue={lastname}
            onChange={setFormData}
            placeholder="Last Name"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="email"
            defaultValue={email}
            onChange={setFormData}
            placeholder="Email"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="salary"
            defaultValue={salary}
            onChange={setFormData}
            placeholder="Salary"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="input-type">
          <input
            type="date"
            name="date"
            defaultValue={date}
            onChange={setFormData}
            placeholder="Date"
            className="border px-5 py-3 focus:outline-none rounded-md"
          />
        </div>

        <div className="flex gap-10 items-center">
          <div className="form-check">
            <input
              type="radio"
              name="status"
              value="Active"
              defaultChecked={status.toLowerCase() == "active"}
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
              defaultChecked={status.toLowerCase() !== "active"}
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
        <button className="flex justify-center text-md w-2/6 bg-yellow-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500 ">
          Update
          <span className="px-1">
            <BiBrush size={24}></BiBrush>
          </span>
        </button>
      </form>
    </>
  );
};
export default Form_Update;
