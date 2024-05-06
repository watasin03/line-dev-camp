import type { NextApiRequest, NextApiResponse } from "next";
import line from "../../util/line.util";

type ResponseData = {
  message: string;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  const object = request?.body;
  const replyToken =
    object?.originalDetectIntentRequest?.payload?.data?.replyToken;
  await line?.replyWithLongLived(replyToken, [
    {
      type: "text",
      text: object?.queryResult?.fulfillmentText,
    },
  ]);
  return response.end();
}
