import Waterfall from "../public/images/pool_icon.png";
import {
  ChevronUpIcon,
  ExternalLinkIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import { useState, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PregmaContext } from "../contexts/PregmaContext";
import { Box, Grommet, Stack, TextInput, Text } from "grommet";
import customTheme from "../config/customTheme";

const PoolBox15Days = () => {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("stake"); // stake || unstake
  const [amount, setAmount] = useState(undefined);

  const {
    isApprovedDeposit,
    approveDepositToken,
    stakePool,
    unstakePool,
    harvest,
    getMaxStakingDeposit,
    getMaxUnstakingDeposit,
    rewardAmountPool,
    stakedAmountPool,
    totalStakedPool,
    vaultRewardPool,
    connected,
    connectMetaMask,
  } = useContext(PregmaContext);

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

  const handleChange = (event, newValue) => {
    //event.preventDefault();
    setValue(newValue);
  };

  return (
    <>
      <div
        className="bg-gray-900 flex flex-col rounded p-6 shadow-xl left-side-box"
        data-aos="zoom-in"
      >
        <div className="flex flex-row justify-between gap-10">
          <Image src={Waterfall} layout="fixed" height="43px" width="77px" />
          <div className="place-end ">
            <h3 className="text-custom-100 font-bold text-2xl tracking-wider">
              PUMPKIN
            </h3>
            <div className="flex flex-row gap-1 justify-end">
              <div className="bg-gradient-to-t from-blue-900 to-cyan-500 text-gray-800 font-bold text-center px-1 rounded">
                {vaultRewardPool}x
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <span className="text-custom-100 text-lg tracking-wider">Earn:</span>
          <span className="text-custom-100 text-lg font-medium tracking-wider">
            PUMPKIN
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-custom-100 text-lg tracking-wider">
            Locking Period:
          </span>
          <span className="text-custom-100 text-lg font-medium tracking-wider">
            15 Days
          </span>
        </div>
        <div className="flex flex-row justify-between"></div>

        {!connected ? (
          <>
            <div className="flex flex-row justify-start mt-3">
              <span className="text-custom-100 text-xs tracking-wider">
                PUMPKINS EARNED
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col text-center">
                <span className="mt-2 text-custom-100 text-2xl tracking-wider">
                  0
                </span>
                {/* 
                <span className="text-custom-100 text-xs tracking-wider">
                  ~$123.124 USD
                </span>
                */}
              </div>
              {/* 
              <button className="tracking-wider bg-transparent hover:bg-cyan-500 text-custom-100 font-semibold hover:text-white py-2 px-4 border-2 border-cyan-500 hover:border-transparent rounded">
                Harvest
              </button> */}
              <button className="mt-2 cursor-not-allowed tracking-wider bg-transparent text-custom-100 font-semibold py-2 px-4 border-2 border-cyan-500 rounded">
                Harvest
              </button>
            </div>
            <div className="flex flex-row justify-start mt-3">
              <span className="text-custom-100 text-xs tracking-wider">
                TOKEN STAKED
              </span>
            </div>
            <div className="flex flex-row justify-center">
              <>
                <button
                  className="mt-2 bg-transparent hover:bg-cyan-500 text-custom-100 font-semibold hover:text-white py-2 px-4 border-2 border-cyan-500 hover:border-transparent rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    connectMetaMask();
                  }}
                >
                  <h1 className="text-lg">Connect Wallet</h1>
                </button>
              </>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row justify-start mt-3">
              <span className="text-custom-100 text-xs tracking-wider">
                PUMPKINS EARNED
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col text-center">
                <span className="text-custom-100 text-2xl tracking-wider">
                  {rewardAmountPool}
                </span>
              </div>

              <div className="flex flex-col">
                {Number(rewardAmountPool) > 0 ? (
                  <>
                    <button
                      className="tracking-wider bg-transparent hover:bg-cyan-500 text-custom-100 font-semibold hover:text-white py-2 px-4 border-2 border-cyan-500 hover:border-transparent rounded"
                      onClick={async (e) => {
                        e.preventDefault();
                        await harvest(amount);
                      }}
                    >
                      Harvest
                    </button>
                  </>
                ) : (
                  <>
                    <button className="mt-2 cursor-not-allowed tracking-wider bg-transparent text-custom-100 font-semibold py-2 px-4 border-2 border-cyan-500 rounded">
                      Harvest
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-start mt-3">
              <span className="text-custom-100 text-xs tracking-wider">
                TOKEN STAKED
              </span>
            </div>
            {!isApprovedDeposit ? (
              <>
                <button
                  className="mt-2 w-100 py-2 hover:bg-transparent text-sm bg-cyan-500 text-custom-100 font-semibold hover:text-white px-4 border-2 hover:border-cyan-500 border-transparent rounded"
                  onClick={async (e) => {
                    e.preventDefault();
                    await approveDepositToken();
                  }}
                >
                  Approve Contract
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col text-center">
                    <span className="text-custom-100 text-2xl tracking-wider">
                      {stakedAmountPool}
                    </span>
                  </div>
                  {Number(stakedAmountPool) > 0 ? (
                    <>
                      <button
                        className="w-100 py-2 hover:bg-transparent text-sm bg-cyan-500 text-custom-100 font-semibold hover:text-white px-4 border-2 hover:border-cyan-500 border-transparent rounded"
                        onClick={async (e) => {
                          e.preventDefault();
                          await unstakePool();
                          setAmount(undefined);
                        }}
                      >
                        Harvest & Withdraw
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="cursor-not-allowed w-100 py-2   text-sm bg-cyan-500 text-custom-100 font-semibold   px-4 border-2 hover:border-cyan-500 border-transparent rounded">
                        Harvest & Withdraw
                      </button>
                    </>
                  )}
                </div>

                <div className="flex flex-row justify-center mt-6 gap-2 rounded">
                  <Box round="large">
                    <Grommet
                      theme={customTheme}
                      style={{
                        backgroundColor: "#111",
                        color: "#fff",
                      }}
                      round="large"
                    >
                      <div className="rounded  shadow-xl shadow-cyan-500/90">
                        <Stack anchor="right" round="large">
                          <Box round="large">
                            <TextInput
                              size="xsmall"
                              placeholder="amount"
                              value={amount}
                              onChange={(event) => {
                                event.preventDefault();
                                setAmount(event.target.value);
                              }}
                              reverse
                            />
                          </Box>
                          <Box
                            onClick={async () => {
                              setAmount(await getMaxStakingDeposit());
                            }}
                            margin={{
                              right: "10px",
                            }}
                          >
                            <Text className="font-bold" size="small">
                              Max
                            </Text>
                          </Box>
                        </Stack>
                      </div>
                    </Grommet>
                  </Box>
                  <button
                    className="w-min text-sm hover:bg-transparent bg-cyan-500 text-custom-100 font-semibold hover:text-white px-4 border-2 hover:border-cyan-500 border-transparent rounded"
                    onClick={async (e) => {
                      e.preventDefault();
                      await stakePool(amount);

                      setAmount(0);
                    }}
                  >
                    Stake
                  </button>
                </div>
              </>
            )}
          </>
        )}

        <div
          className="cursor-pointer flex flex-row text-gray-800 justify-center items-center mt-10"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <>
            <span className="tracking-widest">Details</span>
            <InformationCircleIcon className={`  max-h-4 max-w-4`} />
          </>
        </div>

        <>
          <div className="flex flex-col gap-0">
            <div className="flex flex-row justify-between">
              <span className="pt-6 text-custom-100 text-lg tracking-wider">
                Deposit:
              </span>
              <span className="pt-6 text-custom-100 text-lg  font-medium tracking-wider">
                <a
                  className="flex flex-row align-center"
                  href="https://spooky.fi/"
                >
                  <p>Token</p>
                  <ExternalLinkIcon className="max-h-6 max-w-6" />
                </a>
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="text-custom-100 text-lg tracking-wider">
                Total Liquidity:
              </span>
              <span className="text-custom-100 text-lg  font-medium tracking-wider">
                {totalStakedPool}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <a
                className="text-cyan-500 text-lg tracking-widest"
                href="https://rinkeby.etherscan.io/address/0x784d9de8f43ad2fb782c487e95c9fd7b9b72fb71"
              >
                View on FtmScan
              </a>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default PoolBox15Days;