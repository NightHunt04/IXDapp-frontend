import { createContext, useContext, useEffect, useState } from "react"
import ContractABI from '../../ContractABI.json'
import Web3 from 'web3'
import ShortUniqueId from "short-unique-id"

const ContractContext = createContext(null)

export const ContractProvider = (props) => {
    const uid = new ShortUniqueId({ length: 8 })
    const [web3, setWeb3] = useState(null)
    const [contract, setContract] = useState(null)
    const [account, setAccount] = useState()
    const [noWeb3, setNoWeb3] = useState(false)
    const ContractAddress = import.meta.env.VITE_APP_CONTRACT_ADDRESS

    const TimestampConverter = ({ timestamp }) => {
        const timeInSeconds = Number(timestamp.toString().replace('n', ''));
      
        const date = new Date(timeInSeconds * 1000); 

        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        })
      
        return formattedDate
    }

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
        <ContractContext.Provider value={{web3, contract, account, noWeb3, TimestampConverter, uid}}>
            {props.children}
        </ContractContext.Provider>
    )
}

export const useContract = () => {
    return useContext(ContractContext)
}