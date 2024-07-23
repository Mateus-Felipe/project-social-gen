'use client'
import Header from "@/components/Header";
import Title from "@/components/Title";
import { useRouter } from "next/router";
import "@/app/globals.css";



export default function Home() {
    const router = useRouter()
    const services = [
        { name: "Generate complete post", description: "Let's generate the entire post for you page in your social media", image: null, url: "/dashboard/generate/post" },
        { name: "Generate description", description: "Use the AI to write your description", image: null, url: "/dashboard/generate/text" },
        { name: "Generate ", description: "Use the AI to write your description", image: null, url: "/dashboard/generate/text" },
        { name: "New tools are comming soon", description: "I hope you enjoy ours features. Some news are comming for you keep publishing", image: null, url: null },
    ]

    const goPage = (object: any) => {
        router.push('http://localhost:3000' + object.url)
    }

    return (
        <div>
            <Header />
            <div className="w-full flex flex-col items-center justify-center p-10">
                <div className="w-10/12 flex flex-col items-center justify-center">
                    <Title style="text-3xl" >Bem Vindo ao Social Gen</Title>
                    <p>O que vamos fazer agora?</p>

                    <div className="flex flex-row items-center justify-evenly flex-wrap w-10/12 mt-20" >
                        {
                            services.map(value => (
                                <div onClick={() => goPage(value)}
                                    className="shadow-custom border-2 border-black/35 p-3 mb-5 h-40 w-[35%]
                                    hover:scale-110 transition-all 
                                ">
                                    <h2 className="text-2xl" >{value.name}</h2>
                                    <h2 className="text-xl">{value.description}</h2>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}
