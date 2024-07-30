import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Signup () {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const handleToggleEyePassword = () => {
        setShowPassword(prev => !prev)
    }

    const handleToggleEyeConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev)
    }

    return (
        <div className='w-full relative overflow-hidden min-h-screen bg-dark-01 text-white font-istok-web text-xs md:text-sm flex flex-col items-center justify-center'>
            <div className="w-[70%] md:w-[35%] z-20 backdrop-blur-sm flex flex-col items-start justify-start rounded-lg shadow-2xl bg-gray-02 p-5">
                <div className="flex self-start items-center justify-center gap-2">
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                    <h3 className="text-[0.85rem] md:text-[1rem] font-bold">SignUp</h3>
                </div>

                <p className="w-full mt-2 text-gray-400 pb-2 border-b-[1px] border-[#333]"><span className="text-red-600">* </span>Fill the below instructions carefully, Mark.</p>

                <div className="flex flex-col relative items-center justify-center mt-8 w-full">
                    <input 
                        id="username"
                        type="text" 
                        placeholder="Pick any Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && document.getElementById('email').focus()}
                        className="peer bg-[#323232] outline-none border-[1px] border-[#545454] rounded-lg px-4 py-2 w-full placeholder-transparent focus:border-[#4f4dd0d8]"
                        />
                    <label htmlFor="username" className="absolute text-[13px] text-[#646464] px-2 left-3 -top-5 peer-placeholder-shown:text-[13px] 2xl:peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-2 transition-all duration-300">Pick any Username</label>
                </div>

                <div className="flex flex-col relative items-center justify-center mt-8 w-full">
                    <input 
                        id="email"
                        type="email" 
                        placeholder="Your Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && document.getElementById('password').focus()}
                        className="peer bg-[#323232] outline-none border-[1px] border-[#545454] shadow-md rounded-lg px-4 py-2 w-full placeholder-transparent focus:border-[#4f4dd0d8]"
                        />
                    <label htmlFor="email" className="absolute text-[13px] text-[#646464] px-2 left-3 -top-5 peer-placeholder-shown:text-[13px] 2xl:peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-2 transition-all duration-300">Your Email</label>
                </div>
                <p className="text-gray-400 mt-2">We will not be using your email anywhere</p>

                <div className="flex flex-col relative items-center justify-center mt-8 w-full">
                    <input 
                        id="password"
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Make a password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && document.getElementById('cpassword').focus()}
                        className="peer bg-[#323232] outline-none border-[1px] border-[#545454] shadow-md rounded-lg px-4 py-2 w-full placeholder-transparent focus:border-[#4f4dd0d8]"
                        />
                    <label htmlFor="password" className="absolute text-[13px] text-[#646464] px-2 left-3 -top-5 peer-placeholder-shown:text-[13px] 2xl:peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-2 transition-all duration-300">Make a password</label>
                    <button onClick={handleToggleEyePassword} className="text-gray-100 w-[10px] md:w-[30px] hover:opacity-85">
                        <i className={`absolute right-4 bottom-3 fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} aria-hidden="true"></i>
                    </button>
                </div>

                <div className="flex flex-col relative items-center justify-center mt-8 w-full">
                    <input 
                        id="cpassword"
                        type={showConfirmPassword ? 'text' : 'password'} 
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && document.getElementById('submit').click()}
                        className="peer bg-[#323232] outline-none border-[1px] border-[#545454] shadow-md rounded-lg px-4 py-2 w-full placeholder-transparent focus:border-[#4f4dd0d8]"
                        />
                    <label htmlFor="email" className="absolute text-[13px] text-[#646464] px-2 left-3 -top-5 peer-placeholder-shown:text-[13px] 2xl:peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-2 transition-all duration-300">Confirm password</label>
                    <button onClick={handleToggleEyeConfirmPassword} className="text-gray-100 w-[10px] md:w-[30px] hover:opacity-85">
                        <i className={`absolute right-4 bottom-3 fa ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`} aria-hidden="true"></i>
                    </button>
                </div>

                <p className="w-full text-gray-400 mt-5"><span className="text-red-600">* </span>Make sure you have <span className="text-orange-500">MetaMask</span> wallet. (you will be automatically connected with it, if you have so)</p>

                <div className="w-full mt-8 flex items-center justify-center gap-2">
                    <button id="submit" className="px-4 py-2 rounded-lg w-full shadow-lg bg-[#393939] font-semibold border-[1px] border-[#393939] transition-all hover:border-[#4f4dd0d8]">Submit</button>
                    <button className="px-4 py-2 rounded-lg w-full bg-transparent border-[1px] border-[#414141] font-semibold transition-all hover:border-[#4f4dd0d8]">Clear</button>
                </div>

                <p className="w-full text-center text-gray-400 mt-5"><span className="text-blue-500 hover:cursor-pointer" onClick={() => navigate('/login')}>Login</span> if already have an account?</p>
            </div>
        </div>
    )
}

export default Signup