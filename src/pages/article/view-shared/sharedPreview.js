import styles from "./../components/articlePreview.module.css";

import MarkdownPreview from "@uiw/react-markdown-preview";
import Loading from "../../../Components/loading/loading";
import NotFound from "../../error/notFound";
import Tag from "../components/tag";

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useGetSharedArticle } from "../../../hooks/sharing/useGetSharedArticle";
import { useFormatDate } from "../../../hooks/utils/useFormatDate";

import { useMessageContext } from "../../../hooks/useMessageContext";

export default function SharedPreview() {
  const { id } = useParams();
  const { formatDate } = useFormatDate();
  const { dispatch } = useMessageContext();
  const { getSharedArticle, isPending: readPending } = useGetSharedArticle();

  const [article, setArticle] = useState(null);
  const [showNotFound, setShowNotFound] = useState(false);

  const navigate = useNavigate();

  const color = ["skyblue", "magenta", "green", "orange", "maroon"].sort(
    () => Math.random() - 0.5
  );

  useEffect(() => {
    const fetch = async () => {
      const res = await getSharedArticle(id);

      if (res.ok) {
        setArticle(res.data);
      } else if (res.error) {
        dispatch({ type: "ERROR", payload: res.error });
        if (res.error === "An error occurred.") setShowNotFound(true);
      }
    };
    fetch();
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
          </div>
          <div className={styles["date-container"]}>
            <div className={styles["h4"]}>
              Created At: {formatDate(article.createdAt)}
            </div>

            <div className={styles["h4"]}>
              Updated At: {formatDate(article.updatedAt)}
            </div>
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
