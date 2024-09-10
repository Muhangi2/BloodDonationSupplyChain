"use server"
import { ethers } from "ethers";
import { addHospital,getDataOfHospitals,addSupplier } from "@/services/blockchain";

console.log(addHospital,"addHospitals")

export const handleAddHospital = async (formData:any) => {
     "use server"
    console.log("formdatatatatatatata", formData);
    console.log(formData,"formData")
    const hospitalAddress=formData.get('hospitalAddress')
    const hospitalName=formData.get('hospitalName')
    const phoneNumber= formData.get('phoneNumber')
  
    try {
      await addHospital(
        hospitalAddress,
        hospitalName, 
        phoneNumber
      );
      const updatedHospitalsData = await getDataOfHospitals();
    //   setHospitals(updatedHospitalsData);
    //   setNewHospital({
    //     hospitalAddress: '',
    //     hospitalName: '',
    //     phoneNumber: ''
    //   });
    } catch (error) {
      console.error("Error adding hospital:", error);
    }
  };

  export const handleAddsupplier=async(formData:any)=>{
    "use server"
    console.log("formdatatatatatatata", formData);
    console.log(formData,"formData")
    const supplierAddress=formData.get('supplierAddress')
    const supplierName=formData.get('supplierName')
    const phoneNumber= formData.get('phoneNumber')
    console.log(supplierAddress)
    console.log(supplierName) 
    console.log(phoneNumber)
    try {
        await addSupplier(
            supplierAddress,supplierName,phoneNumber
        )
    } catch (error) {
        console.log("error  adding donor")
    }
  }