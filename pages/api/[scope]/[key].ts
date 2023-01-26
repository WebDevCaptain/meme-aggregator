import { NextApiRequest, NextApiResponse } from "next";
import { getObjectByKey, IGetObjectByKeyResponse } from "@/utility/s3-client";

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function getFile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const { key, scope } = query;

  const finalKey = `${scope}/${key}` as string;

  try {
    const resp: IGetObjectByKeyResponse = await getObjectByKey(
      finalKey as string
    );
    return res
      .setHeader("Content-Type", resp.contentType as string)
      .send(resp.file);
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      error: "Not found",
    });
  }
}
