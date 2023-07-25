import styles from "./../view-owner/Article.module.css";
import { Link } from "react-router-dom";

import { useFormatDate } from "../../../hooks/utils/useFormatDate";

import Tag from "./../../../components/tags/Tag";

export default function SharedArticle({ articleObj, updated }) {
  const { article, editPermission } = articleObj;
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

        <i
          className={`fa-solid fa-reply ${styles["d-icon"]}`}
          style={{
            right: "-0.6rem",
            bottom: "0.7rem",
          }}
        ></i>
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
            {!editPermission && (
              <span className={styles["readOnly"]}>Read Only</span>
            )}
          </div>
        )}
        {updated && (
          <div className={styles["h4"]}>
            Updated At: {timeSince(article.updatedAt)} ago
            {!editPermission && (
              <span className={styles["readOnly"]}>Read Only</span>
            )}
          </div>
        )}

        <div className={styles["h2"]}>
          Owner: {article.owner.userName} ({article.owner.name})
        </div>
      </div>
    </div>
  );
}
