import styles from "./../view-owner/articlePreview.module.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSharedArticle } from "../../../hooks/sharing/useGetSharedArticle";
import { useFormatDate } from "../../../hooks/utils/useFormatDate";
import { useMessageContext } from "../../../hooks/context/useMessageContext";

import MarkdownPreview from "@uiw/react-markdown-preview";
import Loading from "../../../Components/loading-spinners/loading/loading";
import NotFound from "../../error/notFound";
import Tag from "../components/tags/tag";
import AnimatedButton from "../../../Components/button/animatedButton";

export default function SharedPreview() {
  const { id } = useParams();
  const { formatDate } = useFormatDate();
  const { dispatch } = useMessageContext();
  const { getSharedArticle, isPending: readPending } = useGetSharedArticle();

  const [article, setArticle] = useState(null);
  const [sharing, setSharing] = useState(null);
  const [showNotFound, setShowNotFound] = useState(false);

  const navigate = useNavigate();

  const color = ["skyblue", "magenta", "green", "orange", "maroon"].sort(
    () => Math.random() - 0.5
  );

  useEffect(() => {
    const fetch = async () => {
      const res = await getSharedArticle(id);
      if (res.ok) {
        setArticle(res.data.article);
        setSharing(res.data.sharing);
      } else if (res.error) {
        dispatch({ type: "ERROR", payload: res.error });
        if (res.error === "An error occurred.") setShowNotFound(true);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {article && (
        <div className={styles["article-preview-box"]}>
          <div className={styles["topic-bar"]}>
            <div className={styles["container-left"]}>
              <div className={styles["backButton"]} onClick={goBack}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
              <div className={styles["topic"]}>{article.topic}</div>
            </div>
            {sharing.writePermission && (
              <div className={styles["container-right"]}>
                <AnimatedButton
                  icon={<i className="fa-regular fa-pen-to-square"></i>}
                  link={`/shared/update/${id}`}
                  content=" &nbsp;Edit"
                  buttonStyle={{
                    fontSize: "1.8rem",
                    padding: "0.3rem 0.8rem",
                  }}
                  type="editBt"
                />
              </div>
            )}
          </div>
          <div className={styles["date-container"]}>
            <div className={styles["h4"]}>
              Shared On: {formatDate(sharing.createdAt)}
            </div>
            <div className={styles["h4"]}>
              Updated At: {formatDate(article.updatedAt)}
            </div>
          </div>
          <div className={styles["permission-container"]}>
            Write Permission:
            <span
              className={styles[`${sharing.writePermission ? "yes" : "no"}`]}
            >
              {sharing.writePermission ? "Yes" : "No"}
            </span>
            Share Permission:
            <span
              className={styles[`${sharing.sharePermission ? "yes" : "no"}`]}
            >
              {sharing.sharePermission ? "Yes" : "No"}
            </span>
          </div>
          <div className={styles["tag-container"]}>
            {article.tags.length > 0 && (
              <Tag tag={{ value: "🏷️ Tags:" }} color={"transparent"} />
            )}
            {article.tags.map((tag, index) => (
              <Tag key={index} tag={tag} color={color[index % 5]} />
            ))}
          </div>
          <div data-color-mode="dark" className={styles["preview-container"]}>
            <MarkdownPreview
              source={article.content}
              className={styles["markdown"]}
            />
          </div>
        </div>
      )}
      {readPending && <Loading action={"read"} />}
      {showNotFound && <NotFound />}
    </>
  );
}
