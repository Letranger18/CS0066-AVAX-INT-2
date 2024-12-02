// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Assessment {
    uint256 public basket;
    uint256 public maxCapacity;
    address public owner;

    event AddEgg(address indexed user, uint256 amount);
    event PayEgg(address indexed user, uint256 amount);
    event UpgradeCapacity(address indexed user, uint256 newCapacity);

    modifier onlyOwner() {
        require(msg.sender == owner, "This basket is not yours!!");
        _;
    }

    constructor(uint256 _initBasket, uint256 _initMaxCapacity) {
        basket = _initBasket;
        maxCapacity = _initMaxCapacity;
        owner = msg.sender;
    }

    function checkBasket() public view returns (uint256) {
        return basket;
    }

    function getMaxCapacity() public view returns (uint256) {
        return maxCapacity;
    }

    function addEgg(uint256 amount) public {
        require(basket + amount <= maxCapacity, "Basket is full, spend some eggs first or upgrade the basket.");
        basket += amount;
        emit AddEgg(msg.sender, amount);
    }

    function payEgg(uint256 amount) public {
        require(basket >= amount, "You need more EGGS for that!");
        basket -= amount;
        emit PayEgg(msg.sender, amount);
    }
    
    function upgradeCapacity() public onlyOwner {
        require(basket >= 10, "You need more EGGS for that!");
        basket -= 10;
        maxCapacity += 5;
        emit UpgradeCapacity(msg.sender, maxCapacity);
    }
}
