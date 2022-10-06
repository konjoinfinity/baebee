// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// log
import { fetchData } from "../data/dataActions";
import NodeWalletConnect from "@walletconnect/node";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";

// Create connector
const walletConnector = new NodeWalletConnect(
  {
    bridge: "https://bridge.walletconnect.org", // Required
  },
  {
    clientMeta: {
      description: "WalletConnect NodeJS Client",
      url: "https://nodejs.org/en/",
      icons: ["https://nodejs.org/static/images/logo.svg"],
      name: "WalletConnect",
    },
  }
);

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG = await configResponse.json();
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        if (networkId == CONFIG.NETWORK.ID) {
          const SmartContractObj = new Web3EthContract(
            abi,
            CONFIG.CONTRACT_ADDRESS
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
      // Check if connection is already established
if (!walletConnector.connected) {
  // create new session
  walletConnector.createSession().then(() => {
    // get uri for QR Code modal
    const uri = walletConnector.uri;
    // display QR Code modal
    WalletConnectQRCodeModal.open(
      uri,
      () => {
        console.log("QR Code Modal closed");
      },
      true // isNode = true
    );
  });
}

// Subscribe to connection events
walletConnector.on("connect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Close QR Code Modal
  WalletConnectQRCodeModal.close(
    true // isNode = true
  );

  // Get provided accounts and chainId
  const { accounts, chainId } = payload.params[0];
});

walletConnector.on("session_update", (error, payload) => {
  if (error) {
    throw error;
  }

  // Get updated accounts and chainId
  const { accounts, chainId } = payload.params[0];
});

walletConnector.on("disconnect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Delete walletConnector
});
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
