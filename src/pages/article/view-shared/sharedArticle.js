import styles from "./../view-owner/article.module.css";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { useFormatDate } from "../../../hooks/utils/useFormatDate";

import Tag from "../components/tag/tag";

export default function SharedArticle({ articleObj, updated, handleShare }) {
  const { article, sharedBy } = articleObj;
  const { timeSince } = useFormatDate();

  const color = ["skyblue", "magenta", "green", "orange"].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className={styles["article"]}>
      <div className={styles["icon"]}>
        <img
          src={process.env.PUBLIC_URL + "/img/note.png"}
          alt="note"
          className={styles["icon-img"]}
        />
      </div>
      <div className={styles["main-container"]}>
        <div className={styles["top-container"]}>
          <Link
            to={`/shared/${article._id}`}
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
            Shared At: {timeSince(articleObj.createdAt)} ago
          </div>
        )}
        {updated && (
          <div className={styles["h4"]}>
            Updated At: {timeSince(article.updatedAt)} ago
          </div>
        )}
        {sharedBy.userName !== article.owner.userName && (
          <div className={styles["h2"]}>
            SharedBy: {sharedBy.userName} ({sharedBy.name})
          </div>
        )}
        {sharedBy.userName !== article.owner.userName && (
          <div className={styles["h2"]}>
            Owner: {article.owner.userName} ({article.owner.name})
          </div>
        )}
        {sharedBy.userName === article.owner.userName && (
          <div className={styles["h2"]}>
            Owner/SharedBy: {sharedBy.userName} ({sharedBy.name})
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
      <Tooltip id="my-tooltip" />
    </div>
  );
}
