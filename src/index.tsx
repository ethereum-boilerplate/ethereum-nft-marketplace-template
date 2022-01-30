import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";

/** Get your free Moralis Account https://moralis.io/ */

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;


const Application = () => {
  const isServerInfo = !!(APP_ID && SERVER_URL);
  if (isServerInfo)
    return (
      <MoralisProvider
          children={<App />}
          appId={APP_ID} serverUrl={SERVER_URL}
          initializeOnMount={true}
      />
    );
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        Rename .env.example to .env and inject server url and app id
      </div>
    );
  }
};

ReactDOM.render(
  // <React.StrictMode>
  <Application />,
  // </React.StrictMode>,
  document.getElementById("root")
);
