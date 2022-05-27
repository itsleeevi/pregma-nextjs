import "../styles/globals.css";
import "../styles/style.scss";
import "aos/dist/aos.css";

//import CONFIG from "../config/configTest.json"; // -> for testnet
//import CONFIG from "../config/config.json"; // -> for mainnet
import CONFIG from "../config/configRinkeby.json"; // -> for mainnet

import stakingABI from "../artifacts/Staking.json";
import tokenABI from "../artifacts/Pumpkin.json";

import { PregmaContext } from "../contexts/PregmaContext";

import { useEffect, useState } from "react";
import Web3 from "web3";
import AOS from "aos";
import { useRouter } from "next/router";
import { MAX_AMOUNT, Converter } from "@maticnetwork/maticjs";

function MyApp({ Component, pageProps }) {
  // web3 hooks
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(undefined);
  const [stakingContract, setStakingContract] = useState(undefined);
  const [tokenContract, setTokenContract] = useState(undefined);
  const [isApproved, setIsApproved] = useState(false);
  const [web3Http, setWeb3Http] = useState(undefined);
  const [stakingContractHttp, setStakingContractHttp] = useState(undefined);

  const [totalStaked, setTotalStaked] = useState(undefined);
  const [index, setIndex] = useState(undefined);
  const [apy, setApy] = useState(undefined);
  const [yourBalance, setYourBalance] = useState(undefined);
  const [yourStakedBalance, setYourStakedBalance] = useState(undefined);
  const [nextRewardAmount, setNextRewardAmount] = useState(undefined);
  const [nextRewardYield, setNextRewardYield] = useState(undefined);
  const [nextRewardROIFiveDays, setNextRewardROIFiveDays] = useState(undefined);
  const [refresh, setRefresh] = useState(false);

  const router = useRouter();

  const connectMetaMask = async () => {
    if (
      window.ethereum &&
      window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC
    ) {
      switchNetwork();
    }
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
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }

    await tokenContract.methods
      .approve(CONFIG.STAKING_ADDRESS, Converter.toHex(MAX_AMOUNT))
      .send({ from: accounts[0] });
    setIsApproved(true);
  };

  const stake = async (amount) => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }
    //console.log(web3.utils.toWei(amount.toString(), "ether"));

    await stakingContract.methods
      .Stake(web3.utils.toWei(amount.toString(), "ether"))
      .send({
        from: accounts[0],
      });
    setRefresh(!refresh);
  };

  const unstake = async (amount) => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }
    await stakingContract.methods
      .Unstake(web3.utils.toWei(amount.toString(), "ether"))
      .send({
        from: accounts[0],
      });
    setRefresh(!refresh);
  };

  const getMaxStaking = async () => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }
    const result = await tokenContract.methods.balanceOf(accounts[0]).call();

    return web3.utils.fromWei(result.toString(), "ether");
  };

  const getMaxUnstaking = async () => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }
    const currentStake = await stakingContract.methods
      .CheckStakedBalance(accounts[0])
      .call();

    return Number(web3.utils.fromWei(currentStake.toString(), "ether")).toFixed(
      2
    );
  };

  const TotalStaked = async () => {
    const result = await stakingContractHttp.methods.totalStaked().call();

    setTotalStaked(
      Number(web3Http.utils.fromWei(result.toString(), "ether")).toFixed(0)
    );
  };

  const Index = async () => {
    const result = await stakingContractHttp.methods.CalculateIndex().call();
    setIndex(
      Number(web3Http.utils.fromWei(result.toString(), "ether")).toFixed(2)
    );
  };

  const APY = async () => {
    const dailyRewardRate = await stakingContractHttp.methods
      .RewardFactor()
      .call();

    setApy(Number((dailyRewardRate / 100) * 365).toFixed(0));
  };

  const YourBalance = async () => {
    const result = await tokenContract.methods.balanceOf(accounts[0]).call();
    setYourBalance(
      Number(web3.utils.fromWei(result.toString(), "ether")).toFixed(2)
    );
  };

  const YourStakedBalance = async () => {
    let result = await stakingContract.methods
      .CheckStakedBalance(accounts[0])
      .call();

    setYourStakedBalance(
      Number(web3.utils.fromWei(result.toString(), "ether")).toFixed(2)
    );
  };

  const NextRewardAmount = async () => {
    const result = await stakingContract.methods
      .CalculateDailyReward(accounts[0])
      .call();
    setNextRewardAmount(
      Number(web3.utils.fromWei(result.toString(), "ether")).toFixed(2)
    );
  };

  const NextRewardYield = async () => {
    const resultNra = await stakingContract.methods
      .CalculateDailyReward(accounts[0])
      .call();
    const resultYsb = await stakingContract.methods
      .GetCurrentStake(accounts[0])
      .call();

    setNextRewardYield(Number((resultNra / resultYsb) * 100).toFixed(2));
  };

  const ROIFiveDays = async () => {
    const resultNra = await stakingContract.methods
      .CalculateDailyReward(accounts[0])
      .call();
    const resultYsb = await stakingContract.methods
      .GetCurrentStake(accounts[0])
      .call();

    setNextRewardROIFiveDays(
      Number(((5 * resultNra) / resultYsb) * 100).toFixed(2)
    );
  };

  const switchNetwork = async () => {
    if (window.ethereum && window.ethereum.isConnected) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CONFIG.CHAIN_ID }],
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: CONFIG.CHAIN_ID,
                  chainName: CONFIG.CHAIN_NAME,
                  nativeCurrency: {
                    name: CONFIG.CURRENCY_NAME,
                    symbol: CONFIG.CURRENCY_SYMBOL,
                    decimals: 18,
                  },
                  rpcUrls: [CONFIG.RPC],
                  blockExplorerUrls: [CONFIG.BLOCK_EXPLORER],
                  iconUrls: [""],
                },
              ],
            });
          } catch (addError) {
            console.log("Did not add network");
          }
        }
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      TotalStaked();
      Index();
      APY();
    };
    if (stakingContractHttp) init();
  }, [stakingContractHttp, refresh]);

  useEffect(() => {
    const init = async () => {
      YourBalance();
      YourStakedBalance();
      NextRewardAmount();
      NextRewardYield();
      ROIFiveDays();
    };
    if (accounts.length > 0 && tokenContract && stakingContract) init();
  }, [accounts, tokenContract, stakingContract, refresh]);

  useEffect(() => {
    if (
      window.ethereum &&
      window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC
    ) {
      switchNetwork();
    } else {
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

  useEffect(() => {
    const init = async () => {
      const web3Http = new Web3(CONFIG.RPC);
      const stakingContractHttp = new web3Http.eth.Contract(
        stakingABI,
        CONFIG.STAKING_ADDRESS
      );

      setWeb3Http(web3Http);
      setStakingContractHttp(stakingContractHttp);
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
        totalStaked,
        index,
        apy,
        yourBalance,
        yourStakedBalance,
        nextRewardAmount,
        nextRewardYield,
        nextRewardROIFiveDays,
        TotalStaked,
        Index,
        APY,
        YourBalance,
        YourStakedBalance,
        NextRewardAmount,
        NextRewardYield,
        ROIFiveDays,
        tokenContract,
        stakingContract,
      }}
    >
      <Component {...pageProps} />
    </PregmaContext.Provider>
  );
}

export default MyApp;
