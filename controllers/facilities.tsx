import { NextApiRequest, NextApiResponse } from "next";

import Facilities from "@/model/facilities";
import { IResponse } from "@/interfaces/IResponse";

export const getFacilities = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const { Id } = req.query;

    let facilities: any = {};

    if (Id) facilities = await Facilities.findById(Id);
    else facilities = await Facilities.find({});

    if (Object.keys(facilities).length == 0) {
      return res.status(404).json({ error: "No facility Available" });
    }
    return res.status(200).json({ response: facilities });
  } catch (error) {
    res.status(405).json({ error: "Error While Fetching Data" });
  }
};

export const postFacilities = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const newFacility = req.body;
    if (Object.keys(newFacility).length == 0)
      return res.status(404).json({ error: "Form Data Provided .." });

    await Facilities.create(newFacility);
    return res.status(200).json(newFacility);
  } catch (error) {
    return res.status(404).json({ error: "Error while inserting the data" });
  }
};

export const putFacility = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const { facilityId } = req.query;

    const _data = req.body;

    if (facilityId && Object.keys(_data).length != 0) {
      const facility = await Facilities.findByIdAndUpdate(facilityId, _data);
      return res.status(200).json({ response: facility });
    }

    return res.status(404).json({ error: "Form Data Not Provided .." });
  } catch (error) {
    return res.status(404).json({ error: "Error while Updating the data" });
  }
};

export const deleteFacility = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const { facilityId } = req.query;

    if (facilityId) {
      const facility = await Facilities.findByIdAndDelete(facilityId);
      return res
        .status(200)
        .json({ response: `Deleted Successfully ${facilityId}` });
    }

    return res.status(404).json({ error: "Query Is Not Provided .." });
  } catch (error) {
    return res.status(404).json({ error: "Error while Deleting the data" });
  }
};
