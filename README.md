# Solidity (Intermediate) Project Assessment 2

A simple program that simulates a shop for easter egg hunters to upgrade their tools (Basket, Net Catcher, & Boots) using eggs as currency. This program requires MetaMask account so the user can fund their in-game currency (ETH -> Egg).

## Description

My task is to satisfy the following functionalities:

The Smart contract has at least two functions, and the Value of the functions from the smart contract are visible on the frontend of the application.

## Executing program

How to run the program
* Using VS Code, clone this repository `https://github.com/MetacrafterChris/SCM-Starter` using git or manual download
* Open 3 git terminals. (Make sure you installed Git & Node.js)
* In the first terminal, run the bash command `npm i` and wait for it to finish.
* In the second terminal, run the bash command `npx hardhat node` and a set of accounts and keys will be displayed.
* In the last terminal, run the bash command `npx hardhat run --network localhost scripts/deploy.js`
* Then return to the first terminal and run `npm run dev` to run the front-end.
* Go to your localhost by opening a browser and typing `http://localhost:3000/`.
* Click the button "ENTER THE SHOP" then enter your password for Metamask account. (Make sure that your Metamask)
* The shop requires eggs as its currency. To add eggs into your basket, choose the button of your desired number of eggs to fund, and confirm the MetaMask transaction.
* You can choose what tools you want to upgrade, and click "PAY" button to your desired tool, then confirm again the MetaMask transaction.
  
## Authors

John Benedict C. Signo
- 202110485@fit.edu.ph
- FEU Institute of Technology - BSCSSE - CS0066 - TN42
