
"use client"
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/context/constants'
import { Donor, BloodDetails, Supplier, Hospital, Patient, BloodSupplyContract } from '@/utils/types.dt'

// const toWei = (num: number) => ethers.parseEther(num.toString())
// const fromWei = (num: number) => ethers.formatEther(num)

let ethereum: any
let tx: any

if (typeof window !== "undefined") ethereum = (window as any).ethereum
console.log(ethereum,"ethereum")

// Initialize global actions if needed
// const { setEvent, setTickets } = globalActions

// Get Ethereum contracts

const getEthereumContracts = async () => {
    // const provider = new ethers.providers.Web3Provider(ethereum);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
    // return contract ;


    const accounts = await ethereum?.request?.({ method: 'eth_accounts' })

    if (accounts?.length > 0) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer =  provider.getSigner()
      const contracts = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
  
      return contracts
    } else {
      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
      const wallet = ethers.Wallet.createRandom()
      const signer = wallet.connect(provider)
      const contracts = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
  
      return contracts
    }
  
}

// Function to add a new supplier
export const addSupplier = async (_supplierAddress: string, _supplierName: string, _phoneNumber: number) => {
  const contract = await getEthereumContracts()
  tx = await contract.addSupplier(_supplierAddress, _supplierName, _phoneNumber)
  await tx.wait()
  console.log("Supplier added:", tx)
}

// Function to add a new hospital
export const addHospital = async (_hospitalAddress: string, _hospitalName: string, _phoneNumber: number) => {
  const contract = await getEthereumContracts()
  tx = await contract.addHospital(_hospitalAddress, _hospitalName, _phoneNumber)
  await tx.wait()
  console.log("Hospital added:", tx)
}

// Function to add blood details
export const addBlood = async (_donorName: string, _age: number, _gender: string, _address: string, _bloodGroup: string, _bloodVolume: number) => {
  const contract = await getEthereumContracts()
  tx = await contract.addBlood(_donorName, _age, _gender, _address, _bloodGroup, _bloodVolume)
  await tx.wait()
  console.log("Blood added:", tx)
}

// Function to ship blood to hospital
export const shipBloodToHospital = async (_blood_id: number, _hospitalAddress: string) => {
  const contract = await getEthereumContracts()
  tx = await contract.shipBloodToHospital(_blood_id, _hospitalAddress)
  await tx.wait()
  console.log("Blood shipped:", tx)
}

// Function to give blood to patients
export const giveBloodToPatients = async (_blood_id: number, _patientName: string, _age: number, _address: string, _bloodGroup: string) => {
  const contract = await getEthereumContracts()
  tx = await contract.giveBloodToPatients(_blood_id, _patientName, _age, _address, _bloodGroup)
  await tx.wait()
  console.log("Blood given to patient:", tx)
}

// Fetch data of suppliers
export const getDataOfSuppliers = async (): Promise<Supplier[]> => {
  const contract = await getEthereumContracts()
  const suppliers = await contract.getDataOfSuppliers()
  return suppliers
}

// Fetch data of hospitals
export const getDataOfHospitals = async (): Promise<Hospital[]> => {
  const contract = await getEthereumContracts()
  const hospitals = await contract.getDataOfHospitals()
  return hospitals
}

// Fetch data of blood details
export const getDataOfBlood = async (): Promise<BloodDetails[]> => {
  const contract = await getEthereumContracts()
  const bloodDetails = await contract.getDataOfBlood()
  return bloodDetails
}

// Fetch status of blood
export const getBloodStatus = async (_id: number): Promise<string> => {
  const contract = await getEthereumContracts()
  const status = await contract.getBloodStatus(_id)
  return status
}

// Fetch data of donors (only owner can call this function)
export const getDataOfDonors = async (): Promise<Donor[]> => {
  const contract = await getEthereumContracts()
  const donors = await contract.getDataOfDonors()
  return donors
}

// Fetch data of patients (only owner can call this function)
export const getDataOfPatients = async (): Promise<Patient[]> => {
  const contract = await getEthereumContracts()
  const patients = await contract.getDataOfPatients()
  return patients
}
