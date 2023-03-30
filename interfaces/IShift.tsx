import IFacility from "./IFacility";

export default interface IShift {
  _id: string;
  name: String;
  from: String;
  to: String;
  quarter: string;
}
