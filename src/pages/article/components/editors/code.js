import styles from "./code.module.css";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

export default function Code({ codeString }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setInterval(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className={styles["code-box"]}>
      <div className={styles["code-top"]}>
        <div>Code</div>
        {!copied && (
          <div
            onClick={() => handleCopy(codeString)}
            className={styles["copyButton"]}
          >
            {" "}
            ✂️ Copy Code{" "}
          </div>
        )}
        {copied && <div>✔️ Copied</div>}
      </div>
      <div className={styles["syntax-highlighter"]}>
        <SyntaxHighlighter
          showLineNumbers={true}
          showInlineLineNumbers={true}
          language="java"
          style={nightOwl}
          customStyle={{
            padding: "2.5rem",
            fontFamily: "Segoe UI",
          }}
          className={styles["syntax-highlighter-main"]}
          wrapLongLines={true}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
