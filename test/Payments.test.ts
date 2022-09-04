import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Payment__factory, Payment } from "../typechain-types"
import hardhat, { ethers } from "hardhat"
import { expect } from "chai"

describe("Payment", () => {
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
     * - Payment
     */
    let Payment: Payment

    describe("Wallet", async () => {
        it("Create Wallets", async () => {
            ;[owner, manager, senior, mid, junior, ...addrs] =
                await ethers.getSigners()
        })
    })

    describe("Deploy", async () => {
        it("Deploy Payment", async () => {
            const PaymentFactory = await hardhat.ethers.getContractFactory(
                "Payment"
            )
            Payment = await PaymentFactory.deploy()
        })
    })
    describe("Transfer", async () => {
        it("Owner transfer 1 Duck NFT to Seller", async () => {
            await Payment.connect(owner).addEmploye(manager.address, 10000)

            const employe = Payment.connect(manager).employe(manager.address)
            expect(employe).to.equal(10000)
        })
    })
})
