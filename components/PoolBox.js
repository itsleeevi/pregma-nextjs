import Waterfall from "../public/images/waterfall.png";
import { ChevronUpIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";

const PoolBox = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="bg-gray-900 flex flex-col rounded p-6 shadow-xl left-side-box"
        data-aos="zoom-in"
      >
        <div className="flex flex-row justify-between gap-10">
          <Image src={Waterfall} layout="fixed" height="60px" width="60px" />
          <div className="place-end ">
            <h3 className="text-custom-100 font-bold text-2xl tracking-wider">
              WATERFALL
            </h3>
            <div className="flex flex-row gap-1 justify-end">
              <div className="bg-gradient-to-t from-blue-900 to-cyan-500 text-gray-800 font-bold text-center px-1 rounded">
                900x
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <span className="text-custom-100 text-lg tracking-wider">Earn:</span>
          <span className="text-custom-100 text-lg font-medium tracking-wider">
            WATERFALL
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-custom-100 text-2xl tracking-wider">
            Emissions:
          </span>
          <span className="text-custom-100 text-2xl  font-medium tracking-wider">
            Ended
          </span>
        </div>
        <div className="flex flex-row justify-start mt-3">
          <span className="text-custom-100 text-xs tracking-wider">
            WATERFALL EARNED
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col text-center">
            <span className="text-custom-100 text-2xl tracking-wider">123</span>
            <span className="text-custom-100 text-xs tracking-wider">
              ~$123.124 USD
            </span>
          </div>
          <button className="tracking-wider bg-transparent hover:bg-cyan-500 text-custom-100 font-semibold hover:text-white py-2 px-4 border-2 border-cyan-500 hover:border-transparent rounded">
            Harvest
          </button>
        </div>
        <div className="flex flex-row justify-start mt-3">
          <span className="text-custom-100 text-xs tracking-wider">
            WATERFALL STAKED
          </span>
        </div>
        <div className="flex flex-row justify-center">
          <button
            className="mt-1 hover:bg-transparent bg-cyan-500 text-custom-100 font-semibold hover:text-white  py-2 px-4 border-2 hover:border-blue-900 border-2 border-transparent rounded"
            onClick={(e) => {
              e.preventDefault();
              //setConnected(true);
            }}
          >
            Approve Contract
          </button>
        </div>
        <div className="flex flex-row text-gray-800 justify-center mt-10">
          <span className="tracking-widest">Details</span>
          <ChevronUpIcon
            className={`${open ? "transform rotate-180" : ""}  max-h-6 max-w-6`}
          />
        </div>
      </div>
    </>
  );
};

export default PoolBox;
