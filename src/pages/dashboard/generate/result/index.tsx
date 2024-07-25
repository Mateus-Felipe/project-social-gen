import Header from "@/components/Header";
import Title from "@/components/Title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import PostExample from "@/components/PostExample";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <div>
            <Header />
            <div className="flex items-center justify-center w-full flex-col py-16
            mdlg:bg-gradient-to-r bg-gradient-to-b from-violet-400 mdlg:from-20% via-red-500 via-30% to-purple-500" >
                <Title style="mb-16 text-white" >Your post is being generated...</Title>
                <PostExample style="bg-white mdlg:w-4/12 w-[90%]" loading />
            </div>
            <div className="flex items-center justify-center flex-col w-full pb-16">
                <Title style="my-16" >Your variations</Title>
                <div className="flex items-center justify-center flex-row w-11/12 flex-wrap">
                    <PostExample style="bg-white mdlg:w-[28.5%] w-[90%]" loading />
                    <PostExample style="bg-white mdlg:w-[28.5%] w-[90%] my-12  mdlg:mx-12 " loading />
                    <PostExample style="bg-white mdlg:w-[28.5%] w-[90%]" loading />
                </div>
            </div>
        </div>
    );
}