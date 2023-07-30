import styles from "./../scrape/Scrape.module.css";

import { useState, useEffect } from "react";

import { useGetDownloads } from "../../../../hooks/download/useGetDownloads";

import { useDispatch } from "react-redux";
import { setError } from "../../../../features/alertSlice";

import DownloadItem from "../downloadItem/DownloadItem";
import Loading from "../../../../components/loaders/loading/Loading";
import images from "../../../../constants/images";

export default function Downloads() {
  const { getDownloads, isPending } = useGetDownloads();
  const dispatch = useDispatch();
  const [downloads, setDownloads] = useState(null);

  const sort = (downloads) => {
    downloads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return downloads;
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getDownloads();
      if (res.error) {
        dispatch(setError(res.error));
      } else if (res.data) {
        setDownloads(res.data);
      }
    };
    fetch();
    // eslint-disable-next-line
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

      {downloads?.length === 0 && (
        <img className={styles["empty"]} src={images.empty} alt="empty" />
      )}
      <div className={styles["download-footer"]}></div>
    </div>
  );
}
