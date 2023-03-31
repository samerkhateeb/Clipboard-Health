import mongoose, { Schema, model, models } from "mongoose";

const shiftSchema = new Schema({
  name: String,
  from: String,
  to: String,
  quarter: String,
});

const Shifts = models.shift || model("shift", shiftSchema);

export default Shifts;
