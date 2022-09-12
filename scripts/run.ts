import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ethernal, ethers } from "hardhat"

async function main() {
    let owner: SignerWithAddress
    let manager: SignerWithAddress
    let senior: SignerWithAddress
    let midLevel: SignerWithAddress
    let junior: SignerWithAddress
    let addrs: SignerWithAddress[]
    ;[owner, manager, senior, midLevel, junior, ...addrs] =
        await ethers.getSigners()

    const AutoPay = await ethers.getContractAt(
        "AutoPay",
        "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    )

    // for (let i = 0; i < addrs.length; i++) {
    //     await addrs[i].sendTransaction({
    //         to: owner.address,
    //         value: ethers.utils.parseEther("9999")
    //     })
    // }
    await AutoPay.connect(owner).add(manager.address, 10000)
    await AutoPay.connect(owner).add(senior.address, 8000)
    await AutoPay.connect(owner).add(midLevel.address, 6000)
    await AutoPay.connect(owner).add(junior.address, 3000)

    await AutoPay.connect(owner).deposit({
        value: ethers.utils.parseEther("27000")
    })
    // await AutoPay.connect(owner).pay()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
