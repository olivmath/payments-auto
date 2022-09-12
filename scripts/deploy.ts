import { ethernal, ethers } from "hardhat"

async function main() {
    const [owner] = await ethers.getSigners()

    const AutoPay = await ethers.getContractFactory("AutoPay")
    const Pay = await AutoPay.deploy()

    // await ethernal.push({
    //     name: "Pay",
    //     address: Pay.address
    // })

    console.log("Contract address:", Pay.address)
    console.log("Owner address:", owner.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
