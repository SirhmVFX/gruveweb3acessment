"use client";

import { ConnectButton } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import FileUpload from "@/components/fileUpload";
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "", // Add your thirdweb clientId here
});

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "telegram",
        "farcaster",
        "email",
        "line",
        "passkey",
        "phone",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <div className="p-10 border border-gray-800 rounded-3xl flex flex-col ">
        <ConnectButton
          client={client}
          wallets={wallets}
          connectModal={{ size: "wide" }}
        />
        <FileUpload />
      </div>{" "}
    </div>
  );
}
