import { getCookie } from "@/services/cookies";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import userProfile from '@/images/icons/user-avatar-profile.svg'

interface HeaderProps {
    loading?: boolean;
}

export default function Header({ loading }: HeaderProps) {
    const [loadingBanner, setLoadingBanner] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadAuth = () => {
            var authData = [getCookie('tkuser'), getCookie('iduser'), getCookie('region')];
            if (!authData[0] || !authData[1] || !authData[2]) {
                router.push('/signin');
                return;
            }
        }
        loadAuth();
    }, [])

    return (
        <div className="w-full h-24 flex flex-row justify-center items-center mb-15 bg-black">
            <div className="w-10/12 text-white font-bold flex flex-row items-center justify-between mx-16">
                <h2 onClick={() => router.push('/dashboard/home')} className="mdlg:text-2xl cursor-pointer">{loading ? 'Carregando...' : 'Social Generator'}</h2>
                <div className="w-[60px] rounded-full bg-white flex justify-center items-center border-2 border-black/25 cursor-pointer overflow-hidden"
                    onClick={() => router.push('/dashboard/profile')}
                >
                    <Image
                        src={userProfile}
                        alt="Image profile"
                        className="invert-0 w-full"
                    />
                </div>
            </div>
            {
                loadingBanner &&
                <div className="fixed w-full h-screen top-0 left-0 bg-black/50 flex justify-center items-center">
                    <div></div>
                </div>
            }
        </div>
    );
}