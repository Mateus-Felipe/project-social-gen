import Header from "@/components/Header";
import Title from "@/components/Title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import axios from "axios";
import { setCookie } from "@/services/cookies";

export default function Signin() {
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const router = useRouter();

    const handleAuth = async () => {
        await axios.post('http://localhost:4000/api/signin', {
            login, password
        }).then(result => {
            if (!result.data) {
                setErrorMsg('Something bad happened. Try again.'); setLogin(''); setPassword('');
            }
            var datauser = result.data.result;
            setCookie('tkuser', JSON.stringify(datauser.token), 7)
            setCookie('iduser', JSON.stringify(datauser.id), 7)
            setCookie('region', JSON.stringify([datauser.region, datauser.idiom]), 7)
            router.push('/dashboard/home');

        }).catch(err => {
            console.log(err);
        })

    }

    useEffect(() => {
        setLoading(false);

    }, []);
    return (
        <div>
            <Header />
            <div className="w-full flex flex-col items-center justify-center">
                <Title style="mt-16" >Login</Title>
                <div className="flex flex-col items-start justify-center w-10/12 mt-16">
                    <label htmlFor="firstInput" className="font-bold" >Your beaultiful <b>login</b>*</label>
                    <input
                        id="firstInput"
                        maxLength={100}
                        value={login} onChange={v => setLogin(v.target.value)
                        }
                        type="email"
                        className="border-2 border-color-black/35 w-full rounded-3xl p-1.5 mb-5"
                    />
                    <label htmlFor="secondInput" className="font-bold" >Your <b>password</b>*</label>
                    <input
                        id="secondInput"
                        maxLength={100}
                        value={password} onChange={v => setPassword(v.target.value)
                        }
                        type="password"
                        className="border-2 border-color-black/35 w-full rounded-3xl p-1.5"
                    />

                    <p className="text-left">Mininum 8 characters with upper case letter and one special character</p>
                    <p className="text-warning font-bold text-2xl text-center mt-16 w-full" >{errorMsg}</p>
                </div>
                {
                    login.length > 2 && password.length >= 8 ?
                        <button
                            onClick={() => handleAuth()}
                            className="shadow-custom border-r-2 border-b-2 mt-4 border-black/20 bg-blue-600 p-4 text-white w-10/12 text-3xl rounded-2xl font-bold">
                            Start creating ☆</button>
                        :
                        <p className="italic font-bold mt-16">Just these few steps to start creating 🚀</p>
                }
            </div>
        </div>
    );
}