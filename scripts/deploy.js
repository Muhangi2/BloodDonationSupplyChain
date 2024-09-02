const hre = require("hardhat");

async function main() {
  const BloodSupplyContract = await hre.ethers.getContractFactory("BloodSupplyContract");
  const deployedBloodSupplyContract = await BloodSupplyContract.deploy();

  await deployedBloodSupplyContract.waitForDeployment();

  console.log("BloodSupply Contract Address:", await deployedBloodSupplyContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});