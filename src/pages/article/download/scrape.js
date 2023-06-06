import { useState } from "react";
import { useLeetcodeScrape } from "../../../hooks/article/useLeetcodeScrape";
import { useGetDownloads } from "../../../hooks/download/useGetDownloads";
import AnimatedButton from "../../../Components/button/animatedButton";
import styles from "./scrape.module.css";
import Input from "../../../Components/input/Input";
import { useEffect } from "react";
import DownloadItem from "./downloadItem";

export default function Scrape() {
  const [URL, setURL] = useState("");
  const { leetcodeScrape } = useLeetcodeScrape();
  const { getDownloads } = useGetDownloads();
  const [status, setStatus] = useState(false);

  const [downloads, setDownloads] = useState(null);

  const handleChange = (e) => {
    setURL(e.target.value);
  };

  const handleDownload = async () => {
    setStatus((prev) => !prev);
    let url = URL;
    setURL("");
    await leetcodeScrape({ url });
    setStatus((prev) => !prev);
  };

  const sort = (downloads) => {
    downloads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return downloads;
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getDownloads();
      setDownloads(res.data);
    };
    fetch();
  }, [status]);

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
        <i className="fa-solid fa-download"></i> Downloads
      </div>
      {downloads &&
        sort(downloads).map((download) => (
          <DownloadItem key={download._id} download={download} />
        ))}
      {downloads && downloads.length === 0 && (
        <div className={styles["no-download-found"]}>No download found.</div>
      )}
      <div className={styles["download-footer"]}></div>
    </div>
  );
}
