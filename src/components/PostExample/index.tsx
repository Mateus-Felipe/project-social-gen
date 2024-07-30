import Image from "next/image";

import witcher from "@/images/a-witcher-in-a-river-bg.jpg"
import arrow from "@/images/icons/up-arrow.svg"
import profile from "@/images/icons/user-avatar-profile.svg"
import { useEffect, useLayoutEffect, useState } from "react";

interface postProps {
    profile?: string
    humor?: string
    style?: string
    loading?: boolean
    profile_url?: string
    image_url?: string
    description?: string
    pages?: string[]
    id?: string
}

export default function PostExample({ profile: profileInput, humor, style, loading, profile_url, image_url, description, pages, id }: postProps) {
    const [currentPage, setCurrentPage] = useState(0)
    const changeImage = (direction: 'right' | 'left') => {
        console.log(pages?.length)
        if (pages) {

            if (direction == 'right') {
                if (currentPage == (pages?.length - 1)) {
                    return
                }
                else if (currentPage < pages?.length) {
                    setCurrentPage(currentPage + 1);
                }
            } else if (direction == 'left') {
                if (currentPage == 0) {
                    return
                }
                else if (currentPage > 0) {
                    setCurrentPage(currentPage - 1)
                }
            }
        }
    }

    return (
        <div id={id} className={` shadow-custom border-[2px] border-gray w-8/12 rounded-xl ${style}`}>
            <div className="flex flex-row items-center p-3 ">
                <div className="w-8 h-8 rounded-full bg-gray-500 animate-pulse flex items-center justify-center overflow-hidden">
                    <Image
                        src={profile}
                        alt="user profile photo"
                        className="w-full animate-pulse"
                    />
                </div>
                <p className={`ml-3 font-bold ${loading && 'animate-pulse'}`} >{profileInput ? profileInput : '@your_profile'}</p>
            </div>
            <div className="mdlg:border-[1px] mdlg:border-black/30 h-[435px] bg mdlg:mx-2 flex items-center justify-center">
                {
                    loading ?
                        <div
                            className={`bg-gray-400 mdlg:w-full w-11/12 h-full animate-pulse transition-all`}
                        />
                        :
                        <div className="relative flex items-center justify-between w-full h-full">
                            <Image
                                src={witcher}
                                alt="A witcher in a river"
                                className="mdlg:border-[1px] mdlg:border-black/30 h-full w-full"
                            />
                            {
                                pages && pages.length > 0 &&
                                    pages.length != 1 ?
                                    <div className="flex w-full items-center h-full justify-between px-3 absolute">
                                        <div className="absolute h-full w-full bg-black/60 left-0 top-0" />
                                        <div className={`bg-white rounded-full w-7 h-7 flex items-center justify-center z-20 ${currentPage == 0 ? 'opacity-0 cursor-default' : 'cursor-pointer'}`} onClick={() => changeImage("left")} >
                                            <Image
                                                alt="arrow"
                                                src={arrow}
                                                className="-rotate-90 w-5 bg-white rounded-full"
                                            />
                                        </div>
                                        <p className={`w-10/12 text-white font-bold z-20 ${currentPage == 0 ? 'ml-5' : ''} `}>{pages[currentPage] ? pages[currentPage] : ''}</p>
                                        <div className={`bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer z-20 ${currentPage == (pages.length - 1) ? 'opacity-0 cursor-default' : 'cursor-pointer'} `} onClick={() => changeImage("right")}>
                                            <Image
                                                alt="arrow"
                                                src={arrow}
                                                className="rotate-90 w-5"
                                            />
                                        </div>
                                    </div>
                                    : pages && pages.length == 1 &&
                                    <div className="flex w-full items-center justify-between px-3 absolute h-full">
                                        <div className="absolute h-full w-full bg-black/60 left-0 top-0" />
                                        <p className="w-10/12 text-white font-bold z-20">{pages[currentPage] ? pages[currentPage] : ''}</p>
                                    </div>
                            }
                        </div>
                }
            </div>
            <div className="my-2 px-2 pb-5 flex items-center justify-center">
                {
                    loading ?
                        <div
                            className={`w-[97%] p-5 animate-pulse bg-gray-400 transition-all`}
                        />
                        :
                        <p className="ml-2"><b>{profileInput ? profileInput : '@your_profile'}&nbsp;</b>
                            {description || `Your description will be there... The AI will create a ${humor || ''} text that will call attemption of your follows. The most context you give, more precise the AI will be! Enjoy.`}
                        </p>
                }
            </div>
        </div >
    );
}