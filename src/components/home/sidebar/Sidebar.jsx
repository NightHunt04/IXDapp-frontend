import { useNavigate } from "react-router-dom"

function Sidebar () {
    const navigate = useNavigate()

    return (
        <div className="hidden md:flex md:flex-col items-center justify-start md:sticky top-0 h-full md:w-[20%]">
            <div className="mt-32 flex flex-col items-center justify-start">
            <button onClick={() => navigate('post')} className="mt-5 px-8 py-2 rounded-lg bg-[#2e2e2e] shadow-lg flex items-center justify-center gap-2 font-semibold hover:bg-[#2e2e2e9e] transition-all">
                <i className="fa fa-plus" aria-hidden="true"></i>
                <p>Post IX</p>
            </button>

            <button onClick={() => navigate('liked')} className="mt-5 px-8 py-2 rounded-lg bg-[#2e2e2e] shadow-lg flex items-center justify-center gap-2 font-semibold hover:bg-[#2e2e2e9e] transition-all">
                <i className="fa fa-heart" aria-hidden="true"></i>
                <p>Liked IX</p>
            </button>

            <button onClick={() => navigate('account')} className="mt-5 px-8 py-2 rounded-lg bg-[#2e2e2e] shadow-lg flex items-center justify-center gap-2 font-semibold hover:bg-[#2e2e2e9e] transition-all">
                <i className="fa fa-user" aria-hidden="true"></i>
                <p>Account</p>
            </button>
            </div>
        </div>
    )
}

export default Sidebar