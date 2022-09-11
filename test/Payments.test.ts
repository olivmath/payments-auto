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
        it("add Employee, salary: 10.000ETH, role: Manager", async () => {
            expect(
                await Payments.connect(owner).addEmployee(
                    manager.address,
                    10000
                )
            )
                .to.emit(Payments, "NewEmployee")
                .withArgs(manager.address, 10000, 172802)
        })
        it("add Employee, salary: 8.000ETH, role: Senior", async () => {
            expect(
                await Payments.connect(owner).addEmployee(senior.address, 8000)
            )
                .to.emit(Payments, "NewEmployee")
                .withArgs(senior.address, 8000, 172802)
        })
        it("add Employee, salary: 4.000ETH, role: mid-level", async () => {
            expect(
                await Payments.connect(owner).addEmployee(
                    midLevel.address,
                    6000
                )
            )
                .to.emit(Payments, "NewEmployee")
                .withArgs(midLevel.address, 6000, 172802)
        })
        it("add Employee, salary: 2.000ETH, role: junior", async () => {
            expect(
                await Payments.connect(owner).addEmployee(junior.address, 2000)
            )
                .to.emit(Payments, "NewEmployee")
                .withArgs(junior.address, 2000, 172802)
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
        it("cust of all employees should be 26.000 ETH", async () => {
            const custOfAllEmployees = await Payments.cust()
            expect(custOfAllEmployees).to.equal(26000)
        })
        it("add 26.000 ETH for pay employees", async () => {
            await Payments.connect(owner).deposit({
                value: 26000
            })
            expect(await Payments.connect(manager).balance()).to.equal(28000)
        })
    })
    describe("Payment", async () => {
        // it("pay in block #172802", async () => {
        //     expect(await manager.getBalance()).to.equal(0)
        //     expect(await senior.getBalance()).to.equal(0)
        //     expect(await midLevel.getBalance()).to.equal(0)
        //     expect(await junior.getBalance()).to.equal(0)
        //     await Payments.pay()
        //     expect(await manager.getBalance()).to.equal(10000)
        //     expect(await senior.getBalance()).to.equal(8000)
        //     expect(await midLevel.getBalance()).to.equal(6000)
        //     expect(await junior.getBalance()).to.equal(2000)
        // })
    })
})
