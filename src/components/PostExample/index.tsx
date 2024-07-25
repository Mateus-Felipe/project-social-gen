import Image from "next/image";

import witcher from "@/images/a-witcher-in-a-river-bg.jpg"
import { useEffect, useLayoutEffect, useState } from "react";

interface postProps {
    profile?: string;
    humor?: string;
    style?: string;
    loading?: boolean;
    profile_url?: string;
    image_url?: string;
    description?: string
}

export default function PostExample({ profile: profileInput, humor, style, loading, profile_url, image_url, description }: postProps) {

    return (
        <div className={` shadow-custom border-[2px] border-gray w-8/12 rounded-xl ${style}`}>
            <div className="flex flex-row items-center p-3 ">
                <div className="w-8 h-8 rounded-full bg-gray-500 animate-pulse " />
                <p className={`ml-3 font-bold ${loading && 'animate-pulse'}`} >{profileInput ? profileInput : '@your_profile'}</p>
            </div>
            <div className="mdlg:border-[1px] mdlg:border-black/30 h-[435px] bg mdlg:mx-2 flex items-center justify-center">
                {
                    loading ?
                        <div
                            className={`bg-gray-400 mdlg:w-full w-11/12 h-full animate-pulse transition-all`}
                        />
                        :
                        <Image
                            src={witcher}
                            alt="A witcher in a river"
                            className="mdlg:border-[1px] mdlg:border-black/30 h-full w-full"
                        />
                }
            </div>
            <div className="my-2 px-2 pb-5 flex items-center justify-center">
                {
                    loading ?
                        <div
                            className={`w-[97%] p-5 animate-pulse bg-gray-400 transition-all`}
                        />
                        :
                        <p className="ml-2"><b>{profileInput ? profileInput : '@your_profile'}</b>
                            {description || `Your description will be there... The AI will create a ${humor || ''} text that will call attemption of your follows. The most context you give, more precise the AI will be! Enjoy.`}
                        </p>
                }
            </div>
        </div>
    );
}