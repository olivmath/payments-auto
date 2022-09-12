// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AutoPay is Ownable {
    struct Employee {
        uint256 salaryAmount;
        uint256 nextPayment;
    }
    mapping(address => Employee) mappingOfEmployees;
    address[] listOfEmployees;

    event NewEmployee(address employee, uint256 salary, uint256 nextPayment);

    function deposit() public payable onlyOwner {}

    function add(address employeeAdress, uint256 salaryAmount)
        public
        onlyOwner
    {
        // verify if already exists
        uint256 _nextPayment = nextPayment();
        listOfEmployees.push(employeeAdress);
        mappingOfEmployees[employeeAdress] = Employee(
            salaryAmount * 10e17,
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

    function nextPayment() private view returns (uint256) {
        uint256 monthInDays = 30;
        uint256 dayInHours = 24;
        uint256 hourInSeconds = 3600;
        return block.timestamp + (monthInDays * dayInHours * hourInSeconds);
    }

    function balance() public view returns (uint256) {
        return address(this).balance;
    }

    function totalCost() public view returns (uint256) {
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
        for (uint256 i = 0; i < listOfEmployees.length; i++) {
            address employee = listOfEmployees[i];
            uint256 amount = mappingOfEmployees[employee].salaryAmount;
            (bool sent, bytes memory data) = employee.call{value: amount}("");
            require(sent, "Failed to send Ether");
        }
    }
}
