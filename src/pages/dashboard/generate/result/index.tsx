"use client"
import Header from "@/components/Header";
import Title from "@/components/Title";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import "@/app/globals.css";
import PostExample from "@/components/PostExample";
import { getCookie } from "@/services/cookies";
import axios from "axios";
import PostEdit from "@/components/PostEdit";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState<any>([]);
    const [awaitPost, setAwaitPost] = useState(true);
    const [postsData, setPostsData] = useState<any>([]);
    const [errorMsg, setErrorMsg] = useState('')
    const router = useRouter();

    const loadPosts = async () => {
        setLoading(true);
        var auth = [getCookie('iduser').replace(/"/g, ""), getCookie('tkuser').replace(/"/g, "")]
        await axios.get('http://localhost:4000/api/logged/post/get', {
            headers: {
                'created_by': auth[0],
                'Authorization': `Bearer ${auth[1]}`
            }
        }).then(response => {
            if (response.data.data.length > 0) {
                setPostsData(response.data.data)
            } else {
                setPostsData(null);
            }
            return true;
        }).catch(err => {
            console.log(err);
            if (err.code == "ERR_NETWORK") {
                setErrorMsg("Something bad happened!");
            } else if (err.response.data.message) {
                setErrorMsg(err.response.data.message);
            } else {
                setErrorMsg(err.response.data.message);
            }
            return true;
        }).finally(() => {
            return setLoading(false);
        })
    }

    useEffect(() => {
        const loadData = async () => {
            loadPosts();
            console.log(router.query?.await);
            if (router.query.await) {
                return setAwaitPost(true);
            }
            return setAwaitPost(false);
        }
        loadData();
    }, [])


    return (
        <div>
            <Header />
            <div className="flex items-center justify-center w-full flex-col py-16
            mdlg:bg-gradient-to-r bg-gradient-to-b from-violet-400 mdlg:from-20% via-red-500 via-30% to-purple-500" >
                {
                    awaitPost === true ? (
                        <>
                            <Title style="mb-16 text-white" >Your post is being generated...</Title>
                            <PostExample style="bg-white mdlg:w-4/12 w-[90%]" loading />
                        </>
                    ) : editingPost && editingPost.id ? (
                        <>
                            <PostEdit style="bg-white mdlg:w-4/12 w-[90%]" data={editingPost} handleCancel={ () => setEditingPost([])} />
                        </>
                    ) : (
                        <div className="text-center text-white">
                            <Title style="mb-16 text-white" >Start to edit 🚀</Title>
                            <p>Select a post and edit it ✨</p>
                        </div>
                    )
                }
            </div>
            <div className="flex items-center justify-center flex-col w-full pb-16">
                <Title style="my-16" >Your variations</Title>
                <div className="flex mdlg:flex-row flex-col flex-wrap items-center justify-evenly w-11/12">
                    {
                        postsData && postsData.length > 0 && postsData.map((value: any) => (
                            <div onClick={() => {
                                if (loading || awaitPost) {
                                    return;
                                }
                                if (!value.id) {
                                    return setErrorMsg('An error occurred when editing the post!');
                                }
                                setEditingPost(value);
                            }} className="flex flex-wrap flex-col items-center justify-center mdlg:w-[28.5%] w-full cursor-pointer" key={value.id}>
                                <PostExample style={`w-full mdlg:mx-1 mb-9 ${editingPost.length == 0 && 'hover:bg-blue-light-theme hover:scale-105'} transition-all`} id={value.id} description={value.description} profile={value.profile} pages={value.pages} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    );
}