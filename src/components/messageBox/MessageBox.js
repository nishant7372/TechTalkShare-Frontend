import { useRef } from "react";
import NameLogo from "../avatar/NameAvatar";
import styles from "./MessageBox.module.css";
import MarkdownPreview from "@uiw/react-markdown-preview";
import AnimatedButton from "../buttons/AnimatedButton";

export default function MessageBox({ modalData, nodeRef, handleShowMessage }) {
  const elementRef = useRef(null);
  const enterFullScreen = () => {
    const element = elementRef.current;

    if (element && element.requestFullscreen) {
      element.requestFullscreen();
    }
  };

  return (
    <div className={styles["overlay"]} ref={nodeRef}>
      <div className={styles["modal"]}>
        <div
          data-color-mode="dark"
          className={styles["messageBox"]}
          ref={elementRef}
        >
          <div className={styles["header"]}>
            <NameLogo
              name={modalData?.owner?.name}
              logoStyle={{ marginRight: "1rem" }}
            />
            <div>{modalData?.owner?.name}</div>
            <div>(@{modalData?.owner?.userName})</div>
          </div>
          <MarkdownPreview
            source={modalData?.message}
            className={styles["markdown"]}
          />
        </div>
        <div className={styles["icon-fullscreen"]}>
          <AnimatedButton
            icon={<i className="fa-solid fa-expand"></i>}
            action={enterFullScreen}
            buttonStyle={{
              fontSize: "1.8rem",
              padding: "0.3rem 0.8rem",
              textAlign: "center",
            }}
            type="createBt"
          />
        </div>
        <div className={styles["icon-message"]}>
          <i className="fa-solid fa-message" />
        </div>
        <div
          className={styles["icon-cross"]}
          onClick={() => handleShowMessage(false, null)}
        >
          <i className="fa-solid fa-xmark" />
        </div>
      </div>
    </div>
  );
}
