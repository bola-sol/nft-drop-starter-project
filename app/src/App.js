import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import discordLogo from './assets/Discord-Logo-Color.svg';
import CandyMachine from './CandyMachine';
import logo from './assets/logo.png';

// Constants
const TWITTER_HANDLE = 'RareDonNFT';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const DISCORD_LINK = 'https://discord.gg/dXxEqDCPdK'

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );

          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header"><a href="https://raredon.io"><img src={logo} alt="RareDon" /></a><br></br>RARE<span style={{ color: '#ff6682' }}>DON</span></p>
          <p className="sub-text">6,174 of the Rarest Dons, mint for FREE to join the gang!</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walletAddress */}
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`Follow us on Twitter!`}</a>
          <img alt="Twitter Logo" className="discord-logo" src={discordLogo} />

          <a
            className="footer-text"
            href={DISCORD_LINK}
            target="_blank"
            rel="noreferrer"
          >{`Join our discord!`}</a>
        </div>
      </div>
    </div >
  );
};

export default App;