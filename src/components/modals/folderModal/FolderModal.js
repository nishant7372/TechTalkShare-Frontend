import styles from "./FolderModal.module.css";

import Button from "../../buttons/Button";
import Loading from "../../loaders/loading/Loading";
import Input from "../../input/Input";
import { useEffect, useRef, useState } from "react";

const customStyles = {
  barsIcon: {
    backgroundColor: "#ffffff30",
    padding: "1.5rem",
    fontSize: "1.6rem",
    borderRadius: "50%",
    color: "#ffffffdd",
  },
  plusIcon: {
    backgroundColor: "#ffffff13",
    padding: "1rem 0.8rem",
    borderRadius: "50%",
    color: "#ffffffd6",
    fontSize: "1.6rem",
    boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
  },
  input: {
    backgroundColor: "rgba(36, 37, 41, 1)",
    margin: "2rem 0 2rem 0",
  },
  buttonStyle: { padding: "0.8rem 1.6rem" },
};

export default function FolderModal({
  label,
  nodeRef,
  isActionPending,
  action,
  setOpenModal,
  name,
  buttonLabel,
}) {
  const [folderName, setFolderName] = useState(name);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
    inputRef.current.focus();
  }, []);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      action(folderName);
    } else if (event.keyCode === 27) {
      setOpenModal(false);
    }
  };

  return (
    <div className={styles["overlay"]} ref={nodeRef} onKeyDown={handleKeyDown}>
      <div className={styles["modal"]}>
        <div className={styles["header"]}>
          <div className="flex-row">
            <div className={styles["heading"]}>{label}</div>
            <i
              style={customStyles.barsIcon}
              className="fa-solid fa-bars-staggered"
            />
          </div>
          <Input
            type={"text"}
            placeholder={"Enter Folder name"}
            value={folderName}
            setState={(e) => setFolderName(e.target.value)}
            inputStyle={customStyles.input}
            maxLength={30}
            ref={inputRef}
          />
        </div>

        <div className={styles["footer"]}>
          <Button
            content={"Cancel"}
            type={"customButton2"}
            buttonStyle={customStyles.buttonStyle}
            action={() => setOpenModal(false)}
          />
          {isActionPending ? (
            <Loading action={"post"} />
          ) : (
            <Button
              content={buttonLabel}
              type={"customButton"}
              buttonStyle={customStyles.buttonStyle}
              action={() => action(folderName)}
              tabIndex={0}
              formAction={"submit"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
