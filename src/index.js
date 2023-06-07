import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./global.css";
import "./animation.css";
import "react-tooltip/dist/react-tooltip.css";

import App from "./App";

import { AuthContextProvider } from "./contexts/AuthContext";
import { ArticleContextProvider } from "./contexts/ArticleContext";
import { MessageContextProvider } from "./contexts/MessageContext";
import { SharingContextProvider } from "./contexts/SharingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MessageContextProvider>
      <ArticleContextProvider>
        <SharingContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </SharingContextProvider>
      </ArticleContextProvider>
    </MessageContextProvider>
  </React.StrictMode>
);
