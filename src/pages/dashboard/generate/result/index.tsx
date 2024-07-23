import Header from "@/components/Header";
import Title from "@/components/Title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "@/app/globals.css";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <div>
            <Header />
            <Title>a</Title>
            <div className="flex items-center justify-center" >

            </div>
        </div>
    );
}