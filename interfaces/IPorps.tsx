import { Dispatch } from "react";

export default interface IProps {
  _id?: string | undefined;
  children?: React.ReactNode;
  formData?: any;
  setFormData?: Dispatch<any>;
}
