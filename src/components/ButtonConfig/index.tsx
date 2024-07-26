import { useRouter } from "next/router";
import "@/app/globals.css";
import arrow from '@/images/icons/up-arrow.svg'
import Image from "next/image";

interface ButtonConfigProps {
    data: {
        url: string;
        name: string
    }
}

export default function ButtonConfig({ data }: ButtonConfigProps) {
    const router = useRouter();
    return (
        <div className="mdlg:w-6/12 w-10/12 p-5 bg-gray-300 border-2 border-black/20 font-bold mdlg:text-2xl flex items-center justify-between mt-5 flex-row rounded-lg cursor-pointer"
            onClick={() => router.push(data.url)}
        >
            <p>{data.name}</p>
            <Image
                src={arrow}
                alt="arrow"
                className="mdlg:w-16 w-11 rotate-90"
            />
        </div>
    );
}