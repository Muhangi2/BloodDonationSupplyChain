import { BigNumberish } from "ethers";

export enum Status {
  pending = 0,
  Active = 1,
  Shipped = 2,
  Fulfilled = 3
}

export interface Donor {
  donorName: string;
  age: BigNumberish;
  gender: string;
  Address: string;
  bloodGroup: string;
  bloodVolume: BigNumberish;
  bloodUniqueId: BigNumberish;
  donatedTime: BigNumberish;
}

export interface BloodDetails {
  bloodUniqueId: BigNumberish;
  bloodGroup: string;
  donatedTime: BigNumberish;
  currentStatus: Status;
}

export interface Supplier {
  supplierAddress: string;
  organizationName: string;
  phoneNumber: BigNumberish;
  addedTime: BigNumberish;
}

export interface Hospital {
  hospitalAddress: string;
  hospital_name: string;
  phoneNumber: BigNumberish;
  addedTime: BigNumberish;
}

export interface Patient {
  patientName: string;
  age: BigNumberish;
  Address: string;
  bloodGroup: string;
  usedBloodId: BigNumberish;
  usedTime: BigNumberish;
}

export interface BloodSupplyContract {
  owner: string;
  supplierId: BigNumberish;
  hospitalId: BigNumberish;
  suppliers: string[];
  hospitals: string[];
  patients: BigNumberish[];
  bloodUniqueId: BigNumberish;

  // Functions for Owner
  addSupplier(
    _supplierAddress: string,
    _supplierName: string,
    _phoneNumber: BigNumberish
  ): Promise<void>;

  addHospital(
    _hospitalAddress: string,
    _hospitalName: string,
    _phoneNumber: BigNumberish
  ): Promise<void>;

  // Functions for Suppliers
  addBlood(
    _donorName: string,
    _age: BigNumberish,
    _gender: string,
    _Address: string,
    _bloodGroup: string,
    _bloodVolume: BigNumberish
  ): Promise<void>;

  shipBloodToHospital(
    _blood_id: BigNumberish,
    _hospitalAddress: string
  ): Promise<void>;

  // Function for Hospitals
  giveBloodToPatients(
    _blood_id: BigNumberish,
    _patientName: string,
    _age: BigNumberish,
    _address: string,
    _bloodGroup: string
  ): Promise<void>;

  // Functions for Public
  getDataOfSuppliers(): Promise<Supplier[]>;
  getDataOfHospitals(): Promise<Hospital[]>;
  getDataOfBlood(): Promise<BloodDetails[]>;
  getBloodStatus(_id: BigNumberish): Promise<string>;

  // Functions only for owner
  getDataOfDonors(): Promise<Donor[]>;
  getDataOfPatients(): Promise<Patient[]>;
}