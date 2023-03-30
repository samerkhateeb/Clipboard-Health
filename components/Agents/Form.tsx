import Form_New from "./Form_New";
import Form_Update from "./Form_Update";
import IProps from "@/interfaces/IPorps";
import { useReducer } from "react";
import { useSelector } from "react-redux";

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const Form: React.FC<IProps> = () => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const _id = useSelector((state: any) => state.agents.client.id);

  return (
    <>
      {_id
        ? Form_Update({ _id, formData, setFormData })
        : Form_New({ formData, setFormData })}
    </>
  );
};
export default Form;
