import Text from "@carefully-coded/react-text-gradient"
import { useNavigate } from "react-router-dom" 
import { useContract } from "../../context/contractContext"

function Navbar () {
    const navigate = useNavigate()
    const { account } = useContract()

    return (
        <div className="w-full px-11 md:px-96 py-4 md:py-6 flex top-0 z-30 fixed items-center backdrop-blur-sm bg-[#020617a1]  justify-between border-b-[1px] border-[#303030]">
            <div onClick={() => {
                navigate('/')
                window.location.reload()
            }} className="hover:cursor-pointer">
                <h2 className="font-bold text-3xl">
                    IX 
                    <span>
                     <Text gradient={{ from: '#FFCB9C', to: '#FF5C00'}}>DApp</Text>
                    </span>
                </h2>
            </div>

            <div className="flex flex-col items-end justify-center gap-1">
                <div className="flex items-center justify-center gap-1 text-xs md:text-sm">
                    <p className="font-semibold">MetaMask </p>
                    <img src="/assets/circle.png" className="w-[10px] h-[10xp] object-cover md:hidden" />
                    <p className="hidden md:block p-1 text-orange-600 bg-[#2f2f2fa1] rounded-xl">{account}</p>
                </div>
                <p className="text-xs md:text-sm text-gray-01">Use <span className="text-pink-500">Sepolia (eth)</span> testnet</p>
            </div>
        </div>
    )
}

export default Navbar