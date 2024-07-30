import { useEffect, useMemo, useState } from "react"
import { useContract } from "../../../context/contractContext"

function Account () {
    const { account, contract, TimestampConverter, uid } = useContract()
    const [postData, setPostData] = useState([])

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const postData = await contract.methods.getUserPosts(account).call({ from: account })
                setPostData([...postData].reverse())
            } catch (err) {
                console.error(err)
            }
        }

        if (contract)
            fetchPostData()
    }, [account, contract])

    return (
        <div className="w-full md:w-[80%] h-full flex flex-col md:items-start items-center justify-start">
            <div className="mt-36 flex flex-col items-start justify-start w-full">
                <div className="flex flex-col items-start justify-start px-4 py-3 md:px-9 md:py-8 backdrop-blur-sm bg-[#262626ce] w-full rounded-lg">
                    <p className="w-[96%] font-semibold"><span className="text-orange-500">MetaMask</span> ID : {account}</p>
                    <p className="text-xs md:text-sm text-gray-01 mt-2">IX posts created by your account are below</p>
                </div>

                <p className="mt-14 font-semibold text-lg">Your creations</p>
                <div className="mt-5 flex flex-col items-start justify-start overflow-y-auto w-full h-full">
                    {postData && postData.map(data => {
                        return (
                            <div key={uid.rnd()} className="mb-24 flex flex-col items-start justify-start w-[100%] md:w-[60%]">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center justify-center gap-2">
                                        <i className="px-2 py-1 flex items-center justify-center text-sm border-[1px] rounded-full fa fa-user border-[#7b7b7b]" aria-hidden="true"></i>
                                        <p className="font-semibold">{data.userAccount.slice(0, 24)}...</p>
                                    </div>
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
                </div>
            </div>
        </div>
    )
}

export default Account