import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Payments__factory, Payments } from "../typechain-types"
import hardhat, { ethers } from "hardhat"
import { expect } from "chai"

describe("Payments", () => {
    /**
     * @DeclareWallet
     * - Owner
     * - Others
     */
    let owner: SignerWithAddress
    let manager: SignerWithAddress
    let senior: SignerWithAddress
    let mid: SignerWithAddress
    let junior: SignerWithAddress
    let addrs: SignerWithAddress[]

    /**
     * @DeclareSmartContracts
     * - Payments
     */
    let Payments: Payments

    describe("Wallet", async () => {
        it("Create Wallets", async () => {
            ;[owner, manager, senior, mid, junior, ...addrs] =
                await ethers.getSigners()
        })
    })

    describe("Deploy", async () => {
        it("Deploy Payments", async () => {
            const PaymentFactory = await hardhat.ethers.getContractFactory(
                "Payments"
            )
            Payments = await PaymentFactory.deploy()
        })
    })
    describe("Add Employe", async () => {
        it("Owner add Manager with U$ 10000", async () => {
            await Payments.connect(owner).addEmploye(manager.address, 10000)
        })
    })
})
