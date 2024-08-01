import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import MobileBottomBar from "./sidebar/MobileBottomBar"
import Sidebar from "./sidebar/Sidebar"
import { useNavigate } from 'react-router-dom'
import { useContract } from "../../context/contractContext"
// import { Cookies } from 'react-cookie'

function Home () {
    const { noWeb3 } = useContract()
    const navigate = useNavigate()
    // const cookies = new Cookies()

    // useEffect(() => {
    //     if (!cookies.get('_token'))
    //     navigate('/login')
    // }, [cookies, navigate])

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-start">
            {noWeb3 && 
            <div className="px-4 py-3 w-full h-full fixed z-50 shadow-lg overflow-hidden border-red-500 border-[1px] bg-[#282828]">
                <p>No Web3 was found!</p>
                <p>Install MetaMask!</p>
            </div>}

            <Navbar/>
            <div className="relative px-11 md:px-80 w-full min-h-screen flex items-start justify-start md:gap-24">
                <Sidebar />
                <Outlet />
            </div>
            <MobileBottomBar />
        </div>
    )
}

export default Home
































