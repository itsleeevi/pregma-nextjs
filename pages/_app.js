import "../styles/globals.css";
import "../styles/style.scss";
import "aos/dist/aos.css";

import CONFIG from "../config/configTest.json"; // -> for testnet
//import CONFIG from "../config/config.json"; // -> for mainnet

import stakingABI from "../artifacts/Staking.json";
import tokenABI from "../artifacts/Pumpkin.json";

import { PregmaContext } from "../contexts/PregmaContext";

import { useEffect, useState } from "react";
import Web3 from "web3";
import AOS from "aos";

function MyApp({ Component, pageProps }) {
  // web3 hooks
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(undefined);
  const [stakingContract, setStakingContract] = useState(undefined);
  const [tokenContract, setTokenContract] = useState(undefined);
  const [isApproved, setIsApproved] = useState(false);

  const connectMetaMask = async () => {
    if (window.ethereum && window.ethereum.isConnected) {
      const accs = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accs);
      if (accs.length > 0) {
        setConnected(true);
      } else setConnected(false);
    } else {
      router.push("https://metamask.io/");
    }
  };

  const disconnectMetaMask = () => {
    setConnected(false);
    setAccounts([]);
  };

  const approve = async () => {
    await tokenContract.methods
      .approve(
        CONFIG.STAKING_ADDRESS,
        await tokenContract.methods.totalSupply().call()
      )
      .send({ from: accounts[0] });
  };

  const stake = async (amount) => {
    await stakingContract.methods
      .Stake(web3.utils.toWei(amount.toString(), "ether"))
      .send({ from: accounts[0] });
  };

  const unstake = async (amount) => {
    await stakingContract.methods
      .Unstake(web3.utils.toWei(amount.toString(), "ether"))
      .send({ from: accounts[0] });
  };

  const getMaxStaking = async () => {
    const result = await tokenContract.methods.balanceOf(accounts[0]).call();

    return web3.utils.fromWei(result.toString(), "ether");
  };

  const getMaxUnstaking = async () => {
    const result = await stakingContract.methods
      .GetCurrentStake(accounts[0])
      .call();

    return web3.utils.fromWei(result.toString(), "ether");
  };

  useEffect(() => {
    setIsApproved(false);
    console.log();
    const isApproved = async () => {
      await tokenContract.methods
        .allowance(accounts[0], CONFIG.STAKING_ADDRESS)
        .call()
        .then((result) => {
          console.log(result);
          if (Number(result) === 0) {
            setIsApproved(false);
          } else setIsApproved(true);
        });
    };

    if (tokenContract && accounts.length > 0) {
      isApproved();
    }
  }, [accounts, tokenContract]);

  useEffect(() => {
    AOS.init({
      once: true,
      disable: window.innerWidth < 768,
      duration: 750,
      easing: "ease-out-quart",
    });
  }, []);

  useEffect(() => {
    const init = async () => {
      const stakingContract = new web3.eth.Contract(
        stakingABI,
        CONFIG.STAKING_ADDRESS
      );
      const tokenContract = new web3.eth.Contract(
        tokenABI,
        CONFIG.TOKEN_ADDRESS
      );

      setStakingContract(stakingContract);
      setTokenContract(tokenContract);
    };

    if (window.ethereum && web3) {
      init();
    }
  }, [web3]);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum && window.ethereum.isConnected) {
        const accs = await window.ethereum
          .request({
            method: "eth_accounts",
          })
          .catch((err) => {
            console.error(err);
          });
        const web3 = new Web3(window.ethereum);

        setAccounts(accs);
        setWeb3(web3);

        if (accs.length > 0) {
          setConnected(true);
        } else setConnected(false);
      }
    };

    init();
  }, []);

  return (
    <PregmaContext.Provider
      value={{
        AOS,
        connected,
        accounts,
        web3,
        connectMetaMask,
        disconnectMetaMask,
        stakingContract,
        tokenContract,
        approve,
        isApproved,
        stake,
        unstake,
        getMaxStaking,
        getMaxUnstaking,
      }}
    >
      <Component {...pageProps} />
    </PregmaContext.Provider>
  );
}

export default MyApp;
