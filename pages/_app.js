import "../styles/globals.css";
import "../styles/style.scss";
import "aos/dist/aos.css";

//import CONFIG from "../config/configTest.json"; // -> for testnet
//import CONFIG from "../config/config.json"; // -> for mainnet
import CONFIG from "../config/configRinkeby.json"; // -> for mainnet

import stakingABI from "../artifacts/Staking.json";
import tokenABI from "../artifacts/Pumpkin.json";
import poolsABI from "../artifacts/Pools.json";

import { PregmaContext } from "../contexts/PregmaContext";

import { useEffect, useState } from "react";
import Web3 from "web3";
import AOS from "aos";
import { useRouter } from "next/router";
import { MAX_AMOUNT, Converter } from "@maticnetwork/maticjs";

function MyApp({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // web3 hooks
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(undefined);
  const [stakingContract, setStakingContract] = useState(undefined);
  const [tokenContract, setTokenContract] = useState(undefined);

  //
  const [depositTokenContract, setDepositTokenContract] = useState(undefined);
  const [poolContract, setPoolContract] = useState(undefined);
  const [poolContract7Days, setPoolContract7Days] = useState(undefined);
  const [poolContract15Days, setPoolContract15Days] = useState(undefined);

  // http
  const [depositTokenContractHttp, setDepositTokenContractHttp] =
    useState(undefined);
  const [poolContractHttp, setPoolContractHttp] = useState(undefined);
  const [poolContract7DaysHttp, setPoolContract7DaysHttp] = useState(undefined);
  const [poolContract15DaysHttp, setPoolContract15DaysHttp] =
    useState(undefined);
  const [isApproved, setIsApproved] = useState(false);
  const [isApprovedDeposit, setIsApprovedDeposit] = useState(false);
  const [isApprovedDeposit7Days, setIsApprovedDeposit7Days] = useState(false);
  const [isApprovedDeposit15Days, setIsApprovedDeposit15Days] = useState(false);
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
  const [network, setNetwork] = useState(false);

  // POOL
  const [rewardAmountPool, setRewardAmountPool] = useState(undefined);
  const [stakedAmountPool, setStakedAmountPool] = useState(undefined);
  const [totalStakedPool, setTotalStakedPool] = useState(undefined);
  const [vaultRewardPool, setVaultRewardPool] = useState(undefined);

  const [rewardAmountPool7Days, setRewardAmountPool7Days] = useState(undefined);
  const [stakedAmountPool7Days, setStakedAmountPool7Days] = useState(undefined);
  const [totalStakedPool7Days, setTotalStakedPool7Days] = useState(undefined);
  const [vaultRewardPool7Days, setVaultRewardPool7Days] = useState(undefined);

  const [rewardAmountPool15Days, setRewardAmountPool15Days] =
    useState(undefined);
  const [stakedAmountPool15Days, setStakedAmountPool15Days] =
    useState(undefined);
  const [totalStakedPool15Days, setTotalStakedPool15Days] = useState(undefined);
  const [vaultRewardPool15Days, setVaultRewardPool15Days] = useState(undefined);

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
      Number(web3.utils.fromWei(result.toString(), "ether") / 96).toFixed(2)
    );
  };

  const NextRewardYield = async () => {
    const resultNra = await stakingContract.methods
      .CalculateDailyReward(accounts[0])
      .call();
    const resultYsb = await stakingContract.methods
      .GetCurrentStake(accounts[0])
      .call();

    setNextRewardYield(Number(((resultNra / resultYsb) * 100) / 96).toFixed(4));
  };

  const ROIFiveDays = async () => {
    const resultNra = await stakingContract.methods
      .CalculateDailyReward(accounts[0])
      .call();
    const resultYsb = await stakingContract.methods
      .GetCurrentStake(accounts[0])
      .call();
    const bps = resultNra / resultYsb;
    setNextRewardROIFiveDays(
      Number((Math.pow(1 + bps, 5) - 1) * 100).toFixed(4)
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
      setNetwork(!network);
    }
  };

  // POOLS FUNCTIONS

  const approveDepositToken = async () => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }

    await depositTokenContract.methods
      .approve(CONFIG.POOL_ADDRESS_NOLOCK, Converter.toHex(MAX_AMOUNT))
      .send({ from: accounts[0] });
    setIsApprovedDeposit(true);
  };

  const approveDepositToken7Days = async () => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }

    await depositTokenContract.methods
      .approve(CONFIG.POOL_ADDRESS_7DAYS, Converter.toHex(MAX_AMOUNT))
      .send({ from: accounts[0] });
    setIsApprovedDeposit7Days(true);
  };

  const approveDepositToken15Days = async () => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }

    await depositTokenContract.methods
      .approve(CONFIG.POOL_ADDRESS_15DAYS, Converter.toHex(MAX_AMOUNT))
      .send({ from: accounts[0] });
    setIsApprovedDeposit15Days(true);
  };

  const getMaxStakingDeposit = async () => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }
    const result = await depositTokenContract.methods
      .balanceOf(accounts[0])
      .call();

    return web3.utils.fromWei(result.toString(), "ether");
  };

  const stakePool = async (amount) => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }

    await poolContract.methods
      .deposit(web3.utils.toWei(amount.toString(), "ether"))
      .send({
        from: accounts[0],
      });
    setRefresh(!refresh);
  };

  const stakePool7Days = async (amount) => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }

    await poolContract7Days.methods
      .deposit(web3.utils.toWei(amount.toString(), "ether"))
      .send({
        from: accounts[0],
      });
    setRefresh(!refresh);
  };

  const stakePool15Days = async (amount) => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }

    await poolContract15Days.methods
      .deposit(web3.utils.toWei(amount.toString(), "ether"))
      .send({
        from: accounts[0],
      });
    setRefresh(!refresh);
  };

  const unstakePool = async () => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }
    await poolContract.methods.claimAndWithdraw().send({
      from: accounts[0],
    });
    setRefresh(!refresh);
  };

  const unstakePool7Days = async () => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }
    await poolContract7Days.methods.claimAndWithdraw().send({
      from: accounts[0],
    });
    setRefresh(!refresh);
  };

  const unstakePool15Days = async () => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }
    await poolContract15Days.methods.claimAndWithdraw().send({
      from: accounts[0],
    });
    setRefresh(!refresh);
  };

  const harvest = async () => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }
    await poolContract.methods.claim().send({
      from: accounts[0],
    });
    setRefresh(!refresh);
  };

  const harvest7Days = async () => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }
    await poolContract7Days.methods.claim().send({
      from: accounts[0],
    });
    setRefresh(!refresh);
  };

  const harvest15Days = async () => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }
    await poolContract15Days.methods.claim().send({
      from: accounts[0],
    });
    setRefresh(!refresh);
  };

  const getMaxUnstakingDeposit = async () => {
    if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
      switchNetwork();
    }
    const currentStake = await poolContract.methods
      .StakedTokens(accounts[0])
      .call();

    return Number(web3.utils.fromWei(currentStake.toString(), "ether")).toFixed(
      2
    );
  };

  const rewardPool = async () => {
    const result = await poolContract.methods
      .CalculateReward(accounts[0])
      .call();
    console.log("res", result);
    setRewardAmountPool(
      Number(web3.utils.fromWei(result.toString(), "ether")).toFixed(2)
    );
  };

  const rewardPool7Days = async () => {
    const result = await poolContract7Days.methods
      .CalculateReward(accounts[0])
      .call();
    console.log("res", result);
    setRewardAmountPool7Days(
      Number(web3.utils.fromWei(result.toString(), "ether")).toFixed(2)
    );
  };

  const rewardPool15Days = async () => {
    const result = await poolContract15Days.methods
      .CalculateReward(accounts[0])
      .call();
    console.log("res", result);
    setRewardAmountPool15Days(
      Number(web3.utils.fromWei(result.toString(), "ether")).toFixed(2)
    );
  };

  const stakedPool = async () => {
    const result = await poolContract.methods.StakedTokens(accounts[0]).call();
    console.log(result);
    setStakedAmountPool(
      Number(web3.utils.fromWei(result.toString(), "ether")).toFixed(2)
    );
  };

  const stakedPool7Days = async () => {
    const result = await poolContract7Days.methods
      .StakedTokens(accounts[0])
      .call();
    console.log(result);
    setStakedAmountPool7Days(
      Number(web3.utils.fromWei(result.toString(), "ether")).toFixed(2)
    );
  };

  const stakedPool15Days = async () => {
    const result = await poolContract15Days.methods
      .StakedTokens(accounts[0])
      .call();
    console.log(result);
    setStakedAmountPool15Days(
      Number(web3.utils.fromWei(result.toString(), "ether")).toFixed(2)
    );
  };

  const totalStakedAmountPool = async () => {
    const result = await poolContractHttp.methods.totalStaked().call();
    setTotalStakedPool(
      Number(web3Http.utils.fromWei(result.toString(), "ether")).toFixed(2)
    );
  };

  const totalStakedAmountPool7Days = async () => {
    const result = await poolContract7DaysHttp.methods.totalStaked().call();
    setTotalStakedPool7Days(
      Number(web3Http.utils.fromWei(result.toString(), "ether")).toFixed(2)
    );
  };

  const totalStakedAmountPool15Days = async () => {
    const result = await poolContract15DaysHttp.methods.totalStaked().call();
    setTotalStakedPool15Days(
      Number(web3Http.utils.fromWei(result.toString(), "ether")).toFixed(2)
    );
  };

  const vaultReward = async () => {
    const result = await poolContractHttp.methods.VaultReward().call();

    setVaultRewardPool(
      Number(web3Http.utils.fromWei(result.toString(), "ether"))
    );
  };

  const vaultReward7Days = async () => {
    const result = await poolContract7DaysHttp.methods.VaultReward().call();

    setVaultRewardPool7Days(
      Number(web3Http.utils.fromWei(result.toString(), "ether"))
    );
  };

  const vaultReward15Days = async () => {
    const result = await poolContract15DaysHttp.methods.VaultReward().call();

    setVaultRewardPool15Days(
      Number(web3Http.utils.fromWei(result.toString(), "ether"))
    );
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
    const init = async () => {
      rewardPool();
      stakedPool();
      rewardPool7Days();
      stakedPool7Days();
      rewardPool15Days();
      stakedPool15Days();
    };
    if (
      accounts.length > 0 &&
      poolContract &&
      poolContract7Days &&
      poolContract15Days
    )
      init();
  }, [accounts, poolContract, poolContract7Days, poolContract15Days, refresh]);

  useEffect(() => {
    const init = async () => {
      totalStakedAmountPool();
      vaultReward();
      totalStakedAmountPool7Days();
      vaultReward7Days();
      totalStakedAmountPool15Days();
      vaultReward15Days();
    };
    if (poolContractHttp && poolContract7DaysHttp && poolContract15DaysHttp)
      init();
  }, [
    poolContractHttp,
    poolContract7DaysHttp,
    poolContract15DaysHttp,
    refresh,
  ]);

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
            if (Number(result) === 0) {
              setIsApproved(false);
            } else setIsApproved(true);
          });

        await depositTokenContract.methods
          .allowance(accounts[0], CONFIG.POOL_ADDRESS_NOLOCK)
          .call()
          .then((result) => {
            if (Number(result) === 0) {
              setIsApprovedDeposit(false);
            } else setIsApprovedDeposit(true);
          });

        await depositTokenContract.methods
          .allowance(accounts[0], CONFIG.POOL_ADDRESS_7DAYS)
          .call()
          .then((result) => {
            if (Number(result) === 0) {
              setIsApprovedDeposit7Days(false);
            } else setIsApprovedDeposit7Days(true);
          });

        await depositTokenContract.methods
          .allowance(accounts[0], CONFIG.POOL_ADDRESS_15DAYS)
          .call()
          .then((result) => {
            if (Number(result) === 0) {
              setIsApprovedDeposit15Days(false);
            } else setIsApprovedDeposit15Days(true);
          });
      };

      if (tokenContract && depositTokenContract && accounts.length > 0) {
        isApproved();
      }
    }
  }, [accounts, tokenContract, depositTokenContract]);

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
      const depositTokenContract = new web3.eth.Contract(
        tokenABI,
        CONFIG.DEPOSIT_TOKEN_ADDRESS_NOLOCK
      );
      const poolContract = new web3.eth.Contract(
        poolsABI,
        CONFIG.POOL_ADDRESS_NOLOCK
      );
      const poolContract7Days = new web3.eth.Contract(
        poolsABI,
        CONFIG.POOL_ADDRESS_7DAYS
      );
      const poolContract15Days = new web3.eth.Contract(
        poolsABI,
        CONFIG.POOL_ADDRESS_15DAYS
      );

      setStakingContract(stakingContract);
      setTokenContract(tokenContract);
      setDepositTokenContract(depositTokenContract);
      setPoolContract(poolContract);
      setPoolContract7Days(poolContract7Days);
      setPoolContract15Days(poolContract15Days);
    };

    if (window.ethereum && web3) {
      init();
    }
  }, [web3]);

  useEffect(() => {
    const init = async () => {
      const depositTokenContractHttp = new web3Http.eth.Contract(
        tokenABI,
        CONFIG.DEPOSIT_TOKEN_ADDRESS_NOLOCK
      );
      const poolContractHttp = new web3Http.eth.Contract(
        poolsABI,
        CONFIG.POOL_ADDRESS_NOLOCK
      );
      const poolContract7DaysHttp = new web3Http.eth.Contract(
        poolsABI,
        CONFIG.POOL_ADDRESS_7DAYS
      );
      const poolContract15DaysHttp = new web3Http.eth.Contract(
        poolsABI,
        CONFIG.POOL_ADDRESS_15DAYS
      );

      setDepositTokenContractHttp(depositTokenContractHttp);
      setPoolContractHttp(poolContractHttp);
      setPoolContract7DaysHttp(poolContract7DaysHttp);
      setPoolContract15DaysHttp(poolContract15DaysHttp);
    };

    if (window.ethereum && web3) {
      init();
    }
  }, [web3]);

  useEffect(() => {
    if (window.ethereum && window.ethereum.isConnected) {
      const init = async () => {
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
      };

      if (window.ethereum.networkVersion !== CONFIG.CHAIN_ID_DEC) {
        switchNetwork();
      } else {
        init();
      }
    }
  }, [network]);

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
        depositTokenContract,
        poolContract,
        approveDepositToken,
        approveDepositToken7Days,
        approveDepositToken15Days,
        isApprovedDeposit,
        isApprovedDeposit7Days,
        isApprovedDeposit15Days,
        stakePool,
        unstakePool,
        harvest,
        getMaxStakingDeposit,
        getMaxUnstakingDeposit,
        rewardAmountPool,
        stakedAmountPool,
        totalStakedPool,
        vaultRewardPool,
        stakePool7Days,
        unstakePool7Days,
        harvest7Days,
        rewardAmountPool7Days,
        stakedAmountPool7Days,
        totalStakedPool7Days,
        vaultRewardPool7Days,
        stakePool15Days,
        unstakePool15Days,
        harvest15Days,
        rewardAmountPool15Days,
        stakedAmountPool15Days,
        totalStakedPool15Days,
        vaultRewardPool15Days,
        setSidebarOpen,
        sidebarOpen,
      }}
    >
      <Component {...pageProps} />
    </PregmaContext.Provider>
  );
}

export default MyApp;
