import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useEffect, useState, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PregmaContext } from "../contexts/PregmaContext";
import { Box, Grommet, Stack, TextInput, Text } from "grommet";
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet/themes";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import YieldsBg from "../components/YieldsBg";
import customTheme from "../config/customTheme";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    accounts,
    AOS,
    connected,
    connectMetaMask,
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
  } = useContext(PregmaContext);
  const [amount, setAmount] = useState(undefined);
  const [value, setValue] = useState("stake"); // stake || unstake

  useEffect(() => {
    AOS.init({
      once: true,
      disable: window.innerWidth < 768,
      duration: 750,
      easing: "ease-out-quart",
    });
    console.log(value);
  }, []);

  useEffect(() => {
    setAmount(0);
  }, [value]);

  useEffect(() => {
    const init = async () => {
      TotalStaked();
      Index();
      APY();
      YourBalance();
      YourStakedBalance();
      NextRewardAmount();
      NextRewardYield();
      ROIFiveDays();
    };
    if (accounts.length > 0 && tokenContract && stakingContract) init();
  }, [accounts, tokenContract, stakingContract]);

  const handleChange = (event, newValue) => {
    //event.preventDefault();
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1e00ff",
      },
      secondary: {
        light: "#0066ff",
        main: "#0044ff",
        contrastText: "#ffcc00",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

  const StatsTop = () => {
    return (
      <>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:text-center sm:text-start ">
          <div>
            <h1 className="text-2xl text-gray-800 font-medium">APY</h1>
            <h1 className="text-2xl text-cyan-500 font-medium">{apy}%</h1>
          </div>
          <div>
            <h1 className="text-2xl text-gray-800 font-medium">
              Total Value Deposited
            </h1>
            <h1 className="text-2xl text-cyan-500 font-medium">
              {totalStaked} PUMPKIN
            </h1>
          </div>
          <div>
            <h1 className="text-2xl text-gray-800 font-medium">
              Current Index
            </h1>
            <h1 className="text-2xl text-cyan-500 font-medium">
              {index} PUMPKIN
            </h1>
          </div>
        </div>
      </>
    );
  };

  const StatsBottom = () => {
    return (
      <>
        <div className="mt-6 flex flex-col w-full">
          <div className="flex flex-row w-full justify-between text-xl text-gray-800">
            <p>Your Balance</p>
            <p>{yourBalance} PUMPKIN</p>
          </div>
          <div className="flex flex-row w-full justify-between text-xl text-gray-800">
            <p>Your Staked Balance</p>
            <p>{yourStakedBalance} sPUMPKIN</p>
          </div>
          <div className="flex flex-row w-full justify-between text-xl text-gray-800">
            <p>Next Reward Amount</p>
            <p>{nextRewardAmount} sPUMPKIN</p>
          </div>
          <div className="flex flex-row w-full justify-between text-xl text-gray-800">
            <p>Next Reward Yield</p>
            <p>{nextRewardYield}%</p>
          </div>
          <div className="flex flex-row w-full justify-between text-xl text-gray-800">
            <p>ROI (5-Day Rate)</p>
            <p>{nextRewardROIFiveDays}%</p>
          </div>
        </div>
      </>
    );
  };

  const Approval = () => {
    return (
      <>
        <div className="mt-6 flex flex-row w-full">
          <div className="text-gray-800 text-lg leading-none italic text-center justify-center basis-3/4 w-full">
            <p>
              First time staking PUMPKIN? <br /> Please approve PUMPKIN Yields
              to use your PUMPKIN for staking.
            </p>
          </div>

          <button
            className="basis-1/4 hover:bg-transparent bg-cyan-500 text-custom-100 font-semibold hover:text-white px-4 border-2 hover:border-cyan-500 border- 2 border-transparent rounded h-auto w-full"
            onClick={(e) => {
              e.preventDefault();
              approve();
            }}
          >
            Approve
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Inverted Finance</title>
        <meta name="description" content="Earn 2% daily staking $pumpkin" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.inverted.to/" />
        <meta property="og:title" content="Inverted Finance" />
        <meta
          property="og:description"
          content="Earn 2% daily staking $pumpkin"
        />
        <meta
          property="og:image"
          content="https://www.inverted.to/assets/images/logo.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.inverted.to/" />
        <meta property="twitter:title" content="Inverted Finance" />
        <meta
          property="twitter:description"
          content="Earn 2% daily staking $pumpkin"
        />
        <meta
          property="twitter:image"
          content="https://www.inverted.to/assets/images/logo.png"
        />
        <meta property="twitter:site" content="@InvertedFinance" />
        <meta property="twitter:creator" content="@InvertedFinance" />
      </Head>
      <div className="bg-gray-900 flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-hidden overflow-x-hidden ">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="absolute flex inset-0 justify-center">
              <div className="max-w mx-auto  px-4 sm:px-6">
                <div className="pb-12 md:pb-20">
                  {/* Section header */}
                  <div className="text-center pb-12 md:pb-6">
                    <div className="hidden sm:block">
                      <YieldsBg />
                    </div>
                  </div>
                  {/* Hero image */}
                  <div>
                    <div className="relative flex justify-center mb-8">
                      <div className="flex flex-col justify-center">
                        <div
                          className="bg-gray-900 box-content lg:h-full lg:w-auto p-8 
                    border-4 border-cyan-500 rounded shadow-xl shadow-cyan-500/90 mt-20"
                          data-aos="fade-down"
                        >
                          <div className="flex flex-col gap-6">
                            <div className="flex flex-col">
                              <h1 className="text-3xl font-extrabold text-gray-800">
                                Single Stake v2 (3, 3)
                              </h1>
                              <div className="flex flex-row gap-1 ">
                                <h6 className="text-xs font-extrabold text-gray-800">
                                  6 hrs, 30 mins
                                </h6>

                                <h6 className="text-xs text-gray-800">
                                  to next rebase
                                </h6>
                              </div>
                            </div>
                            <StatsTop />
                            <div className="flex flex-col items-center">
                              <>
                                {!connected ? (
                                  <>
                                    <button
                                      className="bg-transparent hover:bg-cyan-500 text-custom-100 font-semibold hover:text-white py-2 px-4 border-2 border-cyan-500 hover:border-transparent rounded"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        connectMetaMask();
                                      }}
                                    >
                                      <h1 className="text-lg">
                                        Connect Wallet
                                      </h1>
                                    </button>
                                    <h6 className="text-xs text-gray-800 mt-4">
                                      Connect your wallet to stake PUMPKIN
                                    </h6>
                                  </>
                                ) : (
                                  <>
                                    <>
                                      <div className="text-sm font-medium text-center text-gray-500  dark:text-gray-400 dark:border-gray-700">
                                        <ThemeProvider theme={theme}>
                                          <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            indicatorColor="primary"
                                            aria-label="secondary tabs example"
                                          >
                                            <Tab
                                              value="stake"
                                              sx={{
                                                display: "inline",
                                                fontWeight: "medium",
                                                fontSize: 20,
                                                textTransform: "none",
                                              }}
                                              icon={
                                                <h1 className="text-custom-100">
                                                  Stake
                                                </h1>
                                              }
                                            />
                                            <Tab
                                              value="unstake"
                                              sx={{
                                                display: "inline",
                                                fontWeight: "medium",
                                                fontSize: 20,
                                                textTransform: "none",
                                              }}
                                              icon={
                                                <h1 className="text-custom-100">
                                                  Unstake
                                                </h1>
                                              }
                                            />
                                          </Tabs>
                                        </ThemeProvider>
                                      </div>
                                    </>
                                    {!isApproved ? (
                                      <Approval />
                                    ) : (
                                      <>
                                        <div className="flex flex-row justify-between mt-4 gap-2 w-full rounded">
                                          {value === "stake" ? (
                                            <>
                                              <Box width="full" round="large">
                                                <Grommet
                                                  theme={customTheme}
                                                  style={{
                                                    backgroundColor: "#111",
                                                    color: "#fff",
                                                  }}
                                                  round="large"
                                                >
                                                  <div className="rounded  shadow-xl shadow-cyan-500/90">
                                                    <Stack
                                                      anchor="right"
                                                      round="large"
                                                    >
                                                      <Box round="large">
                                                        <TextInput
                                                          size="medium"
                                                          placeholder="amount"
                                                          value={amount}
                                                          onChange={(event) => {
                                                            event.preventDefault();
                                                            setAmount(
                                                              event.target.value
                                                            );
                                                          }}
                                                          reverse
                                                        />
                                                      </Box>
                                                      <Box
                                                        onClick={async () => {
                                                          setAmount(
                                                            await getMaxStaking()
                                                          );
                                                        }}
                                                        margin={{
                                                          right: "10px",
                                                        }}
                                                      >
                                                        <Text
                                                          className="font-bold"
                                                          size="small"
                                                        >
                                                          Max
                                                        </Text>
                                                      </Box>
                                                    </Stack>
                                                  </div>
                                                </Grommet>
                                              </Box>
                                              <button
                                                className="w-1/4 hover:bg-transparent bg-cyan-500 text-custom-100 font-semibold hover:text-white px-4 border-2 hover:border-cyan-500 border-transparent rounded"
                                                onClick={async (e) => {
                                                  e.preventDefault();
                                                  await stake(amount);

                                                  setAmount(undefined);
                                                }}
                                              >
                                                Stake
                                              </button>
                                            </>
                                          ) : (
                                            <>
                                              <Box width="full" round="large">
                                                <Grommet
                                                  theme={customTheme}
                                                  style={{
                                                    backgroundColor: "#111",
                                                    color: "#fff",
                                                  }}
                                                  round="large"
                                                >
                                                  <div className="rounded  shadow-xl shadow-cyan-500/90">
                                                    <Stack
                                                      anchor="right"
                                                      round="large"
                                                    >
                                                      <Box round="large">
                                                        <TextInput
                                                          size="medium"
                                                          placeholder="amount"
                                                          value={amount}
                                                          onChange={(event) =>
                                                            setAmount(
                                                              event.target.value
                                                            )
                                                          }
                                                          reverse
                                                        />
                                                      </Box>
                                                      <Box
                                                        onClick={async () => {
                                                          setAmount(
                                                            await getMaxUnstaking()
                                                          );
                                                        }}
                                                        margin={{
                                                          right: "10px",
                                                        }}
                                                      >
                                                        <Text
                                                          className="font-bold"
                                                          size="small"
                                                        >
                                                          Max
                                                        </Text>
                                                      </Box>
                                                    </Stack>
                                                  </div>
                                                </Grommet>
                                              </Box>
                                              <button
                                                className="w-1/4 hover:bg-transparent bg-cyan-500 text-custom-100 font-semibold hover:text-white px-4 border-2 hover:border-cyan-500 border-transparent rounded"
                                                onClick={async (e) => {
                                                  e.preventDefault();
                                                  await unstake(amount);
                                                  setAmount(undefined);
                                                }}
                                              >
                                                Unstake
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      </>
                                    )}

                                    <StatsBottom />
                                  </>
                                )}
                              </>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
