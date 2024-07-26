import Header from "@/components/Header";
import Title from "@/components/Title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import Image from "next/image";
import ButtonConfig from "@/components/ButtonConfig";

export default function Profile() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const options = [
        { name: "Personal information", url: '/dashboard/profile/personal' },
        { name: "Billing options", url: '/dashboard/profile/billing' },
        { name: "Your usage", url: '/dashboard/profile/usage' },
    ]

    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center" >
                <Title style="mt-16">Página de perfil</Title>
                <div className="w-full flex flex-col justify-center items-center mt-16">

                    {
                        options.map(value => (
                            <ButtonConfig data={value} />
                        ))
                    }

                </div>
            </div>
        </div>
    );
}