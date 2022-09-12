import { HardhatUserConfig } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"
import "hardhat-ethernal"

const config = {
    ethernal: {
        email: "",
        password: ""
    },
    solidity: "0.8.17",
    networks: {
        hardhat: {
            mining: {
                auto: true,
                interval: 5000
            }
        }
    }
}

export default config
