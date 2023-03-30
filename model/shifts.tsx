import mongoose, { Schema, model, models } from "mongoose";
import Facilities from "./facilities";

const shiftSchema = new Schema({
  name: String,
  from: String,
  to: String,
  quarter: String,
  facility: Facilities.schema,
});

const Shifts = models.shift || model("shift", shiftSchema);

export default Shifts;
