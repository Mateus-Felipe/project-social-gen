import Title from "@/components/Title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import axios from "axios";
import { setCookie } from "@/services/cookies";
import Link from "next/link";

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
        <div>
            <div className="flex flex-col items-center justify-center w-full" >
                <Title style="mt-16" >Let's start your journey</Title>
                <div className="flex flex-col items-start justify-center w-10/12 mt-16">
                    <label htmlFor="firstInput" className="font-bold" >Your beaultiful <b>name</b>*</label>
                    <input
                        id="firstInput"
                        maxLength={100}
                        value={name} onChange={v => setName(v.target.value)
                        }
                        type="name"
                        className="border-2 border-color-black/35 w-full rounded-3xl p-1.5 mb-5"
                    />
                    <label htmlFor="secondInput" className="font-bold" >Your <b>email</b>*</label>
                    <input
                        id="secondInput"
                        maxLength={100}
                        value={email} onChange={v => setEmail(v.target.value)
                        }
                        type="email"
                        className="border-2 border-color-black/35 w-full rounded-3xl p-1.5 mb-5"
                    />
                    <label htmlFor="thirdInput" className="font-bold" >Make a strong <b>password</b>*</label>
                    <input
                        id="thirdInput"
                        maxLength={100}
                        value={password} onChange={v => setPassword(v.target.value)
                        }
                        type="password"
                        className="border-2 border-color-black/35 w-full rounded-3xl p-1.5"
                    />
                    <p className="text-left">Mininum 8 characters with upper case letter and one special character</p>
                    <Link className="text-center w-full cursor-pointer underline" href="/signin">Already have an account? Sign In!</Link>
                    <p className="text-warning font-bold text-2xl text-center mt-16 w-full" >{errorMsg}</p>
                </div>
                {
                    name.length > 2 && email.length > 2 && password.length >= 8 ?
                        <button
                            onClick={() => handleAuth()}
                            className="shadow-custom border-r-2 border-b-2 mt-4 border-black/20 bg-blue-600 p-4 text-white w-10/12 text-3xl rounded-2xl font-bold">
                            {loading ? 'Loading...' : 'Start creating ☆'}</button>
                        :
                        <p className="italic font-bold mt-16">Just these few steps to start creating 🚀</p>
                }
            </div>
        </div>
    );
}