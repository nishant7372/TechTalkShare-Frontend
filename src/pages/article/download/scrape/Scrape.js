import styles from "./Scrape.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import { useLeetcodeScrape } from "../../../../hooks/download/useLeetcodeScrape";

import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../../../features/alertSlice";

import DownloadItem from "../downloadItem/DownloadItem";
import Input from "../../../../components/input/Input";
import AnimatedButton from "../../../../components/buttons/AnimatedButton";
import images from "../../../../constants/images";

export default function Scrape() {
  const [URL, setURL] = useState("");

  const { leetcodeScrape } = useLeetcodeScrape();

  const { socketId, user } = useSelector((store) => store.auth);
  const { activeDownloads } = useSelector((store) => store.download);

  const dispatch = useDispatch();

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
      dispatch(setError(res.error));
    }
  };

  return (
    <>
      <div className={styles["scrape-container"]}>
        <div className={styles["input-container"]}>
          <select className={styles["select"]}>
            <option>LeetCode</option>
            <option>GFG</option>
            <option>CP Algorithms</option>
          </select>
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
      </div>
      <div className={styles["download-container"]}>
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
            <DownloadItem key={index} download={{ ...download, _id: index }} />
          ))}
        {activeDownloads?.length === 0 && (
          <img
            className={styles["empty"]}
            style={{ height: "45rem" }}
            src={images.empty}
            alt="empty"
          />
        )}
        <div className={styles["download-footer"]}></div>
      </div>
    </>
  );
}
