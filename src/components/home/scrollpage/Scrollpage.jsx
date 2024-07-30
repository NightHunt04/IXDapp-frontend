import { useState, useEffect } from "react"
import { useContract } from "../../../context/contractContext"
import ShortUniqueId from "short-unique-id"

function Scrollpage () {
    const uid = new ShortUniqueId({ length: 8 })
    const { account, contract } = useContract()
    const [postData, setPostData] = useState([])

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const postData = await contract.methods.getPosts().call({ from: account })
                setPostData([...postData].reverse())
                console.log(postData)
            } catch (err) {
                console.error(err)
            }
        }

        if (contract)
            fetchPostData()
    }, [account, contract])

    const TimestampConverter = ({ timestamp }) => {
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
    }

    return (
        <div className="w-full md:w-[80%] h-full flex flex-col md:items-start items-center justify-start">
            <div className="my-40 h-full overflow-y-auto">
                {postData && postData.map(data => {
                    return (
                        <div key={uid.rnd()} className="mb-24 flex flex-col items-start justify-start w-[100%] md:w-[60%]">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center justify-center gap-2">
                                    <i className="px-2 py-1 flex items-center justify-center text-sm border-[1px] rounded-full fa fa-user border-[#7b7b7b]" aria-hidden="true"></i>
                                    <p className="font-semibold">{data.userAccount.slice(0, 24)}...</p>
                                </div>
                                <i className="fa fa-heart mr-3" aria-hidden="true"></i>
                            </div>

                            <div className="flex flex-col items-center justify-center rounded-xl overflow-hidden w-full mt-3">
                                <img src={`https://api.codetabs.com/v1/proxy/?quest=${data.img_url}`} alt="NFT" className="w-full h-full object-cover rounded-xl" />
                            </div>

                            <div className="mt-5 rounded-xl px-4 py-3 bg-[#2b2b2b] flex flex-col items-start justify-start w-full">
                                <p className="font-semibold text-lg">{data.title}</p>
                                <p className="mt-2 text-gray-300">{data.content}</p>
                            </div>

                            <div className="text-sm self-end mt-2">
                                {TimestampConverter({timestamp: data.time})}
                            </div>
                        </div>
                    )
                })}


                {/* <div className="mt-28 flex flex-col items-start justify-start w-[100%] md:w-[60%]">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center justify-center gap-2">
                            <i className="px-2 py-1 flex items-center justify-center text-sm border-[1px] rounded-full fa fa-user border-[#7b7b7b]" aria-hidden="true"></i>
                            <p className="font-semibold">admin1334</p>
                        </div>
                        <i className="fa fa-heart mr-3" aria-hidden="true"></i>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-xl overflow-hidden w-full mt-3">
                        <img src="https://api.codetabs.com/v1/proxy/?quest=https://files.kastg.xyz/tmp/th51/j8fib5vtwoi.png" alt="NFT" className="w-full h-full object-cover rounded-xl" />
                    </div>

                    <div className="mt-5 rounded-xl px-4 py-3 bg-[#2b2b2b] flex flex-col items-start justify-start">
                        <p className="font-semibold text-lg">Brain is not braining anymore</p>
                        <p className="mt-2 text-gray-300">Today is not tomorrow and tomorrow is not today, aand yesterday was not today and today is not yesterday.</p>
                    </div>

                    <div className="text-sm self-end mt-2">
                        18, June, 2026
                    </div>
                </div>


                <div className="mt-28 flex flex-col items-start justify-start w-[100%] md:w-[60%]">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center justify-center gap-2">
                            <i className="px-2 py-1 flex items-center justify-center text-sm border-[1px] rounded-full fa fa-user" aria-hidden="true"></i>
                            <p className="font-semibold">admin1334</p>
                        </div>
                        <i className="fa fa-heart mr-3" aria-hidden="true"></i>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-xl overflow-hidden w-full mt-3">
                        <img src="https://api.codetabs.com/v1/proxy/?quest=https://files.kastg.xyz/tmp/th51/2pxtn1k01ed.png" alt="NFT" className="w-full h-full object-cover rounded-xl" />
                    </div>

                    <div className="mt-5 rounded-xl px-4 py-3 bg-[#2b2b2b] flex flex-col items-start justify-start">
                        <p className="font-semibold text-lg">Brain is not braining anymore</p>
                        <p className="mt-2 text-gray-300">Today is not tomorrow and tomorrow is not today, aand yesterday was not today and today is not yesterday.</p>
                    </div>

                    <div className="text-sm self-end mt-2">
                        18, June, 2026
                    </div>
                </div>


                <div className="mt-28 flex flex-col items-start justify-start w-[100%] md:w-[60%]">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center justify-center gap-2">
                            <i className="px-2 py-1 flex items-center justify-center text-sm border-[1px] rounded-full fa fa-user" aria-hidden="true"></i>
                            <p className="font-semibold">admin1334</p>
                        </div>
                        <i className="fa fa-heart mr-3" aria-hidden="true"></i>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-xl overflow-hidden w-full mt-3">
                        <img src="/assets/k9hxmgmhb6.png" alt="NFT" className="w-full h-full object-cover rounded-xl" />
                    </div>

                    <div className="mt-5 rounded-xl px-4 py-3 bg-[#2b2b2b] flex flex-col items-start justify-start">
                        <p className="font-semibold text-lg">Brain is not braining anymore</p>
                        <p className="mt-2 text-gray-300">Today is not tomorrow and tomorrow is not today, aand yesterday was not today and today is not yesterday.</p>
                    </div>

                    <div className="text-sm self-end mt-2">
                        18, June, 2026
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default Scrollpage