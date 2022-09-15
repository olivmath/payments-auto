import { ethernal, ethers } from "hardhat"

async function main() {
    const [owner] = await ethers.getSigners()

    const Lib = await ethers.getContractFactory("Array")
    const Array = await Lib.deploy()

    const AutoPay = await ethers.getContractFactory("AutoPay", {
        libraries: { Array: Array.address }
    })
    const Pay = await AutoPay.deploy()

    console.log("Library address:", Array.address)
    console.log("Contract address:", Pay.address)
    console.log("Owner address:", owner.address)

    await ethernal.push({
        name: "AutoPay",
        address: Pay.address
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
