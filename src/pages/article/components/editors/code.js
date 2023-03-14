import styles from "./code.module.css";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

export default function Code() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setInterval(() => {
      setCopied(false);
    }, 3000);
  };

  const codeString = `import java.util.Scanner;

    public class HelloWorld {
    
        public static void main(String[] args) {
    
            // Creates a reader instance which takes
            // input from standard input - keyboard
            Scanner reader = new Scanner(System.in);
            System.out.print("Enter a number: ");
    
            // nextInt() reads the next integer from the keyboard
            int number = reader.nextInt();
    
            // println() prints the following line to the output screen
            System.out.println("You entered: " + number);
        }
    }`;

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
