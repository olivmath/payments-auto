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
    describe("Add Employee", async () => {
        it("Owner add Employee (Manager) with U$ 10000", async () => {
            await Payments.connect(owner).addEmployee(manager.address, 10000)

            expect(
                await Payments.connect(manager).nextPayment(manager.address)
            ).to.equal(172802)

            expect(
                await Payments.connect(manager).salary(manager.address)
            ).to.equal(10000)
        })
        it("Owner add Employee (Senior) with U$ 8000", async () => {
            await Payments.connect(owner).addEmployee(senior.address, 8000)

            expect(
                await Payments.connect(senior).nextPayment(senior.address)
            ).to.equal(172803)

            expect(
                await Payments.connect(senior).salary(senior.address)
            ).to.equal(8000)
        })
        it("Owner add Employee (Mid) with U$ 6000", async () => {
            await Payments.connect(owner).addEmployee(mid.address, 6000)

            expect(
                await Payments.connect(mid).nextPayment(mid.address)
            ).to.equal(172804)

            expect(await Payments.connect(mid).salary(mid.address)).to.equal(
                6000
            )
        })
        it("Owner add Employee (Junior) with U$ 3000", async () => {
            await Payments.connect(owner).addEmployee(junior.address, 3000)

            expect(
                await Payments.connect(junior).nextPayment(junior.address)
            ).to.equal(172805)

            expect(
                await Payments.connect(junior).salary(junior.address)
            ).to.equal(3000)
        })
    })
    describe("Deposit ethers", async () => {
        it("add 17000 ETH for pay employee", async () => {
            await Payments.connect(owner).deposit({ value: 17000 })

            expect(await Payments.connect(manager).balance()).to.equal(17000)
        })
    })
})
