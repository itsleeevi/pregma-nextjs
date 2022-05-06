import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useEffect, useState, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PregmaContext } from "../contexts/PregmaContext";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import YieldsBg from "../components/YieldsBg";

function Yields() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [value, setValue] = useState("one");
  const { AOS } = useContext(PregmaContext);

  useEffect(() => {
    AOS.init({
      once: true,
      disable: window.innerWidth < 768,
      duration: 750,
      easing: "ease-out-quart",
    });
  }, []);

  const handleChange = (event, newValue) => {
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

  return (
    <div className="bg-gray-900 flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-hidden overflow-x-hidden ">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="absolute flex inset-0 items-center justify-center">
            <div className="max-w mx-auto my-auto px-4 sm:px-6">
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
                          <div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:text-center sm:text-start ">
                            <div>
                              <h1 className="text-2xl text-gray-800 font-medium">
                                APY
                              </h1>
                              <h1 className="text-2xl text-cyan-500 font-medium">
                                200.1%
                              </h1>
                            </div>
                            <div>
                              <h1 className="text-2xl text-gray-800 font-medium">
                                Total Value Deposited
                              </h1>
                              <h1 className="text-2xl text-cyan-500 font-medium">
                                $60,750,176
                              </h1>
                            </div>
                            <div>
                              <h1 className="text-2xl text-gray-800 font-medium">
                                Current Index
                              </h1>
                              <h1 className="text-2xl text-cyan-500 font-medium">
                                8.89 PREGMA
                              </h1>
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <>
                              {/* <button
                      className="bg-transparent hover:bg-blue-900 text-custom-100 font-semibold hover:text-white py-2 px-4 border-2 border-blue-900 hover:border-transparent rounded w-1/4 mb-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setConnected(true);
                      }}
                    >
                      Connect Wallet
                    </button>
                    <h6 className="text-xs  text-gray-800">
                      Connect your wallet to stake PREGMA
                    </h6>*/}
                              <div className="text-sm font-medium text-center text-gray-500  dark:text-gray-400 dark:border-gray-700">
                                <ThemeProvider theme={theme}>
                                  <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    aria-label="secondary tabs example"
                                  >
                                    <Tab
                                      sx={{
                                        display: "inline",
                                        fontWeight: "medium",
                                        fontSize: 20,
                                        textTransform: "none",
                                      }}
                                      value="one"
                                      icon={
                                        <h1 className="text-custom-100">
                                          Stake
                                        </h1>
                                      }
                                    />
                                    <Tab
                                      sx={{
                                        display: "inline",
                                        fontWeight: "medium",
                                        fontSize: 20,
                                        textTransform: "none",
                                      }}
                                      value="two"
                                      icon={
                                        <h1 className="text-custom-100">
                                          Unstake
                                        </h1>
                                      }
                                    />
                                  </Tabs>
                                </ThemeProvider>
                              </div>
                              <div className="mt-6 flex flex-row w-full">
                                <div className="text-gray-800 text-lg leading-none italic text-center justify-center basis-3/4 w-full">
                                  <p>
                                    First time staking PREGMA? <br /> Please
                                    approve Pregma Yields to use your PREGMA for
                                    staking.
                                  </p>
                                </div>

                                <button
                                  className="basis-1/4 hover:bg-transparent bg-cyan-500 text-custom-100 font-semibold hover:text-white px-4 border-2 hover:border-cyan-500 border- 2 border-transparent rounded h-auto w-full"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setConnected(true);
                                  }}
                                >
                                  Approve
                                </button>
                              </div>
                              <div className="mt-6 flex flex-col w-full">
                                <div className="flex flex-row w-full justify-between text-xl text-gray-800">
                                  <p>Your Balance</p>
                                  <p>0.0 PREGMA</p>
                                </div>
                                <div className="flex flex-row w-full justify-between text-xl text-gray-800">
                                  <p>Your Staked Balance</p>
                                  <p>0 sPREGMA</p>
                                </div>
                                <div className="flex flex-row w-full justify-between text-xl text-gray-800">
                                  <p>Next Reward Amount</p>
                                  <p>0.0 sPREGMA</p>
                                </div>
                                <div className="flex flex-row w-full justify-between text-xl text-gray-800">
                                  <p>Next Reward Yield</p>
                                  <p>0.0972%</p>
                                </div>
                                <div className="flex flex-row w-full justify-between text-xl text-gray-800">
                                  <p>ROI (5-Day Rate)</p>
                                  <p>1.4692%</p>
                                </div>
                              </div>
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
  );
}

export default Yields;
