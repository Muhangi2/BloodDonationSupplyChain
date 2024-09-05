import BloodSupplyContract from "./BloodSupplyContract.json"

export const CONTRACT_ABI = BloodSupplyContract.abi
export const CONTRACT_ADDRESS = "0x77f75A371210DD626bf256a1C45aa58E330f6B0C"





export const BLOOD_SUPPLY_STATUS = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2
}

export const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]