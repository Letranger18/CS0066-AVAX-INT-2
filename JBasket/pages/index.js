import { useState, useEffect } from "react";
import { ethers } from "ethers";
import jbasketabi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [jbasket, setJBasket] = useState(undefined);
  const [basket, setBasket] = useState(undefined);
  const [maxCapacity, setMaxCapacity] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const jbasketABI = jbasketabi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      console.log("Accounts are empty");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("You need MetaMask extension to proceed.");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
    getJBasketContract();
  };

  const getJBasketContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const JBasketContract = new ethers.Contract(contractAddress, jbasketABI, signer);
    setJBasket(JBasketContract);
  };

  const checkBasket = async () => {
    if (jbasket) {
      setBasket((await jbasket.checkBasket()).toNumber());
    }
  };

  const addEgg = async (amount) => {
    if (jbasket) {
      if (basket + amount > maxCapacity) {
        alert(`Basket is full, spend some eggs first or upgrade the basket.`);
        return;
      }
      try {
        let tx = await jbasket.addEgg(amount);
        await tx.wait();
        checkBasket();
      } catch (err) {
        console.error("Basket Error:", err);
      }
    }
  };

  const getMaxCapacity = async () => {
    if (jbasket) {
      const capacity = await jbasket.getMaxCapacity();
      setMaxCapacity(capacity.toNumber());
    }
  };
  
  const upgradeBasket = async () => {
    if (jbasket && basket >= 10) {
      try {
        let tx = await jbasket.upgradeCapacity();
        await tx.wait();
        await getMaxCapacity();
        await checkBasket();
      } catch (err) {
        console.error("Upgrade failed:", err);
      }
    } else {
      alert("You need more EGGS for that!");
    }
  };

  const upgradeNet = async() => {
    if (jbasket && basket >= 4) {
      try {
        let tx = await jbasket.payEgg(4);
        await tx.wait()
        checkBasket();
      } catch (err) {
        console.error("Upgrade failed:", err);
      }
    } else {
      alert("You need more EGGS for that!");
    }
  }

  const upgradeBoots = async() => {
    if (jbasket && basket >= 7) {
      try {
        let tx = await jbasket.payEgg(7);
        await tx.wait()
        checkBasket();
      } catch (err) {
        console.error("Upgrade failed:", err);
      }
    } else {
      alert("You need more EGGS for that!");
    }
  }

  const initUser = () => {
    if (!ethWallet) {
      return <p>My services are NOT FREE!! Comeback later when your MetaMask is ready.</p>;
    }
  
    if (!account) {
      return <button onClick={connectAccount}>ENTER THE SHOP</button>;
    }
  
    return (
      <div>
          <div>
            <h4>UPGRADE BASKET CAPACITY</h4>
            <p>More space for eggs.</p>
            <p>Current Capacity: {maxCapacity} Eggs</p>
            <button onClick={upgradeBasket}>PAY 10 EGGS</button>
          </div>
          <div>
            <h4>UPGRADE NET CATCHER</h4>
            <p>Bigger egg pickup radius.</p>
            <button onClick={upgradeNet}>PAY 4 EGGS</button>
          </div>
          <div>
            <h4>UPGRADE BOOTS</h4>
            <p>Improves the speed of the hunter.</p>
            <button onClick={upgradeBoots}>PAY 7 EGGS</button>
          </div>

          <hr></hr>

          <p>
          <h3>Basket: {basket} / {maxCapacity} {"   "} 
          <button onClick={() => addEgg(1)}>1x</button>
          <button onClick={() => addEgg(3)}>3x</button>
          <button onClick={() => addEgg(5)}>5x</button><br></br></h3>
          <strong>Hunter:</strong> {account}
      </p>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);
  
  useEffect(() => {
    if (account) {
      checkBasket();
      getMaxCapacity();
    }
  }, [account]);

  return (
    <main className="container">
      <header>
        <h1>THE MAD CRAFTER'S WORKSHOP</h1>
        <hr></hr>
      </header>
      {initUser()}  
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
