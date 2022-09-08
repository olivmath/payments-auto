import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Payments } from "../typechain-types"
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
    let midLevel: SignerWithAddress
    let junior: SignerWithAddress
    let addrs: SignerWithAddress[]

    /**
     * @DeclareSmartContracts
     * - Payments
     */
    let Payments: Payments

    describe("Wallet", async () => {
        it("Create Wallets", async () => {
            ;[owner, manager, senior, midLevel, junior, ...addrs] =
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
    describe("Employee", async () => {
        it("add Manager with 10.000 ETH", async () => {
            expect(
                await Payments.connect(owner).addEmployee(
                    manager.address,
                    10000
                )
            )
                .to.emit(Payments, "NewEmployee")
                .withArgs(manager.address, 10000, 172802)
        })
        it("add Senior with 8.000 ETH", async () => {
            expect(
                await Payments.connect(owner).addEmployee(senior.address, 8000)
            )
                .to.emit(Payments, "NewEmployee")
                .withArgs(senior.address, 8000, 172802)
        })
        it("add MidLevel with 4.000 ETH", async () => {
            expect(
                await Payments.connect(owner).addEmployee(
                    midLevel.address,
                    6000
                )
            )
                .to.emit(Payments, "NewEmployee")
                .withArgs(midLevel.address, 6000, 172802)
        })
        it("add Junior with 2.000 ETH", async () => {
            expect(
                await Payments.connect(owner).addEmployee(junior.address, 4000)
            )
                .to.emit(Payments, "NewEmployee")
                .withArgs(junior.address, 4000, 172802)
        })
        it("get all Employee", async () => {
            const employees = await Payments.connect(owner).employees()
            const testEmployees = [
                manager.address,
                senior.address,
                midLevel.address,
                junior.address
            ]

            expect(employees).to.be.a("array")
            expect(employees).to.be.length(4)
            expect(employees).to.have.members(testEmployees)
        })
    })
    describe("Deposit", async () => {
        it("add 24.000 ETH for pay employee", async () => {
            await Payments.connect(owner).deposit({ value: 24000 })

            expect(await Payments.connect(manager).balance()).to.equal(24000)
        })
    })
    })
})
