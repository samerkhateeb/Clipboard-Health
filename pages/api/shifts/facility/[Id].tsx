// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { IResponse } from "@/interfaces/IResponse";
import connectMongo from "@/database/connectMongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "failed to load data" })
  );

  const { method } = req;

  {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
