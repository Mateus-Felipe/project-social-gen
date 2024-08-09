'use client'
import Header from "@/components/Header";
import Title from "@/components/Title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import dynamic from "next/dynamic";

const KonvaTest = dynamic(() => import("./KonvaTest").then((mod) => mod), {
    ssr: false,
});

// import KonvaTest from "./KonvaTest";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <div className="flex items-center justify-center w-full" >
            {loading == false &&
                <KonvaTest />
            }
        </div>
    );
}