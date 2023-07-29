import styles from "./Article.module.css";

import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { useFormatDate } from "../../../../../hooks/utils/useFormatDate";

import Tag from "../../../../../components/tags/Tag";
import images from "../../../../../constants/images";

export default function Article({ article, updated, handleShare }) {
  const { timeSince } = useFormatDate();

  const color = ["skyblue", "magenta", "green", "orange"].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className={styles["article"]}>
      <div className={styles["icon"]}>
        <img src={images.note} alt="note" className={styles["icon-img"]} />
        {article.downloaded && (
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
      </div>
      <div className={styles["main-container"]}>
        <div className={styles["top-container"]}>
          <Link
            to={`/articles/${article._id}`}
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
            Created At: {timeSince(article.createdAt)} ago
          </div>
        )}
        {updated && (
          <div className={styles["h4"]}>
            Updated At: {timeSince(article.updatedAt)} ago
          </div>
        )}
      </div>
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
