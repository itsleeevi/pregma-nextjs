import React, { useState, useContext } from "react";
import { PregmaContext } from "../contexts/PregmaContext";
import pumpkin from "../public/images/pumpkin.png";
import Image from "next/image";

function Header() {
  const {
    connectMetaMask,
    connected,
    disconnectMetaMask,
    setSidebarOpen,
    sidebarOpen,
  } = useContext(PregmaContext);

  return (
    <header className="sticky top-0 bg-gray-900 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-custom-100 hover:text-custom-100 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <button className="bg-transparent hover:bg-cyan-500 text-custom-100  font-semibold hover:text-white py-2 px-4 border-2 border-cyan-500 hover:border-transparent rounded inline-flex items-center gap-2">
              <Image src={pumpkin} width={20} height={20} />
              <span className="lg:text-lg xs:text-sm">PUMPKIN</span>
            </button>
            {connected ? (
              <>
                <button
                  className="bg-transparent hover:bg-cyan-500 text-custom-100 font-semibold hover:text-white py-2 px-4 border-2 border-cyan-500 hover:border-transparent rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    disconnectMetaMask();
                  }}
                >
                  <h1 className="lg:text-lg xs:text-sm">Disconnect</h1>
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-transparent hover:bg-cyan-500 text-custom-100 font-semibold hover:text-white py-2 px-4 border-2 border-cyan-500 hover:border-transparent rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    connectMetaMask();
                  }}
                >
                  <h1 className="lg:text-lg  xs:text-sm">Connect</h1>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
