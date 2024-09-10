import { ethers } from "ethers";
import { getDataOfHospitals } from "@/services/blockchain";

export const  HospitalData=async()=>{
    const data =await getDataOfHospitals();

    console.log(data,"datatatatat")
}