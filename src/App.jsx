import { Outlet } from 'react-router-dom'
import { ContractProvider } from './context/contractContext'

function App() {

  return (
    <ContractProvider>
      <div className='relative w-full h-full bg-slate-950 text-white font-istok-web text-[0.85rem] md:text-[1rem] flex flex-col items-center justify-start'>
        <Outlet />
      </div>
    </ContractProvider>
  )
}

export default App
