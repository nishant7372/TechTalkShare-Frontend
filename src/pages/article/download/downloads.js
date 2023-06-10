import { useState, useEffect } from "react";
import DownloadItem from "./downloadItem";
import { useGetDownloads } from "../../../hooks/download/useGetDownloads";
import Loading from "../../../Components/loading-spinners/loading/loading";
import { useMessageContext } from "../../../hooks/context/useMessageContext";
import styles from "./scrape.module.css";

export default function Downloads() {
  const { getDownloads, isPending } = useGetDownloads();
  const { dispatch: messageDispatch } = useMessageContext();
  const [downloads, setDownloads] = useState(null);

  const sort = (downloads) => {
    downloads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return downloads;
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getDownloads();
      if (res.error) {
        messageDispatch({ type: "ERROR", payload: res.error });
      } else if (res.data) {
        setDownloads(res.data);
      }
    };
    fetch();
  }, []);

  return (
    <div className={styles["download-container"]}>
      {isPending && <Loading action={"mainRead"} />}
      <div className={styles["download-header"]}>
        <div className="flex-row">
          <i className="fa-solid fa-download"></i> Download History
        </div>
      </div>
      {downloads &&
        sort(downloads).map((download) => (
          <DownloadItem key={download._id} download={download} />
        ))}
      {downloads && downloads.length === 0 && (
        <div className={styles["no-download-found"]}>No Recent Downloads.</div>
      )}
      <div className={styles["download-footer"]}></div>
    </div>
  );
}
