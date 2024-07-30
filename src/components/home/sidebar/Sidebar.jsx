import { useNavigate } from "react-router-dom"
import { useContract } from "../../../context/contractContext"

function Sidebar () {
    const navigate = useNavigate()
    const { account } = useContract()

    return (
        <div className="hidden md:flex md:flex-col items-center justify-start md:sticky top-0 h-full md:w-[20%]">
            <div className="mt-32 flex flex-col items-center justify-start text-sm border-[1px] px-4 py-3 border-[#3c3c3c] rounded-lg w-full">
                <button onClick={() => navigate('post')} className="px-8 py-2 rounded-md w-full bg-[#2e2e2e] shadow-lg flex items-center justify-center gap-2 font-semibold hover:bg-[#2e2e2e9e] transition-all">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    <p>Post IX</p>
                </button>

                <button onClick={() => navigate('liked')} className="mt-3 px-8 py-2 rounded-md w-full bg-[#2e2e2e] shadow-lg flex items-center justify-center gap-2 font-semibold hover:bg-[#2e2e2e9e] transition-all">
                    <i className="fa fa-heart" aria-hidden="true"></i>
                    <p>Liked IX</p>
                </button>

                <button onClick={() => navigate(`account/${account}`)} className="mt-3 px-8 py-2 rounded-md w-full bg-[#2e2e2e] shadow-lg flex items-center justify-center gap-2 font-semibold hover:bg-[#2e2e2e9e] transition-all">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <p>Account</p>
                </button>
            </div>

            <div className="mt-5 flex flex-col items-center justify-start text-sm border-[1px] px-4 py-3 border-[#3c3c3c] rounded-lg w-full">
                <p className="font-semibold">About me</p>
                <div className="mt-2 flex text-lg items-center justify-center gap-4">
                    <a href="https://www.github.com/NightHunt04" target="_blank" className="hover:text-gray-600 transition-all">
                        <i className="fa-brands fa-square-github"></i>
                    </a>

                    <a href="" className="hover:text-pink-600 transition-all">
                        <i className="fa-brands fa-square-instagram"></i>
                    </a>

                    <a href="" className="hover:text-blue-600 hover:opacity-80 transition-all">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar