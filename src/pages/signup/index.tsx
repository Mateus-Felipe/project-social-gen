import Title from "@/components/Title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import axios from "axios";
import { setCookie } from "@/services/cookies";
import Link from "next/link";
import arrow from "@/images/icons/up-arrow.svg"
import Image from "next/image";

export default function Signup() {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState("")
    const router = useRouter();

    const handleAuth = async () => {
        if (loading) {
            return;
        }
        if (!name || !email || !password) {
            return setErrorMsg("Empty input. Field all inputs to create your account.")
        }
        setLoading(true);
        await axios.post('http://localhost:4000/api/signup', {
            name, login: email, password, region: "brazil", idiom: "pt-br"
        }).then(result => {
            setErrorMsg("Wait a moment...")
            return router.push('/signin');
        }).catch(err => {
            console.log(err)
            if (err.code == "ERR_NETWORK") {
                setErrorMsg("An error occurred... Try again.")
            }
            else if (err.response.data.message) {
                setErrorMsg(err.response.data.message);
            } else {
                setErrorMsg("An error occurred... Try again.")
            }
            setLoading(false);
        })
    }

    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <div className="flex flex-col items-center justify-center w-full text-white
            bg-gradient-to-br from-purple-700 from-10% via-orange-600 via-45% to-purple-700 h-screen" >
            <Link href={"/home"} className="absolute top-16 left-16 flex flex-row items-center justify-center hover:text-blue-500 text-white font-bold hover:font-bold cursor-pointer">
                <Image
                    width={20}
                    className="-rotate-90 mr-3 invert"
                    src={arrow}
                    alt="arrow"
                />
                <p>Return to Home</p>
            </Link>
            <h1 className="mt-16 text-3xl drop-shadow-2xl-strong-two-light font-bold text-white" >Let's start your journey</h1>
            <div className="flex flex-col items-start justify-center w-10/12 mt-16">
                <label htmlFor="firstInput" className="font-bold drop-shadow-2xl-strong-two-light" >Your beaultiful <b>name</b>*</label>
                <input
                    id="firstInput"
                    maxLength={100}
                    value={name} onChange={v => setName(v.target.value)
                    } placeholder="Name"
                    type="name"
                    className="border-2 text-black border-color-black/35 w-full rounded-3xl p-1.5 mb-5"
                />
                <label htmlFor="secondInput" className="font-bold drop-shadow-2xl-strong-two-light" >Your <b>email</b>*</label>
                <input
                    id="secondInput"
                    maxLength={100}
                    value={email} onChange={v => setEmail(v.target.value)
                    } placeholder="email"
                    type="email"
                    className="border-2 text-black border-color-black/35 w-full rounded-3xl p-1.5 mb-5"
                />
                <label htmlFor="thirdInput" className="font-bold drop-shadow-2xl-strong-two-light" >Make a strong <b>password</b>*</label>
                <input
                    id="thirdInput"
                    maxLength={100}
                    value={password} onChange={v => setPassword(v.target.value)
                    } placeholder="password"
                    type="password"
                    className="border-2 text-black border-color-black/35 w-full rounded-3xl p-1.5"
                />
                <p className={`text-left drop-shadow-2xl-strong-two-light ${password.length < 8 ? 'underline font-bold' : 'font-normal'} `}>Mininum 8 characters with upper case letter and one special character
                    <br /> {password.length < 8 ? "Your password doesn't meet the requirements " : ''}
                </p>
                <p className={`text-left drop-shadow-2xl-strong-two-light ${password.length < 8 ? 'underline font-bold' : 'font-normal'} `}>{name.length < 3 ? "The field name is empty." : ''}
                </p>
                <p className={`text-left drop-shadow-2xl-strong-two-light ${password.length < 8 ? 'underline font-bold' : 'font-normal'} `}>{email.length < 5 ? "The field email is empty" : ''}</p>
                <Link className="text-center w-full text-2xl font-bold drop-shadow-2xl-strong-two-light flex flex-row justify-center" href="/signin">Already have an account?&nbsp;<u className="text-yellow-theme">Sign In!</u></Link>
                <p className="font-bold text-2xl text-center mt-16 w-full drop-shadow-2xl-strong-two-light" >{errorMsg && errorMsg}</p>
            </div>
            {
                name.length > 2 && email.length > 2 && password.length >= 8 ?
                    <button
                        onClick={() => handleAuth()}
                        className="shadow-custom border-r-2 border-b-2 mt-4 border-black/20 bg-blue-600 p-4 text-white w-10/12 text-3xl rounded-2xl font-bold">
                        {loading ? 'Loading...' : 'Start creating ☆'}</button>
                    :
                    <p className="italic font-bold mt-16 drop-shadow-2xl-strong-two-light">Just these few steps to start creating 🚀</p>
            }
        </div >
    );
}