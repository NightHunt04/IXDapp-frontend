import { useNavigate } from "react-router-dom"

function MobileBottomBar () {
    const navigate = useNavigate()

    return (
        <div className="fixed md:hidden bottom-0 backdrop-blur-sm bg-[#0a0a0ace] flex items-center justify-between w-full px-16 py-4">
            <button onClick={() => navigate('liked')}>
                <i className="fa fa-heart" aria-hidden="true"></i>
            </button>

            <button onClick={() => navigate('post')} className="text-2xl font-semibold">
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>

            <button onClick={() => navigate('account')}>
                <i className="fa fa-user" aria-hidden="true"></i>
            </button>
        </div>
    )
}

export default MobileBottomBar