import { IResponse } from "@/interfaces/IResponse";
import Shifts from "@/model/shifts";
import Facilities from "@/model/facilities";
import mongoose, { ObjectId } from "mongoose";
// const ObjectId = require("mongodb").ObjectID;

import { NextApiRequest, NextApiResponse } from "next";

export const getShifts = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const { Id } = req.query;

    let shifts: any = {};

    if (Id) shifts = await Shifts.findById(Id);
    else shifts = await Shifts.find({});

    if (Object.keys(shifts).length == 0) {
      return res.status(404).json({ error: "No Shift Available" });
    }
    return res.status(200).json({ response: shifts });
  } catch (error) {
    res.status(405).json({ error: "Error While Fetching Data" });
  }
};

export const postShift = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const newShift = req.body;

    if (Object.keys(newShift).length == 0)
      return res.status(404).json({ error: "Form Data Provided .." });
    // const facility = await Facilities.findById({ _id: newShift.facility });

    const _new = new Shifts({
      name: newShift.name,
      from: newShift.from,
      to: newShift.to,
      quarter: newShift.quarter,
      // facility: facility,
    });

    await _new.save();

    return res.status(200).json(_new);
  } catch (error) {
    return res.status(404).json({ error: "Error while inserting the data" });
  }
};

export const putShift = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const { Id } = req.query;

    const _data = req.body;

    if (Id && Object.keys(_data).length != 0) {
      const shift = await Shifts.findByIdAndUpdate(Id, _data);
      return res.status(200).json({ response: shift });
    }

    return res.status(404).json({ error: "Form Data Not Provided .." });
  } catch (error) {
    return res.status(404).json({ error: "Error while Updating the data" });
  }
};

export const deleteShift = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const { shiftId: Id } = req.query;

    if (Id) {
      await Shifts.findByIdAndDelete(Id);
      return res.status(200).json({ response: `Deleted Successfully ${Id}` });
    }

    return res.status(404).json({ error: "Query Is Not Provided .." });
  } catch (error) {
    return res.status(404).json({ error: "Error while Deleting the data" });
  }
};
