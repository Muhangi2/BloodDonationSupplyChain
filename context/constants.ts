import BloodSupplyContract from "./BloodSupplyContract.json"

export const CONTRACT_ABI = BloodSupplyContract.abi
export const CONTRACT_ADDRESS = "0x77f75A371210DD626bf256a1C45aa58E330f6B0C"


// export const CONTRACT_BYTECODE = ER20Generator.bytecode;

export const BLOOD_SUPPLY_TYPE = {
    REQUEST: 0,
    DONATION: 1
}
export const BLOOD_SUPPLY_STATUS = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2
}
export const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export const BLOOD_SUPPLY_STATUS_TEXT = {
    0: "Pending",
    1: "Approved",
    2: "Rejected"
    }

export const BLOOD_SUPPLY_TYPE_TEXT = {
    0: "Request",
    1: "Donation"
    }

export const BLOOD_SUPPLY_STATUS_COLOR = {
    0: "primary",
    1: "success",
    2: "danger"
    }

export const BLOOD_SUPPLY_TYPE_COLOR = {
    0: "warning",
    1: "info"
    }

export const BLOOD_SUPPLY_STATUS_FILTER = [
    { text: "Pending", value: 0 },
    { text: "Approved", value: 1 },
    { text: "Rejected", value: 2 }
]

export const BLOOD_SUPPLY_TYPE_FILTER = [
    { text: "Request", value: 0 },
    { text: "Donation", value: 1 }
]

export const BLOOD_SUPPLY_STATUS_FILTER_TEXT = {
    0: "Pending",
    1: "Approved",
    2: "Rejected"
}



