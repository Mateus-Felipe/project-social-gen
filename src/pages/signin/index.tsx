import Title from "@/components/Title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import axios from "axios";
import { setCookie } from "@/services/cookies";
import Image from "next/image";
import Link from "next/link";
import arrow from "@/images/icons/up-arrow.svg"



export default function Signin() {
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const router = useRouter();

    const handleAuth = async () => {
        setLoading(true)
        await axios.post('http://localhost:4000/api/signin', {
            login, password
        }).then(result => {
            if (!result.data) {
                setLoading(false)
                return setErrorMsg('Something bad happened. Try again.'); setLogin(''); setPassword('');
            }
            var datauser = result.data;
            console.log(datauser);
            setCookie('tkuser', JSON.stringify(datauser.token), 7)
            setCookie('iduser', JSON.stringify(datauser.data.id), 7)
            setCookie('region', JSON.stringify([datauser.data.region, datauser.data.idiom]), 99)
            router.push('/dashboard/home');

        }).catch(err => {
            setLoading(false);
            console.log(err)
            if (err.code == "ERR_NETWORK") {
                setErrorMsg("An error occurred... Try again.")
            }
            else if (err.response.data.message) {
                setErrorMsg(err.response.data.message);
            } else {
                setErrorMsg("An error occurred... Try again.")
            }
        })

    }

    useEffect(() => {
        setLoading(false);

    }, []);
    return (
        <div className="w-full flex flex-col items-center justify-center
             bg-gradient-to-br from-purple-700 from-10% via-orange-600 via-45% to-purple-700 h-screen relative">
            <Link href={"/home"} className="absolute top-16 left-16 flex flex-row items-center justify-center hover:text-blue-500 text-white font-bold hover:font-bold cursor-pointer">
                <Image
                    width={20}
                    className="-rotate-90 mr-3 invert"
                    src={arrow}
                    alt="arrow"
                />
                <p>Return to Home</p>
            </Link>
            <h1 className="mt-16 text-3xl drop-shadow-2xl-strong-two-light font-bold text-white" >Connect to your account</h1>
            <div className="flex flex-col items-start justify-center w-10/12 mt-16 text-white">
                <label htmlFor="firstInput" className="font-bold drop-shadow-2xl-strong-two-light" >Your beaultiful <b>email login</b>*</label>
                <input
                    id="firstInput"
                    maxLength={100}
                    value={login} onChange={v => setLogin(v.target.value)
                    } placeholder="Email"
                    type="email"
                    className="border-2 text-black border-color-black/35 w-full rounded-3xl p-1.5 mb-5"
                />
                <label htmlFor="secondInput" className="font-bold drop-shadow-2xl-strong-two-light" >Your <b>password</b>*</label>
                <input
                    id="secondInput"
                    maxLength={100}
                    value={password} onChange={v => setPassword(v.target.value)
                    } placeholder="Password"
                    type="password"
                    className="border-2 text-black border-color-black/35 w-full rounded-3xl p-1.5"
                />
                <p className={`text-left drop-shadow-2xl-strong-two-light ${login.length < 8 ? 'underline font-bold' : 'font-normal'} `}>{login.length < 3 ? "The field name is empty or too short." : ''}
                </p>
                <p className={`text-left drop-shadow-2xl-strong-two-light ${password.length < 8 ? 'underline font-bold' : 'font-normal'} `}>{password.length < 8 ? "The field password is empty or too short" : ''}</p>

                <Link className="font-bold text-center w-full text-2xl drop-shadow-2xl-strong-two-light flex flex-row justify-center" href="/signup">Don't have an account?&nbsp;<u className="text-yellow-theme">Sign Up</u>&nbsp;now and start creating!</Link>
                <p className="font-bold text-2xl text-center mt-16 w-full" >{errorMsg}</p>
            </div>
            {
                login.length > 2 && password.length >= 8 ?
                    <button
                        onClick={() => handleAuth()}
                        className="shadow-custom border-r-2 border-b-2 mt-4 border-black/20 bg-blue-600 p-4 text-white w-10/12 text-3xl rounded-2xl font-bold">
                        {loading ? 'Loading...' : 'Start creating ☆'}</button>
                    :
                    <p className="italic font-bold mt-16 text-white">Just these few steps to start creating 🚀</p>
            }
        </div>
    );
}