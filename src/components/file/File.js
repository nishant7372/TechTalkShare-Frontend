import { useNavigate } from "react-router-dom";
import {
  useAddToPinned,
  useAddToStarred,
  useRemoveFromPinned,
  useRemoveFromStarred,
} from "../../hooks/store/storeApis";
import styles from "./File.module.css";
import { useHandleResponse } from "../../hooks/utils/useHandleResponse";
import Spinner from "../loaders/spinner/Spinner";
import { useState } from "react";

export default function File({
  fileName,
  date,
  isStarred,
  isPinned,
  isRecent,
  url,
  id,
  fetchStarred,
  fetchPinned,
  fetchFolder,
  selectOn,
  showPinned = true,
  showStarred = true,
  handleSelect,
}) {
  const { addToStarred, isPending: starPending } = useAddToStarred();
  const { addToPinned, isPending: pinPending } = useAddToPinned();
  const { removeFromStarred, isPending: removePending } =
    useRemoveFromStarred();
  const { removeFromPinned, isPending: unpinPending } = useRemoveFromPinned();

  const { handleResponse } = useHandleResponse();
  const [checked, setChecked] = useState(false);

  const refetch = async () => {
    if (fetchStarred) await fetchStarred();
    if (fetchPinned) await fetchPinned();
    if (fetchFolder) await fetchFolder();
  };

  const handleStarClick = async () => {
    const res = isStarred
      ? await removeFromStarred(id)
      : await addToStarred({ id });
    handleResponse(res);
    refetch();
  };

  const handlePinClick = async () => {
    const res = isPinned
      ? await removeFromPinned(id)
      : await addToPinned({ id });
    handleResponse(res);
    refetch();
  };

  const handleChange = (val) => {
    setChecked(val);
    handleSelect(val, id);
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    // Check if the clicked element has class names related to star or pin icons
    const isStarIconClicked = e.target.classList.contains("fa-star");
    const isPinIconClicked = e.target.classList.contains("fa-thumbtack");

    // If clicked on star or pin icon, do not navigate
    if (isStarIconClicked || isPinIconClicked) {
      return;
    }

    // If not clicked on star or pin icon and not in select mode, navigate to the URL
    if (!selectOn) {
      navigate(url);
    }
  };

  return (
    <div onClick={handleClick} className={styles["fileBox"]}>
      {selectOn ? (
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            handleChange(e?.target?.checked);
          }}
          className={styles.checkBox}
        />
      ) : (
        <>
          {showPinned && (
            <i
              className={`fa-solid fa-thumbtack ${styles.pin} ${
                isPinned ? styles["pinned"] : styles["pin-noselect"]
              }`}
              onClick={handlePinClick}
            />
          )}
          {showStarred && (
            <i
              className={`fa-${isStarred ? "solid" : "regular"} fa-star ${
                styles.star
              } ${isStarred ? styles["starred"] : ""}`}
              onClick={handleStarClick}
            />
          )}
          {isRecent && (
            <i className={`fa-solid fa-clock-rotate-left ${styles.recent}`}></i>
          )}
        </>
      )}
      <div className={styles["innerFileBox"]}>
        <i className={`fa-solid fa-file-pdf ${styles.fileIcon}`}></i>
        <div className={styles["fileName"]}>{fileName}</div>
        <span className={styles["date"]}>{date}</span>
      </div>
      {(starPending || removePending || pinPending || unpinPending) && (
        <div className={styles["overlay"]}>
          <Spinner
            spinnerStyles={{
              width: "5rem",
              height: "5rem",
            }}
          />
        </div>
      )}
    </div>
  );
}
