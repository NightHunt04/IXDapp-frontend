import { useState, useEffect, useCallback } from "react"
import { generateImage } from "../../../utils/generateImage";
import { useContract } from "../../../context/contractContext";
import { useNavigate } from "react-router-dom";

function Post () {
    const navigate = useNavigate()
    const { account, contract } = useContract()
    const [prompt, setPrompt] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [imageSrc, setImageSrc] = useState('')
    const [loader, setLoader] = useState(false)
    const [transactionLoader, setTransactionLoader] = useState(false)
    const [successResponse, setSuccessResponse] = useState(false)
    const [created, setCreated] = useState(false)

    const [cols, setCols] = useState(30);
    const [rows, setRows] = useState(4);

    useEffect(() => {
        window.scrollTo(0, 0)

        function handleResize() {
            if (window.innerWidth >= 768) { 
                setCols(71)
                setRows(5)
            } else {
                setCols(40)
                setRows(3)
            }
        }
        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleGenerateImage = async () => {
        if(prompt !== '') {
            setCreated(false)
            setLoader(true)
            setSuccessResponse(false)
            setImageSrc('')
            const imageSrc = await generateImage(prompt)
            setImageSrc(imageSrc)
            setLoader(false)

            if(imageSrc) setSuccessResponse(true)
        }
    }

    const handlePost = useCallback(async () => {
        setCreated(false)
        setPrompt('')
        setDesc('')
        setImageSrc('')
        setTitle('')

        if (contract && imageSrc && title && account) {
            try {
                setTransactionLoader(true)
                await contract.methods.setPost(imageSrc, title, desc).send({ from: account })
                setTransactionLoader(false)
                setCreated(true)

                navigate('/')
                window.location.reload()
            } catch (err) {
                setTransactionLoader(false)
                console.error(err)
            }
        }

    }, [title, desc, imageSrc, contract, account])

    return (
        <div className="relative w-full md:w-[80%] h-full flex flex-col md:items-start items-center justify-start">
            {transactionLoader && 
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-[#0a0a0abd]">
                <div className="rounded-lg px-5 z-51 py-4 bg-[#1d1d1d] flex flex-col items-center justify-center border-[1px] border-red-700 w-[80%] md:w-[40%]">
                    <p>Wait for the transaction process, blockchain is slower compared to the servers :(</p>
                    <img src="https://25.media.tumblr.com/e5855a07c3da76eb115a11154092c81f/tumblr_mf7qdidz7M1s0hnxko1_500.gif" alt="waiting" className="mt-5 w-full h-full md:w-[450px] md:h-[450px] object-cover" />
                </div>
            </div>}

            <div className="mt-40 flex flex-col items-start justify-start w-full">
                <h3 className="text-lg font-semibold">Create an IX post</h3>
                <p className="text-gray-01">Generate an image by providing a prompt, give title and a description if want to.</p>

                <div className="relative mt-7 md:mt-10 flex items-center justify-center rounded-xl overflow-hidden w-full h-full md:w-[450px] md:h-[450px] bg-[#2f2f2f]">
                    <img src={`https://api.codetabs.com/v1/proxy/?quest=${imageSrc}`} alt="img" className={`${imageSrc ? 'flex' : 'hidden'} z-20 w-full h-full object-cover rounded-xl`} />
                    <p className={`${loader ? 'hidden' : 'block'} absolute`}>No image generated yet</p>
                    {loader && <img src="/assets/icons8-loading-circle.gif" className="w-[50px] h-[50px] object-cover"></img>}
                </div>

                {successResponse && 
                    <div className="text-xs md:text-sm flex items-start justify-between my-3 mb-4 w-full md:w-[45%]">
                        <div className="flex items-center justify-center gap-1">
                            <img src="/assets/circle.png" className="w-[10px] h-[10px] md:w-[16px] md:h-[16px] object-cover" />
                            <p className="text-green-700">Successfully generated!</p>
                        </div>
                        {prompt && <button onClick={handleGenerateImage} className="px-2 py-1 text-red-500 border-[1px] border-red-700 rounded-lg bg-[#4d00006f]">Re-generate?</button>}
                    </div>}
                {loader && <p className="text-xs md:text-sm font-semibold mt-1">Wait for about 20s</p>}

                <div className="mt-6 flex items-center justify-center w-full md:w-[60%] gap-2">
                    <div className="flex flex-col relative items-center justify-center w-full">
                        <input 
                            id="prompt"
                            type="text" 
                            placeholder="Prompt here"
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && document.getElementById('gen').click()}
                            className="peer bg-[#323232] outline-none border-[1px] border-[#545454] rounded-lg px-4 py-2 w-full placeholder-transparent focus:border-[#4f4dd0d8]"
                            />
                        <label htmlFor="prompt" className="absolute text-[13px] text-[#bdbdbd] px-2 left-3 -top-5 peer-placeholder-shown:text-[13px] 2xl:peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-2 transition-all duration-300">Prompt here</label>
                    </div>

                    <button onClick={handleGenerateImage} id="gen" className="px-3 py-2 rounded-lg bg-[#1a5a0591] border-[1px] border-green-500 hover:bg-[#1a5a0554]">
                        Generate
                    </button>
                </div>

                <p className="mt-2 text-gray-01">* Describe the image you want in the above field</p>

                <div className="mt-7 flex flex-col relative items-center justify-center w-full md:w-[60%]">
                    <input 
                        id="title"
                        type="text" 
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && document.getElementById('password').focus()}
                        className="peer bg-[#323232] outline-none border-[1px] border-[#545454] rounded-lg px-4 py-2 w-full placeholder-transparent focus:border-[#4f4dd0d8]"
                        />
                    <label htmlFor="title" className="absolute text-[13px] text-[#bdbdbd] px-2 left-3 -top-5 peer-placeholder-shown:text-[13px] 2xl:peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-2 transition-all duration-300">Title</label>
                </div>
                <p className="mt-2 text-gray-01">* Give a title to your IX post</p>

                <textarea value={desc} onChange={e => setDesc(e.target.value)} cols={cols} rows={rows} className="rounded-lg outline-none border-[1px] border-[#545454] bg-[#323232] px-3 py-2 mt-7 focus:border-[#4f4dd0d8]" placeholder="Description regarding IX post"></textarea>
                <p className="mt-2 mb-16 md:mb-24 text-gray-01">Give a description about IX post</p>

                <button onClick={handlePost} className={`px-3 py-2 rounded-lg bg-[#1a5a0591] border-[1px] border-green-500 hover:bg-[#1a5a0554] ${created ? '' : 'mb-48'}`}>
                    Create & Post
                </button>     

                {created && <p className="text-green-500 mt-8 mb-48">Created and posted a new IX post!</p>}       
            </div> 
        </div>
    )
}

export default Post