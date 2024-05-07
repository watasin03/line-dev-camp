"use client";

import liff from "@line/liff";
import { NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Profile {
  displayName: string;
  pictureUrl?: string;
  userId: string;
  statusMessage?: string;
}

const Page: NextPage = () => {
  const [profile, setProfile] = useState<Profile>();
  const [isClient, setClient] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const liffId = String(process?.env?.NEXT_PUBLIC_LIFF_ID);

  const initLiff = async () => {
    await liff.init({ liffId });

    await liff?.ready?.then((e) => {
      console.log("liff is already");
    });

    if (!liff?.isLoggedIn()) {
      console.log("liff not login");
      await authLine();
    } else {
      console.log("liff is login");
      await getProileDetail();
    }
  };

  const getProileDetail = async () => {
    await liff
      ?.getProfile()
      .then((profile) => {
        setProfile(profile);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const logoutLine = async () => {
    if (
      liff?.isLoggedIn() &&
      liff?.getContext()?.type !== "none" &&
      liff?.getContext()?.type !== "external"
    ) {
      await liff?.logout();
      await liff.closeWindow();
    }
  };

  const authLine = async () => {
    await liff?.login({
      redirectUri: process?.env?.NEXT_PUBLIC_LIFF_REDIRECT_URI,
    });
  };

  const sendMessage = async () => {
    if (
      liff?.getContext()?.type !== "none" &&
      liff?.getContext()?.type !== "external"
    ) {
      await liff.sendMessages([
        {
          type: "text",
          text: "My Freelance Jobs!",
        },
        {
          type: "flex",
          altText: "Flex Message",
          contents: {
            type: "carousel",
            contents: [
              {
                type: "bubble",
                hero: {
                  type: "image",
                  size: "full",
                  aspectRatio: "20:13",
                  aspectMode: "cover",
                  url: "https://storage.googleapis.com/fastwork-static/0455769b-0bb9-4d02-b97d-b847d74feb81.jpg",
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "Line Official Account, Chatbot, Line My Shop, Richmenu, Flex Message, Card Message",
                      weight: "bold",
                      size: "sm",
                    },
                  ],
                },
                footer: {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "button",
                      style: "secondary",
                      height: "sm",
                      action: {
                        type: "uri",
                        label: "คลิก",
                        uri: "https://fastwork.co/user/wuttichais/chatbot-78651407",
                      },
                    },
                    {
                      type: "box",
                      layout: "vertical",
                      contents: [],
                      margin: "sm",
                    },
                  ],
                  flex: 0,
                },
              },
              {
                type: "bubble",
                hero: {
                  type: "image",
                  url: "https://storage.googleapis.com/fastwork-static/c480d19d-8dbe-4aee-8707-b18d9be16299.jpg",
                  size: "full",
                  aspectRatio: "20:13",
                  aspectMode: "cover",
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "รับออกแบบและพัฒนาเว็บไซต์",
                      weight: "bold",
                      size: "sm",
                    },
                  ],
                },
                footer: {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "button",
                      style: "secondary",
                      height: "sm",
                      action: {
                        type: "uri",
                        label: "คลิก",
                        uri: "https://fastwork.co/user/wuttichais/web-development-29237832",
                      },
                    },
                    {
                      type: "box",
                      layout: "vertical",
                      contents: [],
                      margin: "sm",
                    },
                  ],
                  flex: 0,
                },
              },
            ],
          },
        },
      ]);
      liff.closeWindow();
    }
  };

  const shareMessage = async () => {
    if (liff?.isInClient()) {
      await liff?.shareTargetPicker([
        {
          type: "text",
          text: "My Freelance Jobs!",
        },
        {
          type: "flex",
          altText: "Flex Message",
          contents: {
            type: "carousel",
            contents: [
              {
                type: "bubble",
                hero: {
                  type: "image",
                  size: "full",
                  aspectRatio: "20:13",
                  aspectMode: "cover",
                  url: "https://storage.googleapis.com/fastwork-static/0455769b-0bb9-4d02-b97d-b847d74feb81.jpg",
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "Line Official Account, Chatbot, Line My Shop, Richmenu, Flex Message, Card Message",
                      weight: "bold",
                      size: "sm",
                    },
                  ],
                },
                footer: {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "button",
                      style: "secondary",
                      height: "sm",
                      action: {
                        type: "uri",
                        label: "คลิก",
                        uri: "https://fastwork.co/user/wuttichais/chatbot-78651407",
                      },
                    },
                    {
                      type: "box",
                      layout: "vertical",
                      contents: [],
                      margin: "sm",
                    },
                  ],
                  flex: 0,
                },
              },
              {
                type: "bubble",
                hero: {
                  type: "image",
                  url: "https://storage.googleapis.com/fastwork-static/c480d19d-8dbe-4aee-8707-b18d9be16299.jpg",
                  size: "full",
                  aspectRatio: "20:13",
                  aspectMode: "cover",
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "รับออกแบบและพัฒนาเว็บไซต์",
                      weight: "bold",
                      size: "sm",
                    },
                  ],
                },
                footer: {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "button",
                      style: "secondary",
                      height: "sm",
                      action: {
                        type: "uri",
                        label: "คลิก",
                        uri: "https://fastwork.co/user/wuttichais/web-development-29237832",
                      },
                    },
                    {
                      type: "box",
                      layout: "vertical",
                      contents: [],
                      margin: "sm",
                    },
                  ],
                  flex: 0,
                },
              },
            ],
          },
        },
      ]);
    }
  };

  useEffect(() => {
    if (isClient) {
      typeof window !== "undefined" ? initLiff() : "";
    }
  }, [isClient]);

  useEffect(() => {
    setLoading(true);
    setClient(true);
  }, []);
  return (
    isClient && (
      <div className='w-full flex h-screen flex-col gap-4 justify-start p-4 items-center bg-gradient-to-br from-blue-600 via-pink-500 to-orange-500'>
        {isLoading ? (
          <div className='flex flex-col justify-center items-center'>
            <div className='gap-8 flex justify-center items-center relative mb-14'>
              <div className='relative'>
                <div
                  className='w-12 h-12 rounded-full animate-spin absolute transition duration-1000
                            border-8 border-dashed border-blue-500 border-t-transparent'
                ></div>
              </div>
              <div className='relative'>
                <div
                  className='w-12 h-12 rounded-full animate-spin absolute transition duration-0
                            border-8 border-dashed border-violet-500 border-t-transparent'
                ></div>
              </div>
              <div className='relative'>
                <div
                  className='w-12 h-12 rounded-full animate-spin absolute transition duration-500
                            border-8 border-dashed border-pink-500 border-t-transparent'
                ></div>
              </div>
              <div className='relative'>
                <div
                  className='w-12 h-12 rounded-full animate-spin absolute transition duration-1000
                            border-8 border-dashed border-orange-500 border-t-transparent'
                ></div>
              </div>
              <div className='relative'>
                <div
                  className='w-12 h-12 rounded-full animate-spin absolute transition duration-0
                            border-8 border-dashed border-red-500 border-t-transparent'
                ></div>
              </div>
              <div className='relative'>
                <div
                  className='w-12 h-12 rounded-full animate-spin absolute transition duration-500
                            border-8 border-dashed border-violet-500 border-t-transparent'
                ></div>
              </div>
              <div className='relative'>
                <div
                  className='w-12 h-12 rounded-full animate-spin absolute transition duration-1000
                            border-8 border-dashed border-blue-500 border-t-transparent'
                ></div>
              </div>
              <div className='relative'>
                <div
                  className='w-12 h-12 rounded-full animate-spin absolute transition duration-0
                            border-8 border-dashed border-green-500 border-t-transparent'
                ></div>
              </div>
              <div className='relative'>
                <div
                  className='w-12 h-12 rounded-full animate-spin absolute transition duration-500
                            border-8 border-dashed border-yellow-500 border-t-transparent'
                ></div>
              </div>
            </div>
            <div className='text-2xl font-black text-white animate-pulse duration-150'>
              Loading...
            </div>
          </div>
        ) : (
          <>
            <div className='relative pt-20 px-10 pb-4 flex flex-col justify-start items-center'>
              {liff?.getOS() === "web" && (
                <button
                  onClick={logoutLine}
                  className='absolute z-10 top-2 right-2 inline-flex gap-1 justify-center items-center cursor-pointer rounded-md border px-2 py-1 bg-gradient-to-bl from-orange-500 via-pink-500 to-violet-500 hover:bg-gradient-to-tr text-sm font-thin hover:from-pink-500 hover:via-pink-500 hover:to-violet-500 transition-all ease-in-out'
                >
                  <p>Logout</p>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8'
                      stroke='#FFFFFF'
                      stroke-width='1'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </button>
              )}
              <div className='w-[300px] h-[300px] relative -z-0'>
                {profile?.pictureUrl ? (
                  <Image
                    alt=''
                    src={profile?.pictureUrl}
                    fill
                    className='object-cover aspect-square rounded-lg'
                  />
                ) : (
                  <Image
                    alt=''
                    src={
                      "data:image/png;base64,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"
                    }
                    fill
                    className='object-cover aspect-square rounded-lg'
                  />
                )}
              </div>
            </div>
            <div className='flex flex-col max-w-1/2 justify-start items-start gap-6'>
              {profile?.displayName && (
                <p className='text-2xl font-black text-white'>
                  Name: <span>{profile?.displayName}</span>
                </p>
              )}
              {profile?.displayName && (
                <div className='flex justify-center w-full items-center gap-2'>
                  <button
                    onClick={sendMessage}
                    className='cursor-pointer flex justify-center items-center gap-1 px-2 py-1 bg-white text-lg text-slate-600 rounded-md'
                  >
                    <p>Send Message</p>
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g clip-path='url(#clip0_16_20119)'>
                        <path
                          d='M17 4H21V8'
                          stroke='#0F172A'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M20 11V14C20 14.7956 19.6839 15.5587 19.1213 16.1213C18.5587 16.6839 17.7956 17 17 17H15L12 20L9 17H7C6.20435 17 5.44129 16.6839 4.87868 16.1213C4.31607 15.5587 4 14.7956 4 14V8C4 7.20435 4.31607 6.44129 4.87868 5.87868C5.44129 5.31607 6.20435 5 7 5H14'
                          stroke='#0F172A'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M16 9L21 4'
                          stroke='#0F172A'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_16_20119'>
                          <rect width='24' height='24' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <button
                    onClick={shareMessage}
                    className='cursor-pointer flex justify-center items-center px-2 gap-1 py-1 bg-white text-lg text-slate-600 rounded-md'
                  >
                    <p>Share</p>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g clip-path='url(#clip0_1016_24573)'>
                        <path
                          d='M23.9463 1.02908C24.0008 0.892779 24.0142 0.743469 23.9847 0.599655C23.9552 0.45584 23.8841 0.323846 23.7803 0.220036C23.6765 0.116227 23.5445 0.0451664 23.4007 0.0156652C23.2569 -0.0138359 23.1076 -0.00048068 22.9713 0.0540753L1.15078 8.78258C0.958614 8.8595 0.791395 8.98794 0.667526 9.15378C0.543658 9.31961 0.467942 9.5164 0.448713 9.7225C0.429484 9.92859 0.467487 10.136 0.558538 10.3219C0.64959 10.5078 0.79016 10.6649 0.964779 10.7761L8.45728 15.5431L10.7538 19.1521C10.8622 19.3158 11.0306 19.4305 11.2227 19.4715C11.4148 19.5124 11.6153 19.4763 11.7811 19.371C11.9469 19.2657 12.0648 19.0996 12.1095 18.9083C12.1541 18.717 12.1219 18.5159 12.0198 18.3481L9.95578 15.1051L21.1968 3.86408L18.3543 10.9711C18.3152 11.0629 18.2949 11.1616 18.2945 11.2614C18.2941 11.3612 18.3136 11.4601 18.3519 11.5523C18.3902 11.6445 18.4465 11.7281 18.5175 11.7982C18.5885 11.8683 18.6728 11.9236 18.7654 11.9607C18.8581 11.9978 18.9572 12.0161 19.057 12.0144C19.1568 12.0128 19.2552 11.9912 19.3466 11.951C19.4379 11.9108 19.5203 11.8528 19.589 11.7803C19.6576 11.7079 19.7111 11.6225 19.7463 11.5291L23.9463 1.02908ZM20.1363 2.80358L8.89528 14.0446L2.38678 9.90308L20.1363 2.80358Z'
                          fill='#0F172A'
                        />
                        <path
                          d='M24 18.75C24 20.1424 23.4469 21.4777 22.4623 22.4623C21.4777 23.4469 20.1424 24 18.75 24C17.3576 24 16.0223 23.4469 15.0377 22.4623C14.0531 21.4777 13.5 20.1424 13.5 18.75C13.5 17.3576 14.0531 16.0223 15.0377 15.0377C16.0223 14.0531 17.3576 13.5 18.75 13.5C20.1424 13.5 21.4777 14.0531 22.4623 15.0377C23.4469 16.0223 24 17.3576 24 18.75ZM18.75 15.75C18.5511 15.75 18.3603 15.829 18.2197 15.9697C18.079 16.1103 18 16.3011 18 16.5V18H16.5C16.3011 18 16.1103 18.079 15.9697 18.2197C15.829 18.3603 15.75 18.5511 15.75 18.75C15.75 18.9489 15.829 19.1397 15.9697 19.2803C16.1103 19.421 16.3011 19.5 16.5 19.5H18V21C18 21.1989 18.079 21.3897 18.2197 21.5303C18.3603 21.671 18.5511 21.75 18.75 21.75C18.9489 21.75 19.1397 21.671 19.2803 21.5303C19.421 21.3897 19.5 21.1989 19.5 21V19.5H21C21.1989 19.5 21.3897 19.421 21.5303 19.2803C21.671 19.1397 21.75 18.9489 21.75 18.75C21.75 18.5511 21.671 18.3603 21.5303 18.2197C21.3897 18.079 21.1989 18 21 18H19.5V16.5C19.5 16.3011 19.421 16.1103 19.2803 15.9697C19.1397 15.829 18.9489 15.75 18.75 15.75Z'
                          fill='#0F172A'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_1016_24573'>
                          <rect width='24' height='24' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    )
  );
};

export default Page;
