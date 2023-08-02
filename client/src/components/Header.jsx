import { ConnectButton } from "web3uikit";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-5 border-b-2">
      <h1 className="py-4 px-4 font-bold text-3xl">Decentralized Lottery </h1>
      <ConnectButton />
    </div>
  );
};

export default Header;
