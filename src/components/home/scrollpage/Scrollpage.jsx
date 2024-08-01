import { useState, useEffect, useCallback, useRef } from "react"
import { useContract } from "../../../context/contractContext"
import ShortUniqueId from "short-unique-id"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { likePost } from "../../../utils/likePost"
import { dislikePost } from "../../../utils/dislikePost"
import { getLikedPost } from "../../../utils/getLikedPost"

function Scrollpage () {
    const uid = new ShortUniqueId({ length: 8 })
    const { account, contract } = useContract()
    const [postData, setPostData] = useState(null)
    const [liked, setLiked] = useState('fa fa-heart mr-3 text-red-500')
    const [disliked, setDisLiked] = useState('fa fa-heart mr-3')
    const [ixposts, setIxposts] = useState([])
    const lastTap = useRef(null)
    const touchTimeout = useRef(0)

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const postData = await contract.methods.getPosts().call({ from: account })
                setPostData([...postData].reverse())
            } catch (err) {
                console.error(err)
            }
        }

        if (contract)
            fetchPostData()
    }, [account, contract])

    useEffect(() => {
        const getLikedPostData = async () => {
            if (account) {
                const response = await getLikedPost(account)
                if (response)
                    setIxposts(response)
            }
        }

        getLikedPostData()
    }, [account])

    const TimestampConverter =useCallback(({ timestamp }) => {
        const timeInSeconds = Number(timestamp.toString().replace('n', ''));
      
        const date = new Date(timeInSeconds * 1000); 

        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        })
      
        return formattedDate
    }, [])

    return (
        <div className="w-full md:w-[80%] h-full flex flex-col md:items-start items-center justify-start">
            <div className="my-40 h-full overflow-y-auto">
            {!postData && 
                <div className="overflow-hidden flex flex-col items-start justify-start w-full">
                    <p className="font-semibold text-2xl text-gray-100">Loading...</p>
                </div>}
                {postData && postData.map(data => {
                    let id = uid.rnd()
                    return (
                        <div key={id} className="mb-24 flex flex-col items-start justify-start w-[100%] md:w-[60%]">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center justify-center gap-2">
                                    <i className="px-2 py-1 flex items-center justify-center text-sm border-[1px] rounded-full fa fa-user border-[#7b7b7b]" aria-hidden="true"></i>
                                    <p className="font-semibold">{data.userAccount.slice(0, 6)}....{data.userAccount.slice(37, 42)}</p>
                                </div>
                                <button onClick={async (e) => {
                                    if (e.target.classList.length === 3) {
                                        e.target.className = liked
                                        document.getElementById(`like-${id}`).classList.add('animate-like')

                                        await likePost(account, data.img_url, data.userAccount, TimestampConverter({timestamp: data.id}), data.title, data.content, TimestampConverter({timestamp: data.time}))
                                    }
                                    else {
                                        e.target.className = disliked
                                        document.getElementById(`like-${id}`).classList.remove('animate-like')

                                        await dislikePost(account, data.userAccount,  TimestampConverter({timestamp: data.id}))
                                    }
                                }}>
                                    <i id={`upper-like-${id}`} className={`${ixposts && ixposts.find(post => post.accountAddress === data.userAccount && post.postId === TimestampConverter({timestamp: data.id})) ? liked : disliked}`} aria-hidden="true"></i>
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
                                                
                                                await likePost(account, data.img_url, data.userAccount, TimestampConverter({timestamp: data.id}), data.title, data.content, TimestampConverter({timestamp: data.time}))
                                            }
                                            else {
                                                document.getElementById(`upper-like-${id}`).className = disliked
                                                document.getElementById(`like-${id}`).classList.remove('animate-like')

                                                await dislikePost(account, data.userAccount,  TimestampConverter({timestamp: data.id}))
                                            }            
                                            console.log('double')
                                        } 
                                        lastTap.current = currentTime;
                                    }}
                                    onTouchEnd={(e) => e.preventDefault()}
                                    onDoubleClick={async (e) => {
                                        if (document.getElementById(`upper-like-${id}`).classList.length === 3) {
                                            document.getElementById(`upper-like-${id}`).className = liked
                                            document.getElementById(`like-${id}`).classList.add('animate-like')
                                            
                                            await likePost(account, data.img_url, data.userAccount, TimestampConverter({timestamp: data.id}), data.title, data.content, TimestampConverter({timestamp: data.time}))
                                        }
                                        else {
                                            document.getElementById(`upper-like-${id}`).className = disliked
                                            document.getElementById(`like-${id}`).classList.remove('animate-like')

                                            await dislikePost(account, data.userAccount,  TimestampConverter({timestamp: data.id}))
                                        }
                                    }} 
                                    src={`https://api.codetabs.com/v1/proxy/?quest=${data.img_url}`}
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
                                {TimestampConverter({timestamp: data.time})}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Scrollpage