// import { uploadFileUrl } from "@/utility/s3-client";
import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";

export const config = {
  api: {
    bodyParser: false,
  },
};

const types = ["VIDEO", "IMAGE", "AUDIO"];

export default async function uploadFile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({
      message: "Method not allowed!",
    });

  const form = new multiparty.Form();
  const data = await new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) reject({ err });
      resolve({ fields, files });
    });
  });
  console.log(`data: `, JSON.stringify(data));

  // const { name, type } = req.body;

  // if (!types.includes(type)) {
  //   return res.status(400).json({
  //     message: "Invalid type!",
  //   });
  // }

  // console.log({ name, type });

  res.send("ok");

  // const key = `${type}/${name}`;

  // const url = await uploadFileUrl(key, contentType);

  // res.status(200).json({ url });
}
