import { HardhatUserConfig } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox"

const config: HardhatUserConfig = {
    solidity: "0.8.15",
    networks: {
        hardhat: {
            mining: {
                auto: true,
                interval: 1
            }
        }
    }
}
export default config
