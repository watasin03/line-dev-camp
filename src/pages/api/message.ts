import type { NextApiRequest, NextApiResponse } from "next";
import line from "../../util/line.util";
import dialogflow from "../../util/dialogflow.util";

type ResponseData = {
  message: any;
};

const validateWebhook = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) => {
  if (request.method !== "POST") {
    return response.status(200).send({ message: "Method Not Allowed" });
  }
  if (
    !line.verifySignature(request.headers["x-line-signature"], request.body)
  ) {
    return response.status(401).send({ message: "Unauthorized" });
  }
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  await validateWebhook(request, response);

  console.log(request?.body);

  const events = request?.body?.events;
  for (const event of events) {
    let profile: {
      displayName: string;
      pictureUrl?: string;
      userId: string;
      statusMessage?: string;
    };

    switch (event?.type) {
      case "follow":
        /*
                    Greeting Message for new friend
                */
        profile = await line.getProfile(event?.source?.userId);
        let text = `ยินดีต้อนรับคุณ ${profile?.displayName} คุณสามารถพูดคุย สนทนากับ admin ได้เลย`;
        if (event.follow.isUnblocked) {
          /*
                        Greeting Message for Old Friend
                        https://developers.line.biz/en/reference/messaging-api/#follow-event
                        https://linedevth.line.me/th/knowledge-api/follow-event
                    */
          text = `ยินดีต้อนการกลับมา ${profile?.displayName} คุณสบายดีไหม`;
        }
        await line.replyWithLongLived(event?.replyToken, [
          {
            type: "text",
            text: text,
          },
        ]);
        break;
      case "unfollow":
        /*
                    Unsend event
                    https://developers.line.biz/en/reference/messaging-api/#unsend-event
                */
        console.log(JSON.stringify(event));
        break;

      case "message":
        /*
                    Message
                    https://developers.line.biz/en/reference/messaging-api/#message-event
                */
        let textMessage = event?.message?.text?.toLowerCase();
        if (event?.message?.type === "text") {
          if (
            event?.source?.type !== "group" ||
            textMessage === "my freelance jobs!" ||
            textMessage === "your receipt. thank you"
          ) {
            // Display a loading animation in one-on-one chats between users and LINE Official Accounts.
            await line?.isAnimationLoading(event?.source?.userId);
          }

          if (textMessage?.includes("line dev camp")) {
            await line?.replyWithStateless(event?.replyToken, [
              {
                type: "text",
                text: `I am a LINE developer.`,
              },
              {
                type: "imagemap",
                baseUrl:
                  "https://ex10.tech/store/v1/public/content/upload/imagemap/7104ed5f-78b1-4d1b-ab64-63c9adb8dc50",
                altText: "Imagemap generator By EX10",
                baseSize: {
                  width: 1040,
                  height: "869",
                },
                actions: [
                  {
                    type: "uri",
                    area: {
                      x: 123,
                      y: 163,
                      width: 813,
                      height: 589,
                    },
                    linkUri: "https://store.line.me/th?ref=Desktop",
                  },
                ],
              },
            ]);
          } else if (
            textMessage === "my freelance jobs!" ||
            textMessage === "your receipt. thank you"
          ) {
            continue;
          } else {
            /* Foward to Dialogflow */
            await dialogflow?.forwardDialodflow(request);
          }
        } else {
          /*
                    # Handle Other Message Type
                    - Image : https://developers.line.biz/en/reference/messaging-api/#image-message
                    - Video : https://developers.line.biz/en/reference/messaging-api/#video-message
                    - Audio : https://developers.line.biz/en/reference/messaging-api/#audio-message
                    - Location : https://developers.line.biz/en/reference/messaging-api/#location-message
                    - Sticker : https://developers.line.biz/en/reference/messaging-api/#sticker-message
                    */

          /*
                        https://medium.com/linedevth/111ea6c17ada
                    */
          let msg = JSON?.stringify(event);

          // const validateEventType = ['image', 'audio', 'video', 'file']
          // if (validateEventType.includes(event.message.type)) {
          //     const binary = await line.getContent(event.message,event.message.id)
          //     console.log("binary ", binary.fileName);
          //     msg = binary.fileName
          // }

          await line?.replyWithLongLived(event?.replyToken, [
            {
              type: "text",
              text: msg,
            },
          ]);
        }
        break;
      case "unsend":
        /*
                    unsend
                    https://developers.line.biz/en/reference/messaging-api/#unsend-event
                */
        profile = await line?.getProfile(event?.source?.userId);
        console.log(`พบ ${profile?.displayName} unsend`);
        break;
      case "join":
        /*
                    join
                    https://developers.line.biz/en/reference/messaging-api/#join-event
                */

        await line.replyWithLongLived(event?.replyToken, [
          {
            type: "text",
            text: `ยินดีที่ได้รู้จัก`,
            quickReply: {
              items: [
                {
                  type: "action",
                  imageUrl:
                    "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                  action: {
                    type: "message",
                    label: "สวัสดี",
                    text: "สวัสดี",
                  },
                },
                {
                  type: "action",
                  imageUrl:
                    "https://bucket.ex10.tech/images/06960db7-fd91-11ee-808f-0242ac12000b/originalContentUrl.png",
                  action: {
                    type: "clipboard",
                    label: "คัดลองคำ",
                    clipboardText: "สวัสดี",
                  },
                },
              ],
            },
          },
        ]);
        break;
      case "leave":
        /*
                    leave
                    https://developers.line.biz/en/reference/messaging-api/#leave-event
                */
        console.log(JSON?.stringify(event));
        break;
      case "memberJoined":
        /*
                    memberJoined
                    https://developers.line.biz/en/reference/messaging-api/#member-joined-event
                */
        console.log(JSON?.stringify(event));
        for (let member of event?.joined?.members) {
          if (member.type === "user") {
            console.log(JSON?.stringify(event));
            await line?.replyWithLongLived(event?.replyToken, [
              {
                type: "text",
                text: JSON.stringify(event),
                quickReply: {
                  items: [
                    {
                      type: "action",
                      imageUrl:
                        "https://bucket.ex10.tech/images/9f2a63dc-d84e-11ee-97d4-0242ac12000b/originalContentUrl.png",
                      action: {
                        type: "message",
                        label: "สวัสดี",
                        text: "สวัสดี",
                      },
                    },
                  ],
                },
              },
            ]);
          }
        }
        break;
      case "memberLeft":
        /*
                    memberLeft
                    https://developers.line.biz/en/reference/messaging-api/#member-left-event
                */
        console.log(JSON.stringify(event));
        break;
      case "postback":
        /*
                    postback
                    https://developers.line.biz/en/reference/messaging-api/#postback-event
                */
        console.log(JSON.parse(event?.postback?.data));
        await line?.replyWithLongLived(event?.replyToken, [
          {
            type: "text",
            text: JSON.stringify(event?.postback?.data),
          },
        ]);
        break;

      default:
        console.log(event);
        return response?.end();
    }
  }

  return response?.end();
}
