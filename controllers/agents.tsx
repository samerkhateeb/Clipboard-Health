import { NextApiRequest, NextApiResponse } from "next";

import Agents from "@/model/agents";
import IAgent from "@/interfaces/IAgent";
import { IResponse } from "@/interfaces/IResponse";
import Facilities from "@/model/facilities";
import Shifts from "@/model/shifts";

export const getAgents = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const { agentId } = req.query;

    let agents: any = {};

    if (agentId) agents = await Agents.findById(agentId);
    else agents = await Agents.find({});

    if (Object.keys(agents).length == 0) {
      return res.status(404).json({ error: "No Agent Available" });
    }
    return res.status(200).json({ response: agents });
  } catch (error) {
    res.status(405).json({ error: "Error While Fetching Data" });
  }
};

export const postAgents = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const newAgent = req.body;
    if (Object.keys(newAgent).length == 0)
      return res.status(404).json({ error: "Form Data Provided .." });

    const facility = await Facilities.findById({ _id: newAgent.facility });
    const shifts = await Shifts.findById({ _id: newAgent.shifts });
    // const shifts = await Shifts.find({}).populate({
    //   path: "facility",
    //   match: { id: facility._id },
    // });

    const _new = new Agents({
      name: newAgent.name,
      avatar: newAgent.avatar,
      email: newAgent.email,
      salary: newAgent.salary,
      date: newAgent.date,
      status: newAgent.status,
      facility: facility,
      shifts: shifts,
    });

    await _new.save();

    // await Agents.create(newAgent);
    return res.status(200).json(newAgent);
  } catch (error) {
    return res.status(404).json({ error: "Error while inserting the data" });
  }
};

export const putAgents = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const { agentId } = req.query;

    const _data = req.body;

    if (agentId && Object.keys(_data).length != 0) {
      const agent = await Agents.findByIdAndUpdate(agentId, _data);
      return res.status(200).json({ response: agent });
    }

    return res.status(404).json({ error: "Form Data Not Provided .." });
  } catch (error) {
    return res.status(404).json({ error: "Error while Updating the data" });
  }
};

export const deleteAgents = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const { agentId } = req.query;

    if (agentId) {
      const agent = await Agents.findByIdAndDelete(agentId);
      return res
        .status(200)
        .json({ response: `Deleted Successfully ${agentId}` });
    }

    return res.status(404).json({ error: "Query Is Not Provided .." });
  } catch (error) {
    return res.status(404).json({ error: "Error while Deleting the data" });
  }
};

export const getShiftsByFacility = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const { Id } = req.query;

    let agents: any = {};

    if (Id) {
      agents = await Agents.find({}).populate({
        path: "facility",
        match: { id: Id },
      });
    }
    if (Object.keys(agents).length == 0) {
      return res
        .status(404)
        .json({ error: "No agents is Available for this facility" });
    }
    return res.status(200).json({ response: agents });
  } catch (error) {
    res.status(405).json({ error: "Error While Fetching Data" });
  }
};
