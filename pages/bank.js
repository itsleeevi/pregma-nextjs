import React, { useState, useContext, useEffect } from "react";
import { PregmaContext } from "../contexts/PregmaContext";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Bank = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { AOS, connected } = useContext(PregmaContext);

  useEffect(() => {
    AOS.init({
      once: true,
      disable: window.innerWidth < 768,
      duration: 750,
      easing: "ease-out-quart",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Bank | Inverted Finance</title>
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
            <div className="absolute flex inset-0 items-center justify-center">
              <div className="max-w mx-auto my-auto px-4">
                <div className="pb-12 md:pb-20">
                  {/* Section header */}
                  <div className="flex justify-center text-center mx-auto mt-28 xs:ml-20 xs:mt-32">
                    <div className=" triangles">
                      <div className="triangle"></div>
                      <div className="triangle"></div>
                      <div className="triangle"></div>
                    </div>
                  </div>
                  <div className="pb-12 md:pb-20 p-6">
                    <div
                      className="grid grid-cols-2 xs:grid-cols-1 gap-4 lg:gap-20 md:grid-cols-4 text-center"
                      data-aos-id-stats
                    >
                      {/* 1st item */}
                      <div
                        className="bg-gray-900 py-10 px-10 border-4 border-cyan-500 rounded shadow-xl shadow-cyan-500/90"
                        data-aos="fade-down"
                        data-aos-anchor="[data-aos-id-stats]"
                      >
                        <div className="text-gray-800 font-red-hat-display text-3xl font-extrabold tracking-tighter">
                          9.9M
                        </div>
                        <div className="text-gray-400 font-semibold">
                          Treasury
                        </div>
                      </div>
                      {/* 2nd item */}
                      <div
                        className="bg-gray-900 py-10 px-10 border-4 border-cyan-500 rounded shadow-xl shadow-cyan-500/90"
                        data-aos="fade-down"
                        data-aos-anchor="[data-aos-id-stats]"
                      >
                        <div className="text-gray-800 font-red-hat-display text-3xl font-extrabold tracking-tighter">
                          $9.9B
                        </div>
                        <div className="text-gray-400 font-semibold">
                          Market Cap
                        </div>
                      </div>
                      {/* 3rd item */}
                      <div
                        className="bg-gray-900 py-10 px-10 border-4 border-cyan-500 rounded shadow-xl shadow-cyan-500/90"
                        data-aos="fade-down"
                        data-aos-anchor="[data-aos-id-stats]"
                      >
                        <div className="text-gray-800 font-red-hat-display text-3xl font-extrabold tracking-tighter">
                          $99
                        </div>
                        <div className="text-gray-400 font-semibold">Price</div>
                      </div>
                      {/* 4th item */}
                      <div
                        className="bg-gray-900 py-10 px-10 border-4 border-cyan-500 rounded shadow-xl shadow-cyan-500/90"
                        data-aos="fade-down"
                        data-aos-anchor="[data-aos-id-stats]"
                      >
                        <div className="text-gray-800 font-red-hat-display text-3xl font-extrabold tracking-tighter ">
                          999%
                        </div>
                        <div className="text-gray-400 font-semibold">APY</div>
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
};

export default Bank;
