import IShift from "./IShift";
import IFacility from "./IFacility";

export default interface IAgent {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  salary: string;
  date: string;
  status: string;
  facility: IFacility;
  shifts: IShift[];
}
