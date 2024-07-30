import { createContext, useContext, useEffect, useState } from "react"
import ContractABI from '../../ContractABI.json'
import Web3 from 'web3'

const ContractContext = createContext(null)

export const ContractProvider = (props) => {
    const [web3, setWeb3] = useState(null)
    const [contract, setContract] = useState(null)
    const [account, setAccount] = useState()
    const [noWeb3, setNoWeb3] = useState(false)
    const ContractAddress = import.meta.env.VITE_APP_CONTRACT_ADDRESS

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum)

                try {
                    const account = await window.ethereum.request({ method: 'eth_requestAccounts' })
                   
                    setWeb3(web3Instance) 
                    setAccount(account[0])

                    const contractInstance = new web3Instance.eth.Contract(ContractABI, ContractAddress)

                    setContract(contractInstance)
                } catch (err) {
                    console.error(err)
                }
            } else if (window.web3) {
                setWeb3(new Web3(window.web3.currentProvider))
            } else {
                setNoWeb3(true)
                console.log('Please use MetaMask')
            }
        }

        initWeb3()
    }, [])

    return (
        <ContractContext.Provider value={{web3, contract, account, noWeb3}}>
            {props.children}
        </ContractContext.Provider>
    )
}

export const useContract = () => {
    return useContext(ContractContext)
}