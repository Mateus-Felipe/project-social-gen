import Header from "@/components/Header";
import Image from "next/image";
import { useState } from "react";
import "@/app/globals.css";
import arrow from "../../../../../public/icons/up-arrow-svgrepo-com.svg"
import witcher from '@/images/a-witcher-in-a-river-bg.jpg'
import Link from "next/link";
import PostExample from "@/components/PostExample";
import Title from "@/components/Title";

export default function Post() {
    const [themeInput, setThemeInput] = useState<string>('');
    const [profileInput, setProfileInput] = useState<string>('');
    const [humor, setHumor] = useState('helpful')
    const [pageQnt, setPageQnt] = useState("1")
    const [context, setContext] = useState('')
    const [loading, setLoading] = useState(false);


    return (
        <div>

            <div className="mdlg:bg-gradient-to-r bg-gradient-to-b from-violet-400 mdlg:from-20% via-red-500 via-30% to-purple-500 " >
                <Header />
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="shadow-custom relative
                    flex mdlg:flex-row flex-col justify-center items-center
                    border-2 rounded-3xl bg-white w-11/12 mdlg:h-[690px] h-auto my-32 py-16 mdlg:py-0 ">
                        <Link href={"/dashboard/home"} className="absolute -top-7 left-5 z-10 flex flex-row items-center justify-center hover:text-blue-500 hover:font-bold cursor-pointer">
                            <Image
                                width={20}
                                className="-rotate-90 mr-3"
                                src={arrow}
                                alt="arrow"
                            />
                            <p>Return to Home</p>
                        </Link>
                        <div className="mdlg:w-[48%] mdlg:flex-row flex-col w-full h-full flex items-center justify-center">
                            {/* Instagram */}
                            <Title style="mdlg:hidden mb-5" >Preview your post!</Title>
                            <PostExample
                                style="!mdlg:w-10/12 !w-11/12"
                                profile={profileInput}
                                humor={humor}
                            />
                        </div>
                        <div
                            className="mdlg:h-full p-[1px] bg-black/35"
                        />
                        <div className="flex flex-col items-center justify-start w-11/12 mdlg:w-[48%] h-full">
                            {/* Form inputs */}
                            <h2 className="mt-10 font-bold text-2xl mb-5" >Let's start construct your post with AI</h2>

                            <div className="flex flex-col items-start justify-center w-full mdlg:ml-9">
                                <label htmlFor="firstInput" className="font-bold" >A theme for your post*</label>
                                <input
                                    id="firstInput"
                                    maxLength={80}
                                    value={themeInput} onChange={v => setThemeInput(v.target.value)
                                    }
                                    className="border-2 border-color-black/35 w-full rounded-3xl p-1.5 mb-5"
                                />
                                <p className={`mdlg:ml-3 ${themeInput.length >= 80 ? 'relative' : 'hidden'} text-warning`} >{themeInput.length}</p>
                                <label htmlFor="numberInput" className="font-bold" >How many pages do you want?</label>
                                <select
                                    value={pageQnt}
                                    onChange={v => setPageQnt(v.target.value)}
                                    id="numberInput"
                                    className="border-2 border-color-black/35 w-full rounded-2xl p-1.5 mb-5"
                                >
                                    <option value={"1"} >1</option>
                                    <option value={"2"} >2</option>
                                    <option value={"3"} >3</option>
                                    <option value={"4"} >4</option>
                                    <option value={"5"} >5</option>
                                    <option value={"6"} >6</option>
                                    <option value={"7"} >7</option>
                                    <option value={"8"} >8</option>
                                    <option value={"9"} >9</option>
                                </select>

                                <label htmlFor="secondInput" className="font-bold" >Your @profile (optional)</label>
                                <input
                                    id="secondInput"
                                    maxLength={30}
                                    value={profileInput} onChange={v => setProfileInput(v.target.value)
                                    }
                                    className="border-2 border-color-black/35 w-full rounded-2xl p-1.5 mb-5"
                                />
                                <p className={`mdlg:ml-3 ${profileInput.length >= 30 ? 'relative' : 'hidden'} text-warning `} >{profileInput.length}</p>
                                <label htmlFor="thirdInput" className="font-bold" >Select the type of content*</label>
                                <select
                                    value={humor}
                                    onChange={v => setHumor(v.target.value)}
                                    id="thirdInput"
                                    className="border-2 border-color-black/35 w-full rounded-2xl p-1.5 mb-5"
                                >
                                    <option>Helpful</option>
                                    <option>Funny</option>
                                    <option>Hilarius</option>
                                    <option>News</option>
                                    <option>Informative</option>
                                    <option>Serius</option>
                                </select>

                                <label htmlFor="fourInput" className="font-bold" >You can give a context for your post here</label>
                                <textarea
                                    id="fourInput"
                                    value={context}
                                    onChange={v => setContext(v.target.value)}
                                    maxLength={110}
                                    className="border-2 border-color-black/35 w-full rounded-2xl p-1.5"
                                >

                                </textarea>
                                <p className={`mdlg:ml-3 ${context.length >= 110 ? 'relative' : 'hidden'} text-warning`} >{context.length}</p>

                                <div className="w-full flex justify-center items-center mt-10">
                                    <button
                                        onClick={() => setLoading(true)}
                                        className="shadow-custom border-r-2 border-b-2 border-black/20 bg-blue-600 p-4 text-white w-full text-3xl rounded-2xl font-bold">Generate ☆</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* POST FORM */}
            <div className="flex flex-wrap items-center justify-center mt-20 mb-10 flex-col w-full">
                <Title style="mb-10">Your last posts</Title>
                <div className="flex flex-wrap mdlg:flex-row flex-col items-center justify-evenly w-11/12">
                    <PostExample style="mdlg:w-[28.5%] w-full mdlg:mx-1 mb-9 " />
                    <PostExample style="mdlg:w-[28.5%] w-full mdlg:mx-1 mb-9 " />
                    <PostExample style="mdlg:w-[28.5%] w-full mdlg:mx-1 mb-9 " />
                    <PostExample style="mdlg:w-[28.5%] w-full mdlg:mx-1 mb-9 " />
                    <PostExample style="mdlg:w-[28.5%] w-full mdlg:mx-1 mb-9 " />
                </div>
            </div>
            {/* LOADING VIEW */}
            <div className={` ${loading ? 'flex opacity-[0.97]' : 'hidden opacity-0'} fixed top-0 left-0 w-full h-screen z-50 bg-gradient-to-br
            from-red-500 to-yellow-700 items-center justify-center`}>
                <p className="font-bold text-white">Your post is being generated! ❤️</p>
            </div>
        </div>
    );
}
