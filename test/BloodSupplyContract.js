const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BloodSupply Contract", function () {
  let BloodSupply, bloodSupply, owner, addr1, addr2, addr3, addr4;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    BloodSupply = await ethers.getContractFactory("BloodSupplyContract");
    bloodSupply = await BloodSupply.deploy();
    await bloodSupply.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(await bloodSupply.getAddress()).to.be.properAddress;
      console.log("Deployed Contract Address:", await bloodSupply.getAddress());
    });
  });

  describe("Hospital Management", function () {
    beforeEach(async function () {
      await bloodSupply.addHospital(addr2.address, "Norvic Hospital", 9016711000);
      await bloodSupply.addHospital(addr3.address, "Bir Hospital", 9016711111);
    });

    it("Should add hospitals correctly", async function () {
      const hospitalList = await bloodSupply.getDataOfHospitals();
    
      expect(hospitalList[0].hospitalAddress).to.equal(addr2.address);
      expect(hospitalList[0].hospital_name).to.equal("Norvic Hospital");
      expect(hospitalList[0].phoneNumber).to.equal(9016711000);
      expect(hospitalList[1].hospitalAddress).to.equal(addr3.address);
      expect(hospitalList[1].hospital_name).to.equal("Bir Hospital");
      expect(hospitalList[1].phoneNumber).to.equal(9016711111);
      
    });
  });

  describe("Supplier Management", function () {
    beforeEach(async function () {
      await bloodSupply.addSupplier(addr2.address, "Lions club", 9816711000);
      await bloodSupply.addSupplier(addr3.address, "Luis blood suppliers", 9816713333);
    });

    it("Should add suppliers correctly", async function () {
      const suppliersList = await bloodSupply.getDataOfSuppliers();
      expect(suppliersList[0].supplierAddress).to.equal(addr2.address);
      expect(suppliersList[0].organizationName).to.equal("Lions club");
      expect(suppliersList[0].phoneNumber).to.equal(9816711000);
      expect(suppliersList[1].supplierAddress).to.equal(addr3.address);
      expect(suppliersList[1].organizationName).to.equal("Luis blood suppliers");
      expect(suppliersList[1].phoneNumber).to.equal(9816713333);
    });
  });

  describe("Blood Management", function () {
    beforeEach(async function () {
      await bloodSupply.addSupplier(addr2.address, "Tiger club", 9816713333);
    });

    it("Should add blood correctly", async function () {
      await bloodSupply.connect(addr2).addBlood("Subash panthi", 24, "male", "teku", "0+ve", 800);
      const donorDetails = await bloodSupply.getDataOfDonors();
      expect(donorDetails[0].donorName).to.equal("Subash panthi");
      expect(donorDetails[0].age).to.equal(24);
      expect(donorDetails[0].gender).to.equal("male");

      const bloodDetails = await bloodSupply.getDataOfBlood();
      expect(bloodDetails[0].bloodUniqueId).to.equal(0);
      expect(bloodDetails[0].bloodGroup).to.equal("0+ve");
    });

    it("Should ship blood correctly", async function () {
      await bloodSupply.addHospital(addr3.address, "Bir Hospital", 9016713300);
      await bloodSupply.connect(addr2).addBlood("Subash panthi", 24, "male", "teku", "A+ve", 800);
      await bloodSupply.connect(addr2).shipBloodToHospital(0, addr3.address);
      expect(await bloodSupply.getBloodStatus(0)).to.equal("Shipped");
    });

    it("Should give blood to patients correctly", async function () {
      await bloodSupply.addHospital(addr3.address, "Bir Hospital", 9016713311);
      await bloodSupply.connect(addr2).addBlood("Subash panthi", 24, "male", "teku", "A+ve", 800);
      await bloodSupply.connect(addr2).shipBloodToHospital(0, addr3.address);
      await bloodSupply.connect(addr3).giveBloodToPatients(0, "aman", 24, "ktm", "A+ve");
      const patientsList = await bloodSupply.getDataOfPatients();
      expect(patientsList[0].patientName).to.equal("aman");
      expect(patientsList[0].age).to.equal(24);
      expect(await bloodSupply.getBloodStatus(0)).to.equal("Fulfilled");
    });
  });

  describe("Access Control", function () {
    it("Should revert when non-owner tries to add supplier", async function () {
      await expect(bloodSupply.connect(addr2).addSupplier(addr3.address, "Luis blood suppliers", 9016713300))
        .to.be.revertedWith("you are not a Owner !!");
    });

    it("Should revert when non-owner tries to add hospital", async function () {
      await expect(bloodSupply.connect(addr2).addHospital(addr3.address, "Bir Hospital", 9016713300))
        .to.be.revertedWith("you are not a Owner !!");
    });

    it("Should revert when non-owner tries to get donor data", async function () {
      await expect(bloodSupply.connect(addr3).getDataOfDonors())
        .to.be.revertedWith("you are not a Owner !!");
    });

    it("Should revert when non-supplier tries to add blood", async function () {
      await expect(bloodSupply.connect(addr1).addBlood("luis roy", 34, "male", "Usa", "0+ve", 800))
        .to.be.revertedWith("You are not a Authorized Supplier !!");
    });

    it("Should revert when shipping to non-listed hospital", async function () {
      await bloodSupply.addSupplier(addr1.address, "Luis blood suppliers", 9016666666);
      await bloodSupply.connect(addr1).addBlood("Subash panthi", 24, "male", "teku", "A+ve", 800);
      await expect(bloodSupply.connect(addr1).shipBloodToHospital(0, addr2.address))
        .to.be.revertedWith('No permision to Ship Blood Here !!');
    });
  });
});