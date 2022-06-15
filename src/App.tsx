import "./App.css";
import { useMemo } from "react";
import * as anchor from "@project-serum/anchor";
import Home from "./Home";
import { DEFAULT_TIMEOUT } from "./connection";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from "@solana/wallet-adapter-wallets";
import TypeWriterEffect from "react-typewriter-effect";

import styled from "styled-components";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID!
    );

    return candyMachineId;
  } catch (e) {
    console.log("Failed to construct CandyMachineId", e);
    return undefined;
  }
};

const candyMachineId = getCandyMachineId();
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl("devnet")
);

const ChatBubble = styled.div`
  background: #f5f5f5;
  border: solid 2px;
  border-radius: 5px;
  padding: 15px;
  max-width: 420px;
  margin: auto;
  margin-top: 30px;
  box-shadow: 3px 3px 0px 1px rgba(82, 82, 82, 0.88);
  -webkit-box-shadow: 3px 3px 0px 1px rgba(82, 82, 82, 0.88);
  -moz-box-shadow: 3px 3px 0px 1px rgba(82, 82, 82, 0.88);
`;

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSlopeWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <ChatBubble>
              Nobody:
              <br />
              <br /> You, probably:
              <TypeWriterEffect
                textStyle={{
                  marginTop: 10,
                  fontFamily: "Spartan",
                  color: "#3F3D56",
                  fontWeight: 600,
                  fontSize: "1em",
                  lineHeight: "1.25em",
                }}
                startDelay={999}
                cursorColor="#3F3D56"
                multiText={[
                  "Noses are the next Okay Bears.",
                  "Sell me all your noses for 0.01 SOL and fuck off.",
                  "I need to tell FoxyDev about this mint site.",
                  "Rug me harder daddy!",
                  "Wow, these Noses are amazing!",
                  "0.25 SOL is like what, $6.9? Nice.",
                  "OMG I get an EYE with my NOSE NFT?",
                  "You're telling me I can combine body part NFTs into a full body NFT? Say less fam.",
                  "Staking? SO ORIGINAL I LOVE STAKING NFTs",
                  "Duppies? Step aside. It's Nose Age baby.",
                  "DeGods was created to pave way for Noses.",
                  "I was just on a Skype call with some Asian whales, they said they will sweep the Noses all the way to Shangri-la.",
                  "I'm going to tell all the DAOs I'm in. This is a revolutionary degen mint. I am speechless.",
                  "What? There's a website? I heard Primates launched without a website.",
                  "Wristbands? I heard Nose Age OGs get Vicks inhaler sticks.",
                  "They say smell the rumour, buy the sneewze... Wait, what?",
                  "Oh my gosh these are so corny! I LOVE THEM.",
                  "Am I really saying these? I read them and said them in my head, I guess.",
                  "Ok, I'll mint one, it's only 0.25 SOL.",
                  "Wait no, STOP PLAYING MIND GAMES WITH ME, NOSE DEV.",
                  "...",
                  "What's the next hyped mint, Duppies? That's like a month away. I NEED TO MINT A NOSE.",
                  "Bruh. Stop putting words in my head.",
                  "Not funny.",
                  "0.25 SOL? Free.",
                  "Why am I still reading these lol.",
                  "Bullish on the Noses.",
                  "General Sol needs to hear about these Noses.",
                  "Wow the mint button changes text every time I refresh.",
                  "Why didn't the dev just make it cycle like these texts?",
                  "I should be asking more important questions.",
                  "AMA is happening on the discord rn? I gotta check it out.",
                  "I will mint and immediately list for a loss.",
                  "Buy the top, sell the bottom.",
                  "I heard collab managers wouldn't even take payment to shill these noses... BuLlIsH!"
                ]}
                multiTextDelay={999}
                typeSpeed={10}
                multiTextLoop={true}
              />
            </ChatBubble>
            <div
              style={{
                position: "fixed",
                width: "100%",
                bottom: 0,
                paddingBottom: 30,
              }}
            >
              <Home
                candyMachineId={candyMachineId}
                connection={connection}
                txTimeout={DEFAULT_TIMEOUT}
                rpcHost={rpcHost}
                network={network}
              />
              <div
                style={{ margin: "auto", marginTop: 10, textAlign: "center" }}
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://twitter.com/noseagenft"
                >
                  birdapp
                </a>{" "}
                |{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://noseagenft.com"
                >
                  website
                </a>{" "}
                |{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://discord.gg/t5wc8x2Htz"
                >
                  discord
                </a>
              </div>
            </div>
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

export default App;
