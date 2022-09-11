// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Payments is Ownable {
    struct Employee {
        uint256 salaryAmount;
        uint256 dateOfInit;
        uint256 nextPayment;
    }
    mapping(address => Employee) mappingOfEmployees;
    address[] listOfEmployees;

    event NewEmployee(address employee, uint256 salary, uint256 nextPayment);

    function addEmployee(address employeeAdress, uint256 salaryAmount)
        public
        onlyOwner
    {
        uint256 _currentBlock = block.number;
        uint256 _nextPayment = nextPayment(block.number);
        listOfEmployees.push(employeeAdress);
        mappingOfEmployees[employeeAdress] = Employee(
            salaryAmount,
            _currentBlock,
            _nextPayment
        );

        emit NewEmployee(employeeAdress, salaryAmount, _nextPayment);
    }

    function salary(address employeeAdress) public view returns (uint256) {
        return mappingOfEmployees[employeeAdress].salaryAmount;
    }

    function nextPayment(address employeeAddress)
        public
        view
        returns (uint256)
    {
        return mappingOfEmployees[employeeAddress].nextPayment;
    }

    function nextPayment(uint256 dateOfInit) private pure returns (uint256) {
        uint256 blockTimeInSeconds = 15;
        uint256 hourInSeconds = 3600;
        uint256 dayInHours = 24;
        uint256 mounthInDays = 30;
        uint256 monthInSecond = mounthInDays * dayInHours * hourInSeconds;
        return dateOfInit + (monthInSecond / blockTimeInSeconds);
    }

    function deposit() public payable onlyOwner {}

    function balance() public view returns (uint256) {
        return address(this).balance;
    }

    function cust() public view returns (uint256) {
        uint256 totalCust = 0;
        for (uint256 i = 0; i < listOfEmployees.length; i++) {
            totalCust += mappingOfEmployees[listOfEmployees[i]].salaryAmount;
        }
        return totalCust;
    }

    function employees() public view onlyOwner returns (address[] memory) {
        return listOfEmployees;
    }

    function pay() public payable onlyOwner {
        // verify date of payment of employee
        // verify balance of contract
        // send payments
        // re-calc next payment for payment
        // for (uint256 i = 0; i < listOfEmployees.length; i++) {
        //     address employee = listOfEmployees[i];
        //     uint256 amount = mappingOfEmployees[employee].salaryAmount;
        //     (bool sent, bytes memory data) = employee.call{value: amount}("");
        //     require(sent, "Failed to send Ether");
        // }
    }
}
