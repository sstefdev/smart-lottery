const fs = require("fs");
const path = require("path");
const { ethers, network } = require("hardhat");

const FRONTEND_ABI_FILE = path.join(__dirname, "../client/constants/abi.json");
const FRONTEND_ADDRESSES_FILE = path.join(
  __dirname,
  "../client/constants/contractAddresses.json"
);

module.exports = async () => {
  const shouldFrontendUpdate = process.env.UPDATE_FRONTEND;

  if (shouldFrontendUpdate) {
    console.log("Updating frontend...");
    updateAbi();
    updateContractAddresses();
  }
};

const updateAbi = async () => {
  const raffle = await ethers.getContract("Raffle");
  fs.writeFileSync(
    FRONTEND_ABI_FILE,
    raffle.interface.format(ethers.utils.FormatTypes.json)
  );
};

const updateContractAddresses = async () => {
  const raffle = await ethers.getContract("Raffle");
  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONTEND_ADDRESSES_FILE, "utf-8")
  );
  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(raffle.address)) {
      currentAddresses[chainId].push(raffle.address);
    }
  } else {
    currentAddresses[chainId] = [raffle.address];
  }
  fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify(currentAddresses));
};

module.exports.tags = ["all", "frontend"];
