import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { AutoPay } from "../typechain-types"
import hardhat, { ethers } from "hardhat"
import { expect } from "chai"
import { BigNumber } from "ethers"

describe("AutoPay", () => {
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
     * - AutoPay
     */
    let Pay: AutoPay

    describe("Wallet", async () => {
        it("Create Wallets", async () => {
            ;[owner, manager, senior, midLevel, junior, ...addrs] =
                await ethers.getSigners()
            for (let i = 0; i < addrs.length; i++) {
                await addrs[i].sendTransaction({
                    to: owner.address,
                    value: ethers.utils.parseEther("9999")
                })
            }
        })
    })

    describe("Deploy", async () => {
        it("Deploy AutoPay", async () => {
            const PaymentFactory = await hardhat.ethers.getContractFactory(
                "AutoPay"
            )
            Pay = await PaymentFactory.deploy()
        })
    })
    describe("Employee", async () => {
        it("add Employee, salary: 10.000ETH, role: Manager", async () => {
            expect(await Pay.connect(owner).add(manager.address, 10000))
                .to.emit(Pay, "NewEmployee")
                .withArgs(manager.address, 10000, 172802)
        })
        it("add Employee, salary: 8.000ETH, role: Senior", async () => {
            expect(await Pay.connect(owner).add(senior.address, 8000))
                .to.emit(Pay, "NewEmployee")
                .withArgs(senior.address, 8000, 172802)
        })
        it("add Employee, salary: 4.000ETH, role: mid-level", async () => {
            expect(await Pay.connect(owner).add(midLevel.address, 4000))
                .to.emit(Pay, "NewEmployee")
                .withArgs(midLevel.address, 4000, 172802)
        })
        it("add Employee, salary: 2.000ETH, role: junior", async () => {
            expect(await Pay.connect(owner).add(junior.address, 2000))
                .to.emit(Pay, "NewEmployee")
                .withArgs(junior.address, 2000, 172802)
        })
        it("get all Employee", async () => {
            const employees = await Pay.connect(owner).employees()
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
        it("cust of all employees should be 24.000 ETH", async () => {
            const custOfAllEmployees = await Pay.totalCost()
            expect(custOfAllEmployees).to.equal(
                ethers.utils.parseEther("24000")
            )
        })
        it("add 24.000 ETH for pay employees", async () => {
            await Pay.connect(owner).deposit({
                value: ethers.utils.parseEther("24000")
            })
            expect(await Pay.connect(manager).balance()).to.equal(
                ethers.utils.parseEther("24000")
            )
        })
    })
    describe("Payment", async () => {
        it("pay employes", async () => {
            const before = await manager.getBalance()
            await Pay.pay()
            const after = await manager.getBalance()
            expect(before.add(ethers.utils.parseEther("10000"))).to.equal(after)
        })
    })
})
