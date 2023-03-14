import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ArticleContextProvider } from "./contexts/ArticleContext";
import { MessageContextProvider } from "./contexts/MessageContext";
import { SharingContextProvider } from "./contexts/SharingContext";
import "react-tooltip/dist/react-tooltip.css";

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
