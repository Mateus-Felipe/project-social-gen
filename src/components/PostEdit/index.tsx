import Image from "next/image";
import witcher from "@/images/a-witcher-in-a-river-bg.jpg"
import arrow from "@/images/icons/up-arrow.svg"
import profile from "@/images/icons/user-avatar-profile.svg"
import { use, useEffect, useLayoutEffect, useState } from "react";
import DropdownInput from "../DropdownInput";
import { getCookie } from "@/services/cookies";
import axios from "axios";
import LoadingView from "../loadingView";

interface pagesProps {
    colorValue: string, colorOpacity: number, text: string, fontFamily: string
}
interface postProps {
    profile?: string
    handleCancel: any
    data: {
        id: string,
        image: any,
        description: string,
        profile: string,
        pages: pagesProps[],
        userId: string,
        created_at: string,
        updated_at: string
    },
    style?: string
}

export default function PostEdit({ profile: profileInput, style, data, handleCancel }: postProps) {
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [caption, setCaption] = useState('')
    const [textPages, setTextPages] = useState<pagesProps[]>()
    const [selectedTextPageIndex, setSelectedTextPageIndex] = useState<number | undefined>(undefined)
    const [selectedTextPageValue, setSelectedTextPageValue] = useState<string | undefined>(undefined)
    const [colorValue, setColorValue] = useState('#000')
    const [colorOpacity, setColorOpacity] = useState<any>('50')
    const [ratio, setRatio] = useState<string>('1 / 1')
    const fontValues = [
        { 'name': 'Arial', value: 'Arial' },
        { 'name': 'Helvetica', value: 'Helvetica' },
        { 'name': 'Ui Sans Serif', value: 'ui-sans-serif' },
        { 'name': 'System Ui', value: 'system-ui' },
        { 'name': 'Sans Serif', value: 'sans-serif' },
        { 'name': 'Cambria', value: 'Georgia' },
        { 'name': 'Times New Roman', value: 'times-new-roman' },
    ]

    const changeImage = (direction?: 'right' | 'left' | null, toPage?: number) => {
        console.log(textPages?.length)
        if (textPages) {
            if (toPage != null || toPage != undefined) {
                setCurrentPage(toPage);
                setColorValue(textPages[toPage].colorValue);
                setColorOpacity(textPages[toPage].colorOpacity);
                return;
            }
            if (direction == 'right') {
                if (currentPage == (textPages?.length - 1)) {
                    return
                }
                else if (currentPage < textPages?.length) {
                    setColorValue(textPages[currentPage + 1].colorValue);
                    setCurrentPage(currentPage + 1);
                    setColorOpacity(textPages[currentPage + 1].colorOpacity);
                }
            } else if (direction == 'left') {
                if (currentPage == 0) {
                    return
                }
                else if (currentPage > 0) {
                    setColorValue(textPages[currentPage - 1].colorValue);
                    setCurrentPage(currentPage - 1)
                    setColorOpacity(textPages[currentPage - 1].colorOpacity);
                }
            }
        }
    }

    const TextComponentPage = ({ fontFamily }: any) => {
        useEffect(() => {
            () => { };
        }, [fontFamily])

        console.log(fontFamily);
        if (textPages) {
            return (
                <p className={`w-10/12 text-white font-bold z-20 cursor-pointer whitespace-pre-line ${currentPage == 0 ? 'ml-5' : ''} `}
                    style={{
                        fontFamily: fontFamily
                    }}
                    onClick={() => {
                        setSelectedTextPageIndex(currentPage); setSelectedTextPageValue(textPages[currentPage].text)
                    }}
                >{selectedTextPageValue != undefined && selectedTextPageIndex == currentPage ? selectedTextPageValue :
                    textPages[currentPage].text ? textPages[currentPage].text : ''}</p>
            )
        } else {
            return (<></>)
        }
    }

    const handleSavePost = async () => {
        if (loading) {
            return;
        }
        if (caption.length < 1 || !textPages) {
            alert('Some error occurred! Try reload the page.')
            return;
        }
        var newData = data;
        newData.description = caption; newData.pages = textPages;
        var auth = [getCookie('iduser').replace(/"/g, ""), getCookie('tkuser').replace(/"/g, "")]
        await axios.post('http://localhost:4000/api/logged/post/edit', {
            data: newData
        }, {
            headers: {
                'created_by': auth[0],
                'Authorization': `Bearer ${auth[1]}`
            }
        }).then(response => {
            window.location.reload();
        }).catch(err => {
            console.log(err);
            if (err.code == "ERR_NETWORK") {
                alert("Something bad happened!");
            } else if (err.code == "ERR_BAD_REQUEST") {
                alert("Something bad happened!");
            } else if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert(err.response.data.message);
            }
            return true;
        }).finally(() => {
            return setLoading(false);
        })
    }

    useEffect(() => {
        const loadData = async () => {
            if (data) {
                setCaption(data.description)
                setTextPages(data.pages)
                setSelectedTextPageIndex(currentPage); setSelectedTextPageValue(data.pages[currentPage].text)
                console.log('pages');
                console.log(data.pages);
            }
        };
        loadData();
    }, [])

    return (
        <div className="w-10/12 flex md:flex-row items-center md:justify-evenly justify-center relative min-h-[550px]">
            <div id={data.id} className={` shadow-custom border-[2px] border-gray w-9/12 bg-white rounded-xl ${style}`}>
                <div className="flex flex-row items-center p-3 ">
                    <div className="w-8 h-8 rounded-full bg-gray-500 animate-pulse flex items-center justify-center overflow-hidden">
                        <Image
                            src={profile}
                            alt="user profile photo"
                            className="w-full animate-pulse"
                        />
                    </div>
                    <p className={`ml-3 font-bold`} >{profileInput ? profileInput : '@your_profile'}</p>
                </div>
                <div className="mdlg:border-[1px] mdlg:border-black/30 h-auto bg mdlg:mx-2 flex items-center justify-center">
                    <div className="relative flex items-center justify-between w-full sm:h-full h-auto">
                        <Image
                            src={witcher}
                            alt="A witcher in a river"
                            className="mdlg:border-[1px] mdlg:border-black/30 sm:h-full h-auto w-full"
                            style={{
                                aspectRatio: ratio
                            }}
                        />
                        {
                            textPages && textPages.length > 0 &&
                                textPages.length > 1 ?
                                <div className="flex w-full items-center h-full justify-between px-3 absolute">
                                    <div className={`absolute h-full w-full left-0 top-0`} style={{ backgroundColor: textPages[currentPage].colorValue, opacity: textPages[currentPage].colorOpacity + '%' }} />
                                    <div className={`absolute w-full flex items-center flex-row justify-center bottom-5 left-0`}>
                                        {
                                            textPages.map((v, index) => (
                                                <button className={`h-2 w-2 hover:border-[0.2px] hover:border-yellow-theme ${currentPage === index ? 'bg-white' : 'bg-gray-500'} mr-4 rounded-full`}
                                                    onClick={() => changeImage(null, index)}
                                                />
                                            ))
                                        }
                                    </div>
                                    <div className={`bg-white rounded-full w-7 h-7 flex items-center justify-center z-20 ${currentPage == 0 ? 'opacity-0 cursor-default' : 'cursor-pointer'}`} onClick={() => changeImage("left")} >
                                        <Image
                                            alt="arrow"
                                            src={arrow}
                                            className="-rotate-90 w-5 bg-white rounded-full"
                                        />
                                    </div>
                                    {/* <p className={`w-10/12 text-white font-bold z-20 cursor-pointer whitespace-pre-line ${currentPage == 0 ? 'ml-5' : ''} `}
                                        style={{
                                            fontFamily: textPages[currentPage].fontFamily ? textPages[currentPage].fontFamily : 'Arial'
                                        }}
                                        onClick={() => {
                                            setSelectedTextPageIndex(currentPage); setSelectedTextPageValue(textPages[currentPage].text)
                                        }}
                                    >{selectedTextPageValue != undefined && selectedTextPageIndex == currentPage ? selectedTextPageValue :
                                        textPages[currentPage].text ? textPages[currentPage].text : ''}</p> */}
                                    <TextComponentPage fontFamily={textPages[currentPage].fontFamily} />
                                    <div className={`bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer z-20 ${currentPage == (textPages.length - 1) ? 'opacity-0 cursor-default' : 'cursor-pointer'} `} onClick={() => changeImage("right")}>
                                        <Image
                                            alt="arrow"
                                            src={arrow}
                                            className="rotate-90 w-5"
                                        />
                                    </div>
                                </div>
                                : textPages && textPages.length == 1 &&
                                <div className="flex w-full items-center justify-between px-3 absolute h-full">
                                    <div className={`absolute h-full w-full bg-black/60 left-0 top-0`} />
                                    {/* <p className={`w-10/12 text-white font-bold z-20 cursor-pointer whitespace-pre-line ${currentPage == 0 ? 'ml-5' : ''} `}
                                        style={{
                                            fontFamily: textPages[currentPage].fontFamily ? textPages[currentPage].fontFamily : 'Arial'
                                        }}
                                        onClick={() => {
                                            setSelectedTextPageIndex(currentPage); setSelectedTextPageValue(textPages[currentPage].text)
                                        }}
                                    >{selectedTextPageValue != undefined && selectedTextPageIndex == currentPage ? selectedTextPageValue :
                                        textPages[currentPage].text ? textPages[currentPage].text : ''}</p> */}
                                    <TextComponentPage fontFamily={textPages[currentPage].fontFamily} />
                                </div>
                        }
                    </div>
                </div>
                <div className="my-2 px-2 pb-5 flex items-center justify-center">
                    <p className="ml-2"><b>{profileInput ? profileInput : '@your_profile'}&nbsp;</b>
                        {caption && caption}
                    </p>
                </div>
            </div>
            {/*
                //* EDIT 
                //* EDIT 
                //* EDIT 
            */}
            <div className="border-2 border-blue-light-theme bg-white w-5/12 rounded-xl flex items-center justify-start flex-col py-5">
                <div className="w-10/12">
                    <h1 className="mb-16 text-2xl text-black text-center font-bold" >Let's edit your post</h1>
                    {
                        selectedTextPageIndex != undefined && selectedTextPageValue != undefined ? (
                            <>
                                <div>
                                    <label className="ml-5">Edit text of the <b>page {selectedTextPageIndex + 1}</b></label>
                                    <button onClick={() => {
                                        var oldText = data.pages[currentPage].text;
                                        console.log(data)
                                        alert('oldText ' + oldText);
                                        //@ts-ignore
                                        var currentText = textPages;
                                        //@ts-ignore
                                        currentText[currentPage].text = oldText;
                                        setTextPages(currentText);
                                        setSelectedTextPageIndex(currentPage); setSelectedTextPageValue(data.pages[currentPage].text)
                                    }} className="text-blue-theme underline mx-5" >Reset text of to the last saved value</button>
                                </div>
                                <textarea cols={3} placeholder="Page text" className="border-2 border-color-black/35 w-full rounded-2xl p-1.5" value={selectedTextPageValue} onChange={v => {
                                    setSelectedTextPageValue(v.target.value);
                                    if (textPages) {
                                        var newText = textPages;
                                        newText[currentPage].text = v.target.value;
                                        setTextPages(newText);
                                    }

                                }} />
                                <p className={` ${selectedTextPageValue.length > 1000 ? 'text-warning font-bold' : 'text-black font-normal'} `}>{selectedTextPageValue.length}</p>
                                <div className="w-full flex items-center justify-center">
                                    <DropdownInput value={fontValues} style="my-5 w-10/12" text="Select text font" searchText="Search font" onChangeValue={(newValue: string) => {
                                        alert('called ' + newValue);
                                        if (textPages) {
                                            var newFont = textPages;
                                            newFont[currentPage].fontFamily = newValue;
                                            setTextPages(newFont);
                                            console.log(textPages[currentPage])
                                        }
                                    }} />
                                </div>
                                {/* <div className="flex items-center justify-center flex-row">
                                    <button className="bg-red-light-theme p-2 font-bold rounded-lg mr-5">
                                        Cancel changes
                                    </button>
                                    <button className="bg-yellow-light-theme p-2 font-bold rounded-lg"
                                        onClick={() => {
                                            if (textPages) {
                                                var old = textPages; old[selectedTextPageIndex].text = selectedTextPageValue;
                                                setTextPages(old); setSelectedTextPageIndex(undefined); setSelectedTextPageValue(undefined);
                                            }
                                        }}
                                    >
                                        Confirm page {selectedTextPageIndex + 1} text changes
                                    </button>
                                </div> */}
                            </>
                        ) : (
                            <h2 className="text-2xl text-center font-bold">Click in the text page to edit it!</h2>
                        )
                    }
                </div>
                <div className="h-1 bg-black/20 w-full my-5" />
                <div className="flex items-center justify-center flex-col w-full">
                    <h2 className="font-bold text-xl">Change post size</h2>
                    <div className="w-10/12 flex flex-wrap items-center justify-evenly mt-5">
                        <button className={`bg-gray-300 border-[0.3px] ${ratio == '1 / 1' ? 'bg-gray-700 font-bold text-white' : 'font-normal border-black/30'} hover:bg-gray-700 hover:text-white hover:font-bold h-14 w-14`}
                            onClick={() => setRatio('1 / 1')}
                        >1:1<br />ratio</button>
                        <button className={`bg-gray-300 border-[0.3px] ${ratio == '1.91 / 1' ? 'bg-gray-700 font-bold text-white' : 'font-normal border-black/30'} hover:bg-gray-700 hover:text-white hover:font-bold h-14 w-14`}
                            onClick={() => setRatio('1.91 / 1')}
                        >1.91:1<br />ratio</button>
                        <button className={`bg-gray-300 border-[0.3px] ${ratio == '4 / 5' ? 'bg-gray-700 font-bold text-white' : 'font-normal border-black/30'} hover:bg-gray-700 hover:text-white hover:font-bold h-14 w-14`}
                            onClick={() => setRatio('4 / 5')}
                        >4:5<br />ratio</button>
                        <button className={`bg-gray-300 border-[0.3px] ${ratio == '16 / 9' ? 'bg-gray-700 font-bold text-white' : 'font-normal border-black/30'} hover:bg-gray-700 hover:text-white hover:font-bold h-14 w-14`}
                            onClick={() => setRatio('16 / 9')}
                        >16:9<br />ratio</button>
                        <button className={`bg-gray-300 border-[0.3px] ${ratio == '9 / 16' ? 'bg-red-theme font-bold text-white' : 'border-black/30'} hover:bg-gray-700 hover:text-white hover:font-bold h-14 w-14`}
                            onClick={() => setRatio('9 / 16')}
                        >9:16<br />ratio</button>
                    </div>
                </div>
                <div className="h-1 bg-black/20 w-full my-5" />
                <div className="flex items-center justify-center flex-col w-full">
                    <h2 className="font-bold text-xl">Background overlay of page {currentPage + 1}</h2>
                    <div className="flex flex-row items-center justify-evenly w-10/12 mt-5">
                        <div className="border-2 border-color-black/35 w-5/12 rounded-2xl p-1.5 flex items-center justify-between flex-row">
                            <input type="text" className="border-none w-full" value={colorValue} onChange={v => {
                                setColorValue(v.target.value);
                                if (textPages) {
                                    var newColor = textPages;
                                    newColor[currentPage].colorValue = v.target.value
                                    setTextPages(newColor)
                                }
                            }} />
                            <input type="color" value={colorValue} onChange={v => {
                                setColorValue(v.target.value)
                                if (textPages) {
                                    var newColor = textPages;
                                    newColor[currentPage].colorValue = v.target.value
                                    setTextPages(newColor)

                                }
                            }} />
                        </div>
                        <div className="flex items-start justify-center flex-col w-5/12">
                            <label>Opacity</label>
                            <input type="range" min={0} max={100} value={colorOpacity} onChange={v => {
                                setColorOpacity(v.target.value);
                                if (textPages) {
                                    var newOpacity = textPages;
                                    newOpacity[currentPage].colorOpacity = parseInt(v.target.value)
                                    setTextPages(newOpacity)
                                }
                            }
                            } className="bg-blue-light-theme w-full" />
                            <p>{colorOpacity + '%'}</p>
                        </div>
                        {/* <input type="number" min="0" max="100" value={colorOpacity} onChange={v => {
                            if (parseInt(v.target.value) > 100 || parseInt(v.target.value) < 0) {
                                return;
                            }
                            setColorOpacity(v.target.value)
                        }
                        } className="border-2 border-color-black/35 w-5/12 rounded-2xl p-1.5" /> */}
                    </div>
                </div>
                <div className="h-1 bg-black/20 w-full my-5" />
                <div className="w-10/12 flex flex-col items-start justify-start mb-5">
                    <div>
                        <label className="ml-5">Edit Caption</label>
                        <button onClick={() => setCaption(data.description)} className="text-blue-theme underline mx-5" >Reset caption to the last saved value</button>
                    </div>
                    <textarea cols={3} placeholder="Caption" className="border-2 border-color-black/35 w-full rounded-2xl p-1.5" value={caption} onChange={v => setCaption(v.target.value)} />
                    <p className={` ${caption.length > 1000 ? 'text-warning font-bold' : 'text-black font-normal'} `}>{caption && caption.length}</p>

                </div>
                <div>
                    <button className="bg-red-light-theme p-2 font-bold rounded-lg mr-5" onClick={handleCancel} >
                        Cancel edit
                    </button>
                    <button className="bg-yellow-light-theme p-2 font-bold rounded-lg"
                        onClick={handleSavePost}
                    >
                        Confirm post changes
                    </button>
                </div>
            </div>
            <LoadingView successMessage="Saving data! Please wait..." loading={loading} />
        </div>
    );
}