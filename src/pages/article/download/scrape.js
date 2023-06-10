import { useState } from "react";
import { useLeetcodeScrape } from "../../../hooks/article/useLeetcodeScrape";
import AnimatedButton from "../../../Components/button/animatedButton";
import styles from "./scrape.module.css";
import Input from "../../../Components/input/Input";
import DownloadItem from "./downloadItem";
import { useAuthContext } from "../../../hooks/context/useAuthContext";
import { useMessageContext } from "../../../hooks/context/useMessageContext";
import { Link } from "react-router-dom";

export default function Scrape() {
  const [URL, setURL] = useState("");
  const { leetcodeScrape } = useLeetcodeScrape();
  const { socketId, activeDownloads, user } = useAuthContext();
  const { dispatch: messageDispatch } = useMessageContext();

  const handleChange = (e) => {
    setURL(e.target.value);
  };

  const filter = (activeDownloads) => {
    return activeDownloads.filter((download) => download.owner === user._id);
  };

  const handleDownload = async () => {
    let url = URL;
    setURL("");
    const res = await leetcodeScrape({ url, socketId });
    if (res.error) {
      messageDispatch({ type: "ERROR", payload: res.error });
    }
  };

  return (
    <div className={styles["download-container"]}>
      <div className={styles["input-container"]}>
        <Input
          type={"text"}
          value={URL}
          name={"discussurl"}
          required={true}
          autoFocus={true}
          placeholder={"Enter LeetCode Discuss URL"}
          setState={handleChange}
          inputStyle={{
            width: "calc(100% - 6rem)",
            backgroundColor: "#05010c",
            padding: "0.8rem",
          }}
        />
        <AnimatedButton
          icon={<i className="fa-solid fa-cloud-arrow-down"></i>}
          buttonStyle={{
            fontSize: "1.8rem",
            padding: "0.4rem 0.4rem",
            width: "3rem",
            textAlign: "center",
            borderRadius: "50%",
            backgroundColor: "#05010c",
            border: "2px solid orange",
          }}
          type="downloadBt"
          action={handleDownload}
        />
      </div>
      <div className={styles["download-header"]}>
        <div className="flex-row">
          <i className="fa-solid fa-download"></i> Active Downloads
        </div>
        <Link to="/downloads" className={styles["download-history"]}>
          <i className="fa-solid fa-clock-rotate-left"></i> History
        </Link>
      </div>
      {activeDownloads &&
        filter(activeDownloads).map((download, index) => (
          <DownloadItem key={index} download={download} />
        ))}
      {activeDownloads && activeDownloads.length === 0 && (
        <div className={styles["no-download-found"]}>No Active Download.</div>
      )}
      <div className={styles["download-footer"]}></div>
    </div>
  );
}
