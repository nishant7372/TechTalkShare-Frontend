import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "../src/context/AuthContext";
import { ArticleContextProvider } from "./context/ArticleContext";
import { MessageContextProvider } from "./context/MessageContext";
import { SharedContextProvider } from "./context/SharedContext";
import "react-tooltip/dist/react-tooltip.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MessageContextProvider>
      <ArticleContextProvider>
        <SharedContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </SharedContextProvider>
      </ArticleContextProvider>
    </MessageContextProvider>
  </React.StrictMode>
);
