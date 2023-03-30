import { Schema, model, models } from "mongoose";
import Facilities from "./facilities";
import Shifts from "./shifts";

const agentSchema = new Schema({
  name: String,
  avatar: String,
  email: String,
  salary: String,
  date: String,
  status: String,
  facility: Facilities.schema,
  shifts: [Shifts.schema],
});

const Agents = models.agent || model("agent", agentSchema);

export default Agents;
