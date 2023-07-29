import styles from "./DownloadItem.module.css";
import { Tooltip } from "react-tooltip";
import { useFormatDate } from "../../../../hooks/utils/useFormatDate";

export default function DownloadItem({ download }) {
  const { timeSince } = useFormatDate();

  return (
    <div className={styles["download"]}>
      <div className={styles["icon"]}>
        <i className="fa-solid fa-file-arrow-down"></i>
      </div>
      <div className={styles["main-container"]}>
        <div className={styles["top-container"]}>
          <div
            className={`${styles["download-topic"]} ${
              styles[download.status === "error" ? "strike" : ""]
            }`}
          >
            {download.topic}
          </div>
        </div>
        {download.status === "downloaded" && (
          <div className={styles["h4"]}>
            Downloaded: {timeSince(download.updatedAt)} ago
          </div>
        )}
        {download.status === "queued" && (
          <div className={styles["h4"]}>
            Added to Queue: {timeSince(download.updatedAt)} ago
          </div>
        )}
        {download.status === "error" && (
          <div className={styles["h4"]}>Failed - Forbidden</div>
        )}
        {download.status === "downloading" && (
          <div className={`${styles["h4"]} ${styles["animate"]}`}>
            Downloading...
          </div>
        )}
      </div>
      <div className={styles["downloadStatus"]}>
        {download.status === "downloaded" && (
          <div
            style={{
              color: "rgb(23, 236, 23)",
              position: "relative",
            }}
            data-tooltip-id={download._id}
            data-tooltip-content="completed"
            data-tooltip-place="top"
            data-tooltip-variant="success"
          >
            <div
              style={{
                backgroundColor: "black",
                padding: "1rem",
                borderRadius: "50%",
                position: "absolute",
                top: "0.6rem",
                left: "0.3rem",
                zIndex: "1",
              }}
            ></div>
            <i
              className="fa-solid fa-circle-check"
              style={{ position: "relative", zIndex: "3" }}
            ></i>
            <Tooltip
              id={download._id}
              style={{
                fontSize: "1.6rem",
                backgroundColor: "orangered",
                padding: "0.4rem 0.8rem",
              }}
            />
          </div>
        )}
        {download.status === "queued" && (
          <div
            data-tooltip-id={download._id}
            data-tooltip-content="queued"
            data-tooltip-place="top"
            data-tooltip-variant="success"
          >
            <div>⏱</div>

            <Tooltip
              id={download._id}
              style={{
                fontSize: "1.6rem",
                backgroundColor: "magenta",
                padding: "0.4rem 0.8rem",
              }}
            />
          </div>
        )}

        {download.status === "downloading" && (
          <div
            style={{ position: "relative" }}
            data-tooltip-id={download._id}
            data-tooltip-content="downloading"
            data-tooltip-place="top"
            data-tooltip-variant="info"
          >
            <div
              style={{
                backgroundColor: "black",
                padding: "0.7rem",
                borderRadius: "50%",
                position: "absolute",
                top: "1rem",
                left: "0.7rem",
                zIndex: "1",
              }}
            ></div>
            <i
              className={`fa-solid fa-cloud-arrow-down ${styles["downloading"]}`}
              style={{ position: "relative", zIndex: "3" }}
            ></i>
            <Tooltip
              id={download._id}
              style={{
                fontSize: "1.6rem",
                backgroundColor: "#007FFF",
                padding: "0.4rem 0.8rem",
              }}
            />
          </div>
        )}
        {download.status === "error" && (
          <div
            style={{ color: "#FF1A1A", position: "relative" }}
            data-tooltip-id={download._id}
            data-tooltip-content="failed"
            data-tooltip-place="top"
            data-tooltip-variant="error"
          >
            <div
              style={{
                backgroundColor: "black",
                padding: "1rem",
                borderRadius: "50%",
                position: "absolute",
                top: "0.6rem",
                left: "0.3rem",
                zIndex: "1",
              }}
            ></div>
            <i
              className="fa-solid fa-circle-exclamation"
              style={{ position: "relative", zIndex: "3" }}
            ></i>

            <Tooltip
              id={download._id}
              style={{
                fontSize: "1.6rem",
                backgroundColor: "#FF1A1A",
                padding: "0.4rem 0.8rem",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
