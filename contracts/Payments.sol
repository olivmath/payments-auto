// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Payments is Ownable {
    using SignatureChecker for address;

    struct Employee {
        uint256 salaryAmount;
        uint256 dateOfInit;
        uint256 nextPayment;
    }
    mapping(address => Employee) mappingOfEmployees;

    function addEmployee(address employeeAdress, uint256 salaryAmount)
        public
        onlyOwner
    {
        mappingOfEmployees[employeeAdress] = Employee(
            salaryAmount,
            block.number,
            nextPayment(block.number)
        );
    }

    function salary(address employeeAdress) public view returns (uint256) {
        return mappingOfEmployees[employeeAdress].salaryAmount;
    }

    function nextPayment(address employeeSalary) public view returns (uint256) {
        return mappingOfEmployees[employeeSalary].nextPayment;
    }

    function nextPayment(uint256 dateOfInit) private pure returns (uint256) {
        uint256 blockTimeInSeconds = 15;
        uint256 hourInSeconds = 3600;
        uint256 dayInHours = 24;
        uint256 mounthInDays = 30;
        uint256 monthInSecond = mounthInDays * dayInHours * hourInSeconds;
        return dateOfInit + (monthInSecond / blockTimeInSeconds);
    }

    function validateSignature(
        address addr,
        bytes32 message,
        bytes memory signature
    ) private view {
        string memory erro = string.concat(
            "Invalid signature for ",
            Strings.toHexString(addr)
        );
        require(true == addr.isValidSignatureNow(message, signature), erro);
    }

    function deposit() public payable onlyOwner {}

    function balance() public view returns (uint256) {
        return address(this).balance;
    }
}
