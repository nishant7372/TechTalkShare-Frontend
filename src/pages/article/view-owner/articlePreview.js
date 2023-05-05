import styles from "./articlePreview.module.css";

import MarkdownPreview from "@uiw/react-markdown-preview";

import Loading from "../../../Components/loading-spinners/loading/loading";
import NotFound from "../../error/notFound";
import Tag from "../components/tags/tag";
import AnimatedButton from "../../../Components/button/animatedButton";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useReadArticle } from "../../../hooks/article/useReadArticle";
import { useDeleteArticle } from "../../../hooks/article/useDeleteArticle";
import { useFormatDate } from "../../../hooks/utils/useFormatDate";
import { useMessageContext } from "../../../hooks/context/useMessageContext";

export default function ArticlePreview() {
  const { id } = useParams();
  const { formatDate } = useFormatDate();
  const { dispatch } = useMessageContext();
  const { readArticle, isPending: readPending } = useReadArticle();
  const { deleteArticle, isPending: deletePending } = useDeleteArticle();

  const [article, setArticle] = useState(null);
  const [showNotFound, setShowNotFound] = useState(false);

  const navigate = useNavigate();

  const color = ["skyblue", "magenta", "green", "orange", "maroon"].sort(
    () => Math.random() - 0.5
  );

  useEffect(() => {
    const fetch = async () => {
      const res = await readArticle(id);

      if (res.ok) {
        setArticle(res.data);
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

  const handleDelete = async () => {
    const res = await deleteArticle(id);
    if (res.ok) {
      dispatch({ type: "SUCCESS", payload: res.ok });
      goBack();
    } else if (res.error) {
      dispatch({ type: "ERROR", payload: res.error });
    }
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
            <div className={styles["container-right"]}>
              <AnimatedButton
                icon={<i className="fa-regular fa-pen-to-square"></i>}
                link={`/articles/update/${id}`}
                content=" &nbsp;Edit"
                buttonStyle={{
                  fontSize: "1.8rem",
                  padding: "0.3rem 0.8rem",
                }}
                type="editBt"
              />
              {!deletePending && (
                <AnimatedButton
                  icon={<i className="fa-solid fa-trash"></i>}
                  content=" &nbsp;Delete"
                  buttonStyle={{
                    fontSize: "1.8rem",
                    padding: "0.3rem 0.8rem",
                  }}
                  type="deleteBt"
                  action={handleDelete}
                />
              )}
              {deletePending && <Loading action={"delete"} />}
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
