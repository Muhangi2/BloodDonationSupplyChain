import {ethers} from 'ethers'
import { CONTRACT_ADDRESS } from '@/context/constants'
import { CONTRACT_ABI } from '@/context/constants'

const toWei = (num: number) => ethers.parseEther(num.toString())
const fromWei = (num: number) => ethers.formatEther(num)

let ethereum:any
let tx:any

if (typeof window !== "undefined")ethereum =(window as any).ethereum
//initilize global actions

// const {setEvent,setTickets}=globalActions

//get ethereum contracts
const getEthereumContracts=async()=>{
    const accounts = await ethereum?.request?.({ method: 'eth_accounts' })
    if (accounts?.length > 0) {
        const provider = new ethers.BrowserProvider(ethereum)
        const signer = await provider.getSigner()
        const contracts = new ethers.Contract( CONTRACT_ADDRESS, CONTRACT_ABI , signer)
    
        return contracts
      } else {
        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
        const wallet = ethers.Wallet.createRandom()
        const signer = wallet.connect(provider)
        const contracts = new ethers.Contract(CONTRACT_ADDRESS,  CONTRACT_ABI, signer)
    
        return contracts
      }

}