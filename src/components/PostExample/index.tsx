import Image from "next/image";

import witcher from "@/images/a-witcher-in-a-river-bg.jpg"

interface postProps {
    profile?: string;
    humor?: string;
    style?: string
}

export default function PostExample({ profile: profileInput, humor, style }: postProps ) {
    return (
        <div className={` shadow-custom border-[2px] border-gray w-8/12 rounded-xl ${style}`}>
            <div className="flex flex-row items-center p-3 ">
                <div className="w-8 h-8 rounded-full bg-black" />
                <p className="ml-3 font-bold" >{profileInput ? profileInput : '@your_profile'}</p>
            </div>
            <div className="mdlg:border-[1px] mdlg:border-black/30 h-[435px] mdlg:mx-2">
                <Image
                    src={witcher}
                    alt="A witcher in a river"
                    className="mdlg:border-[1px] mdlg:border-black/30 h-full w-full"
                />
            </div>
            <div className="ml-2 my-2 px-2 pb-5">
                <p><b>{profileInput ? profileInput : '@your_profile'}</b> Your description will be there... The AI will create a {humor} text that will call attemption of your follows. The most context you give, more precise the AI will be! Enjoy.</p>
            </div>
        </div>
    );
}