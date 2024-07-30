import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useContract, ContractProvider } from './context/contractContext'

function App() {
  // const { account } = useContract()

  return (
    <ContractProvider>
      <div className='relative w-full min-h-screen bg-dark-01 text-white font-istok-web text-[0.85rem] md:text-[1rem] flex flex-col items-center justify-start'>
        <Outlet />
      </div>
    </ContractProvider>
  )
}

export default App
