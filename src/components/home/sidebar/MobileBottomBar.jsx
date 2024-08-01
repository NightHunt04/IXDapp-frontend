import { useNavigate } from "react-router-dom"
import { useContract } from "../../../context/contractContext"

function MobileBottomBar () {
    const navigate = useNavigate()
    const { account } = useContract()

    return (
        <div className="fixed md:hidden bottom-0 backdrop-blur-sm bg-[#020617a1] flex items-center justify-between w-full px-16 py-4">
            <button onClick={() => navigate('liked')}>
                <i className="fa fa-heart" aria-hidden="true"></i>
            </button>

            <button onClick={() => navigate('post')} className="text-2xl font-semibold">
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>

            <button onClick={() => navigate(`account/${account}`)}>
                <i className="fa fa-user" aria-hidden="true"></i>
            </button>
        </div>
    )
}

export default MobileBottomBar