import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { PregmaContext } from "../contexts/PregmaContext";
import logo from "../public/images/pregma-yields-logo.png";
import discord from "../public/images/discord.png";
import twitter from "../public/images/twitter.png";

function Sidebar() {
  const { setSidebarOpen, sidebarOpen } = useContext(PregmaContext);
  const router = useRouter();
  //const location = router.router.pathname;
  //const { router.pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  /*let storedSidebarExpanded = "";
  if (typeof window !== "undefined")
    storedSidebarExpanded = localStorage.getItem("sidebar-expanded");

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );*/

  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  /*
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    window.localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
 */

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-72 2xl:!w-72 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex flex-col gap-4 justify-center mt-10 mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-black hover:text-cyan-500"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <div className="cursor-pointer flex justify-center ">
            <Link href="https://www.inverted.to/" className="block">
              <Image src={logo} width="120px" height="80px" />
            </Link>
          </div>

          <h1 className="text-gray-900 text-2xl font-extrabold self-center">
            <Link href="/" className="block">
              Inverted Finance
            </Link>
          </h1>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <ul className="mt-3">
              {/* Stake */}
              <li
                className={`cursor-pointer px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  router.pathname === "/" && "bg-gray-900 text-gray-800"
                }`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Link
                  href="/"
                  className={`block text-gray-900  truncate transition duration-150 ${
                    router.pathname === "/" && "text-gray-800"
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      router.pathname.includes("stake") && "text-gray-800"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span
                      className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                        router.pathname.includes("stake") && "text-gray-800"
                      }`}
                    >
                      Stake
                    </span>
                  </div>
                </Link>
              </li>
              {/* Liquidity */}
              <li
                className={`cursor-pointer px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  router.pathname.includes("liquidity") && "bg-gray-900"
                }`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Link
                  href="/liquidity"
                  className={`block text-gray-900 truncate transition duration-150 ${
                    router.pathname.includes("liquidity") && "text-gray-800"
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      router.pathname.includes("liquidity") && "text-gray-800"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 transform rotate-90"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>

                    <span
                      className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                        router.pathname.includes("liquidity") && "text-gray-800"
                      }`}
                    >
                      Liquidity
                    </span>
                  </div>
                </Link>
              </li>
              {/* Stats */}
              <li
                className={`cursor-pointer px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  router.pathname.includes("stats") && "bg-gray-900"
                }`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Link
                  href="/stats"
                  className={`block text-gray-900 truncate transition duration-150 ${
                    router.pathname.includes("stats") && "text-gray-800"
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      router.pathname.includes("stats") && "text-gray-800"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                    <span
                      className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                        router.pathname.includes("stats") && "text-gray-800"
                      }`}
                    >
                      Stats
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          {/* Social Icons*/}

          <div className="flex gap-6 absolute bottom-0 self-center text-xs uppercase text-slate-500 font-semibold pl-3 pb-3 self-center">
            <a href="https://docs.inverted.to/">
              <button className="flex flex-row text-lg hover:bg-transparent bg-gray-900 text-custom-100 font-semibold hover:text-gray-900 px-4 border-2 hover:border-gray-900 border-transparent rounded-sm">
                <div></div>
                <div>Docs</div>
              </button>
            </a>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
