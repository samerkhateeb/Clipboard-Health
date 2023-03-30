import { Schema, model, models } from "mongoose";
import Shifts from "./shifts";

const facilitySchema = new Schema({
  name: String,
  date: String,
  status: String,
});

const Facilities = models.facility || model("facility", facilitySchema);

export default Facilities;
