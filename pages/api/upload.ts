import { NextApiRequest, NextApiResponse } from "next";

export default async function uploadFile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const { key, scope } = query;

  res.send("Hello World");
}
