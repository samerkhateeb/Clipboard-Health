// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { IResponse } from "@/interfaces/IResponse";
import connectMongo from "@/database/connectMongo";

import { deleteShift, getShifts, putShift } from "@/controllers/shifts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "failed to load data" })
  );

  const { method } = req;

  if (method == "GET") getShifts(req, res);
  else if (method == "PUT") putShift(req, res);
  else if (method == "DELETE") deleteShift(req, res);
  else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
