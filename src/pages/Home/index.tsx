import Header from "@/components/Header";
import Title from "@/components/Title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import bgOneHome from '@/images/bg-image-homeone.png'
import ImageBanner from '@/images/image-banner-home-one.svg'
import abstractPink from '@/images/abstract-pink-home.svg'
import abstractYellow from '@/images/abstract-yellow-home.svg'
import buildHome from '@/images/build-home.png'
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { setCookie } from "@/services/cookies";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [passOne, setPassOne] = useState('')
    const [passTwo, setPassTwo] = useState('')
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const handleCreateAccount = async () => {
        setLoading(true);
        if (!name || !email || !passOne || !passTwo) {
            return setErrorMsg('Fill all the fields')
        } else if (passOne !== passTwo) {
            return setErrorMsg('Password difference')
        } else if (false) {
            // verify email
        } else {
            await axios.post('http://localhost:4000/api/signup', {
                "name": name,
                "login": email,
                "password": passTwo,
                "idiom": "pt-br"
            }).then(res => {
                var datauser = res.data;
                setCookie('tkuser', JSON.stringify(datauser.token), 7)
                setCookie('iduser', JSON.stringify(datauser.result.id), 7)
                setCookie('region', JSON.stringify([datauser.result.region, datauser.result.idiom]), 99)
                router.push('/dashboard/home');
            }).catch(err => {
                if (err.code == "ERR_NETWORK") {
                    setErrorMsg("Something bad happened!");
                } else if (err.response.data.message) {
                    setErrorMsg(err.response.data.message);
                } else {
                    setErrorMsg(err.response.data.message);
                }
                return setLoading(false)
            })
        }
    }

    const ButtonTheme = ({ style, text, toDo }: any) => {
        return (
            <button className={`w-full rounded-full text-white font-bold bg-purple-theme py-3 
               cursor-pointer hover:text-yellow-light-theme mdlg:text-[2rem] text-2xl mt-2  ${style}`}
                onClick={() => {
                    if (loading) {
                        return;
                    } else if (toDo && toDo == "login") {
                        router.push('signin')
                    } else if (toDo && toDo == 'create') {
                        // create account
                        return handleCreateAccount();
                    } else {
                        router.push('/home#start')
                    }
                }}
            >{toDo == "create" && loading ? 'Loading...' : (text ? text : "Create your first post")}</button>
        )
    }

    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <div className="bg-blue-dark-theme relative">
            <div className="absolute right-5 md:top-5 top-2">
                <ButtonTheme text="User Panel" style="!text-xl !md:w-[155px] !w-[200px] !bg-white !text-black" toDo="login" />
            </div>
            <div className="w-full md:h-screen h-[95vh] bg-no-repeat bg-cover flex md:flex-row flex-col items-center justify-center md:py-0"
                style={{
                    backgroundImage: `url(${bgOneHome.src})`
                }}
            >
                <div className="md:w-[40%] w-11/12 text-white mdlg:ml-28 mt-4 md:text-left text-center">
                    {/* Text */}
                    <h1 className="font-bold md:text-[2.90rem] drop-shadow-2xl-strong text-3xl leading-6 md:leading-[3rem]">Imagine your dreams<br />Let the AI create for you</h1>
                    <h2 className="md:text-3xl text-2xl drop-shadow-2xl-strong my-2 leading-4">Start using the AI text generator for social media</h2>
                    <ButtonTheme style="!md:w-full !w-10/12" />
                </div>
                <div className="md:w-[48%] w-full flex justify-center items-center">
                    <Image className="md:w-[700px] w-10/12"
                        src={ImageBanner} alt="image people using social media"
                    />
                </div>
            </div>
            <div className="w-full -mt-[55px] flex items-center justify-center relative overflow-hidden pb-16 delay-[300ms] duration-[600ms] taos:translate-y-[200px] taos:opacity-0" data-taos-offset="300">
                <div className="flex items-center md:flex-row flex-col justify-center rounded-3xl w-10/12 md:p-7 py-2 z-20 
                bg-gradient-to-br from-orange-light-theme to-red-theme text-white font-bold">
                    <p className="mdlg:text-[1.75rem] text-xl text-center">Text Generation</p>
                    <p className="mdlg:text-[1.75rem] text-xl text-center hidden md:block">&nbsp;-&nbsp;</p>
                    <p className="mdlg:text-[1.75rem] text-xl text-center ">Complete Post Generation</p>
                    <p className="mdlg:text-[1.75rem] text-xl text-center hidden md:block">&nbsp;-&nbsp;</p>
                    <p className="mdlg:text-[1.75rem] text-xl text-center ">Helpful AI</p>
                </div>
                <div
                    className="w-[110%] top-6/12 left-0 absolute bg-blue-dark-theme h-10 rounded-none blur-sm"
                />
            </div>
            <div className="w-full flex items-center justify-center flex-col">
                <div className="w-full flex items-center justify-center mb-16">
                    <Image loading="lazy"
                        src={abstractPink} alt="Say goodbye to writer's block and hello to captivating posts. Our AI crafts engaging Social Media content based on your theme, mood, and context."
                        className="w-11/12 md:w-5/12 mdlg:ml-64"
                    />
                </div>
                <div className="w-full flex items-center justify-center pb-16 -mt-[7%]">
                    <Image loading="lazy"
                        src={abstractYellow} alt="Craft posts that reflect your unique style. Simply input your theme, mood, and context, and watch our AI create personalized text that resonates with your audience."
                        className="w-11/12 md:w-5/12 mdlg:mr-64"
                    />
                </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-theme to-red-light-theme w-full flex items-center justify-center md:flex-row flex-col py-16">
                <div className="md:w-[40%] w-9/12 flex items-center justify-center flex-col">
                    <p className="text-blue-theme font-bold text-2xl text-center">Boost your engagement rates with posts designed to capture attention. Our AI ensures your content is always polished and professional, helping you build a strong brand identity.</p>
                    <ButtonTheme style="w-full !text-2xl mt-5" />
                </div>
                <div className="w-5/12 items-center justify-center hidden md:flex">
                    <Image src={buildHome} alt="home" loading="lazy"
                        className="w-5/12 contrast-125 drop-shadow-2xl"
                    />
                </div>

            </div>
            <div className="flex items-center flex-row flex-wrap justify-center w-full mt-16 delay-[300ms] duration-[600ms] taos:translate-y-[200px] taos:opacity-0" data-taos-offset="300">
                <div className="flex items-center flex-row flex-wrap justify-start md:w-6/12 w-11/12">
                    <div className="w-10/12 bg-white flex items-center justify-center p-5 rounded-full">
                        <p className="text-black text-center font-bold italic ">“This AI tool has revolutionized my social media strategy! It's like having a personal copywriter available 24/7.”</p>
                    </div>
                    <div className="md:ml-[25%] ml-[10%] mt-7 md:w-10/12 w-full bg-white flex items-center justify-center p-5 rounded-full">
                        <p className="text-black text-center font-bold italic ">"I love how easy and fast it is to generate high-quality posts. It saves me so much time!"</p>
                    </div>
                    <div className="w-10/12 mt-7 bg-white flex items-center justify-center p-5 rounded-full">
                        <p className="text-black text-center font-bold italic ">“The engagement on my posts has skyrocketed since I started using this tool. Highly recommend!”</p>
                    </div>
                    <div className="md:ml-[25%] ml-[10%] my-7 md:w-10/12 w-full bg-white flex items-center justify-center p-5 rounded-full">
                        <p className="text-black text-center font-bold italic ">"This tool has been a game-changer for our content strategy. Our posts are now more engaging and professional than ever before!"</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center flex-col mt-16">
                <h1 className="text-white font-bold text-4xl w-10/12 text-center">Ready to Elevate Your Instagram?</h1>
                <p className="text-white w-10/12 text-center">Don't wait any longer. Transform your social media presence with our AI-powered content creator. Sign up now and start your free trial today!</p>
            </div>
            <div className="flex items-center justify-center w-full mt-16 delay-[300ms] duration-[600ms] taos:translate-y-[200px] taos:opacity-0" data-taos-offset="300">
                <div className="flex items-center justify-between md:flex-row flex-col w-10/12">
                    <div className="bg-white text-black flex items-center justify-between flex-col p-5 rounded-md h-[300px] border-r-[3px] border-b-[3px] border-yellow-theme md:w-5/12 w-10/12 text-center">
                        <h1 className="font-bold text-2xl">Start your free trial</h1>
                        <p>Try our tool for free and see the difference it makes!</p>
                        <div className="text-center">
                            <p>&bull; Access to the AI</p>
                            <p>&bull; Create complete post with AI</p>
                            <p>&bull; Caption Review</p>
                        </div>
                        <ButtonTheme style="!text-xl" />
                    </div>
                    <div className="bg-white text-black flex items-center justify-between flex-col p-5 rounded-md h-[300px] border-r-[3px] border-b-[3px] border-yellow-theme md:w-5/12 w-10/12 mt-5 text-center">
                        <h1 className="font-bold text-2xl">Need More?</h1>
                        <p>Need more? Contact us for a customized plan that fits your business needs.</p>
                        <ButtonTheme style="!text-xl !bg-black" text="Enterprise Plan" />
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-center" id="start">
                <div className="w-10/12 bg-white text-black flex justify-between items-center flex-col py-10 mt-24 rounded-xl">
                    <h1 className="text-3xl font-bold">Let's create your account</h1>

                    <label className="text-left mt-7 w-10/12 ml-16 font-bold">Your complete name</label>
                    <input className="text-black placeholder:text-black/50 p-3 w-10/12 bg-blue-light-theme rounded-full border-none mb-5"
                        placeholder="Complete name" type="name" value={name} onChange={v => setName(v.target.value)} />
                    <label className="text-left w-10/12 ml-16 font-bold">Your  best email</label>
                    <input className="text-black placeholder:text-black/50 p-3 w-10/12 bg-blue-light-theme rounded-full border-none mb-5"
                        placeholder="Email" type="email" value={email} onChange={v => setEmail(v.target.value)} />
                    <label className="text-left w-10/12 ml-16 font-bold">Create a strong password</label>
                    <input className="text-black placeholder:text-black/50 p-3 w-10/12 bg-blue-light-theme rounded-full border-none mb-5"
                        placeholder="Password" type="password" value={passOne} onChange={v => setPassOne(v.target.value)} />
                    <label className="text-left w-10/12 ml-16 font-bold">Repeat your password</label>
                    <input className="text-black placeholder:text-black/50 p-3 w-10/12 bg-blue-light-theme rounded-full border-none mb-5"
                        placeholder="Repeat password" type="password" value={passTwo} onChange={v => setPassTwo(v.target.value)} />
                    <p className="text-warning font-bold text-center">{errorMsg}</p>
                    <ButtonTheme style="!text-2xl !w-10/12 !bg-black !mt-7" text="Create Account" toDo="create" />
                </div>
            </div>
            <footer className="w-full bg-blue-theme p-7 mt-28 flex items-center flex-col">
                <p className="w-full text-center text-white/50">Social Gen - {new Date().getFullYear()}</p>
                <div className="w-9/12 flex flex-col items-start text-white">
                    <Link href={'/'}>Privacy Policy</Link>
                    <Link href={'/'}>Start a free trial</Link>
                    <Link href={'/'}>User Panel</Link>
                </div>
            </footer>
        </div>
    );
}