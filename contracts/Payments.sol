// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Payments is Ownable {
    using SignatureChecker for address;

    struct Employe {
        address employe_address,
        uint256 salary_amount,
        uint256 date_of_init,
    }

    Employe[] public employes;

    int32 x;


    function addEmployer(address employe_address, uint256 salary_amount) { 
        employes_information = Employe(employe_address, salary_amount, block.number)

    }

    list_structs.push(addEmployer)


    function validateSignature(
        address addr,
        bytes32 message,
        bytes memory signature
    ) private {
        string memory erro = string.concat(
            "Invalid signature for ",
            Strings.toHexString(addr)
        );
        require(true == addr.isValidSignatureNow(message, signature), erro);
    }
}
