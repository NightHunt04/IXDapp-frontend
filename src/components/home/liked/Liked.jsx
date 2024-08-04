import { useEffect, useState, useRef } from "react"
import { getLikedPost } from "../../../utils/getLikedPost"
import { useContract } from "../../../context/contractContext"
import ShortUniqueId from "short-unique-id"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { likePost } from "../../../utils/likePost"
import { dislikePost } from "../../../utils/dislikePost"

function Liked () {
    const uid = new ShortUniqueId({ length: 8 })
    const { account, cacheLikedPost, setCacheLikedPost } = useContract()
    const [ixposts, setIxposts] = useState(null)
    const [liked, setLiked] = useState('fa fa-heart mr-3 text-red-500')
    const [disliked, setDisLiked] = useState('fa fa-heart mr-3')
    const lastTap = useRef(null)
    const touchTimeout = useRef(0)

    useEffect(() => {
        let setCache = false

        const getLikedPostData = async () => {
            if (account) {
                const response = await getLikedPost(account)
                if (response) { 
                    // setIxposts(response)
                                        
                    if (setCache) 
                        setCacheLikedPost(response)
                    
                    else {
                        if (response.length !== cacheLikedPost.length)
                            setCacheLikedPost(response)
                    }
                }
            }
        }

        if (cacheLikedPost.length === 0) {
            setCache = true
        }
        getLikedPostData()

    }, [account])
    
    return (
        <div className="w-full md:w-[80%] h-full flex flex-col md:items-start items-center justify-start">
            <div className="mt-40 flex flex-col items-start justify-start">
            {!cacheLikedPost && 
            <div className="flex flex-col items-start justify-start w-full">
                <p className="font-semibold text-lg md:text-2xl text-gray-100 w-full text-left">Loading...</p>
            </div>}

            {cacheLikedPost && cacheLikedPost.length === 0 && 
                <div className="flex flex-col items-start justify-start w-full">
                    <p className="font-semibold text-2xl">You have liked no IX posts yet!</p>
                    <p className="text-gray-01">Number of liked IX posts: 0</p>

                    <div className="w-full md:w-[500px] mt-4">
                        <img src="/assets/like.gif" alt="like" className="w-full h-full object-cover rounded-lg" />
                    </div>
                </div>}

            {cacheLikedPost && cacheLikedPost.length !== 0 && 
                <div>
                    <p className="font-semibold text-2xl">Your liked IX posts</p>
                    <p className="text-gray-01 mb-10 md:mb-14">Number of liked IX posts: {cacheLikedPost?.length}</p>
                </div>}
            

            {cacheLikedPost && cacheLikedPost.map(data => {
                    let id = uid.rnd()
                    return (
                        <div key={id} className="mb-24 flex flex-col items-start justify-start w-[100%] md:w-[60%]">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center justify-center gap-2">
                                    <i className="px-2 py-1 flex items-center justify-center text-sm border-[1px] rounded-full fa fa-user border-[#7b7b7b]" aria-hidden="true"></i>
                                    <p className="font-semibold">{data.accountAddress.slice(0, 6)}....{data.accountAddress.slice(37, 42)}</p>
                                </div>
                                <button>
                                    <i id={`upper-like-${id}`} className={liked} aria-hidden="true"></i>
                                </button>
                            </div>

                            <div className="relative flex flex-col items-center justify-center rounded-xl overflow-hidden w-full mt-3">

                                <LazyLoadImage 
                                    id={`img-container-${id}`}   
                                    onTouchStart={async (e) => {
                                        const currentTime = new Date().getTime();
                                        const tapLength = currentTime - lastTap.current;
                                        
                                        clearTimeout(touchTimeout.current);
                                        
                                        if (tapLength < 250 && tapLength > 0) {
                                            if (document.getElementById(`upper-like-${id}`).classList.length === 3) {
                                                document.getElementById(`upper-like-${id}`).className = liked
                                                document.getElementById(`like-${id}`).classList.add('animate-like')
                                                
                                                await likePost(account, data.imageURL, data.accountAddress, data.postId, data.title, data.content, data.time)
                                            }
                                            else {
                                                document.getElementById(`upper-like-${id}`).className = disliked
                                                document.getElementById(`like-${id}`).classList.remove('animate-like')

                                                await dislikePost(account, data.accountAddress,  data.postId)
                                            }            
                                        } 
                                        lastTap.current = currentTime;
                                    }}
                                    onTouchEnd={(e) => e.preventDefault()}
                                    onDoubleClick={async (e) => {
                                        if (document.getElementById(`upper-like-${id}`).classList.length === 3) {
                                            document.getElementById(`upper-like-${id}`).className = liked
                                            document.getElementById(`like-${id}`).classList.add('animate-like')
                                            
                                            await likePost(account, data.imageURL, data.accountAddress, data.postId, data.title, data.content, data.time)
                                        }
                                        else {
                                            document.getElementById(`upper-like-${id}`).className = disliked
                                            document.getElementById(`like-${id}`).classList.remove('animate-like')

                                            await dislikePost(account, data.accountAddress, data.postId)
                                        }
                                    }} 
                                    src={`https://api.codetabs.com/v1/proxy/?quest=${data.imageURL}`}
                                    alt="ixpost"
                                    effect="blur"
                                    height="auto"
                                    width="100%"
                                />
                                <i id={`like-${id}`} className="absolute text-red-500 fa fa-heart mr-3 opacity-0 transition-all transform-cpu" aria-hidden="true"></i>
                            </div>

                            <div className={`mt-5 rounded-xl px-4 py-3 ${data.title && data.content ? 'bg-[#2b2b2b]' : 'bg-transparent'} flex flex-col items-start justify-start w-full`}>
                                <p className="font-semibold text-lg">{data.title}</p>
                                <p className="md:text-sm mt-2 text-gray-300">{data.content}</p>
                            </div>

                            <div className="text-sm self-end mt-2">
                                {data.time}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Liked