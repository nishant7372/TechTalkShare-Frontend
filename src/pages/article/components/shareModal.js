import styles from "./shareModal.module.css";
import { useState } from "react";
import { useShareArticle } from "./../../../hooks/sharing/useShareArticle";
import { useMessageContext } from "../../../hooks/context/useMessageContext";

export default function ShareModal({ articleShare, setOpenShareModal }) {
  const [userName, setUserName] = useState("");
  const { shareArticle, isPending } = useShareArticle();
  const { dispatch } = useMessageContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await shareArticle({ articleID: articleShare, userName });
    if (res.ok) {
      dispatch({ type: "SUCCESS", payload: res.ok });
      setOpenShareModal(false);
    } else if (res.error) {
      dispatch({ type: "ERROR", payload: res.error });
    }
  };

  return (
    <div className={styles["overlay"]}>
      <form className={styles["shareModal"]} onSubmit={handleSubmit}>
        <div
          className={styles["cancelButton"]}
          onClick={() => setOpenShareModal(false)}
        >
          X
        </div>
        <input
          type="userName"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          placeholder={"Enter userName"}
          className={styles["shareInput"]}
          required
        />
        <button className={styles["shareButton"]}>Share</button>
      </form>
    </div>
  );
}
