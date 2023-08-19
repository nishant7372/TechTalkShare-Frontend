import styles from "./Row.module.css";

import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import Tag from "../tags/Tag";
import images from "../../constants/images";
import { useFormatDate } from "../../hooks/utils/useFormatDate";

export default function Row({
  article,
  updated,
  handleShare,
  query,
  handleShowMessage,
}) {
  const { timeSince } = useFormatDate();

  const color = ["skyblue", "magenta", "green", "orange"].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className={styles["row"]}>
      <div className={styles["icon"]}>
        <img src={images.note} alt="note" className={styles["icon-img"]} />
        {query !== "sharing" && article.downloaded && (
          <>
            <div
              style={{
                backgroundColor: "white",
                padding: "0.7rem",
                borderRadius: "50%",
                position: "absolute",
                bottom: "0.6rem",
                right: "0rem",
              }}
            ></div>
            <i
              className={`fa-solid fa-cloud-arrow-down ${styles["d-icon"]}`}
            ></i>
          </>
        )}
        {query === "sharing" && (
          <i
            className={`fa-solid fa-reply ${styles["d-icon"]}`}
            style={{
              right: "-0.6rem",
              bottom: "0.7rem",
            }}
          ></i>
        )}
      </div>
      <div className={styles["main-container"]}>
        <div className={styles["top-container"]}>
          <Link
            to={
              query === "sharing"
                ? `/shared/${article._id}`
                : `/articles/${article._id}`
            }
            className={styles["article-topic"]}
          >
            {article.topic}
          </Link>
          <div className={styles["tag-container"]}>
            {article.tags.slice(0, 3).map((tag, index) => (
              <Tag key={index} tag={tag} color={color[index]} />
            ))}
            {[...article.tags].length > 3 && (
              <Tag
                tag={{ value: `+${article.tags.length - 3} more` }}
                color={"transparent"}
              />
            )}
          </div>
        </div>
        {!updated && (
          <div className={styles["h4"]}>
            {query === "sharing" ? `Shared At` : `Created At`} :{" "}
            {timeSince(article.createdAt)} ago
            {query === "sharing" && !article?.editPermission && (
              <span className={styles["readOnly"]}>Read Only</span>
            )}
          </div>
        )}
        {updated && (
          <div className={styles["h4"]}>
            Updated At: {timeSince(article.updatedAt)} ago
            {query === "sharing" && !article?.editPermission && (
              <span className={styles["readOnly"]}>Read Only</span>
            )}
          </div>
        )}
        {query === "sharing" && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div className={styles["h2"]}>
              Owner: {article?.owner?.userName} ({article?.owner?.name})
            </div>
            {article.message && (
              <div
                onClick={() =>
                  handleShowMessage(true, {
                    message: article?.message,
                    owner: article?.owner,
                    createdAt: article?.createdAt,
                  })
                }
              >
                <i
                  className={`fa-solid fa-message ${styles["message-icon"]}`}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {query === "article" && (
        <div
          className={styles["shareButton"]}
          onClick={() => handleShare(article._id)}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Share"
          data-tooltip-place="top"
          data-tooltip-variant="info"
        >
          <i className="fa-solid fa-share"></i>
        </div>
      )}
      <Tooltip
        id="my-tooltip"
        style={{
          fontSize: "1.6rem",
          backgroundColor: "#007FFF",
          padding: "0.4rem 0.8rem",
        }}
      />
    </div>
  );
}
