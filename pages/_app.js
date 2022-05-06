import "../styles/globals.css";
import "../styles/style.scss";
import "aos/dist/aos.css";

import { PregmaContext } from "../contexts/PregmaContext";

import { useEffect, useState } from "react";
import Web3 from "web3";
import AOS from "aos";

function MyApp({ Component, pageProps }) {
  // web3 hooks
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(undefined);

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
      //router.push("https://metamask.io/");
    }
  };

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
      if (window.ethereum && window.ethereum.isConnected) {
        const accs = await window.ethereum
          .request({
            method: "eth_accounts",
          })
          .catch((err) => {
            console.error(err);
          });
        //const web3 = new Web3(window.ethereum);

        setAccounts(accs);
        //setWeb3(web3);

        if (accs.length > 0) {
          setConnected(true);
        } else setConnected(false);
      }
    };

    init();
  }, []);

  return (
    <PregmaContext.Provider
      value={{ AOS, connected, accounts, web3, connectMetaMask }}
    >
      <Component {...pageProps} />
    </PregmaContext.Provider>
  );
}

export default MyApp;
