import styles from "./../view-owner/articlePreview.module.css";

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useFormatDate } from "../../../hooks/utils/useFormatDate";
import { useGetSharedArticle } from "../../../hooks/sharing/useGetSharedArticle";

import { useDispatch } from "react-redux";
import { setError } from "../../../features/alertSlice";

import Tag from "../components/tags/tag";
import NotFound from "../../error/notFound";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Loading from "../../../Components/loading-spinners/loading/loading";
import AnimatedButton from "../../../Components/button/animatedButton";

export default function SharedPreview() {
  const { id } = useParams();
  const { formatDate } = useFormatDate();
  const dispatch = useDispatch();
  const { getSharedArticle, isPending: readPending } = useGetSharedArticle();

  const [article, setArticle] = useState(null);
  const [sharing, setSharing] = useState(null);
  const [showNotFound, setShowNotFound] = useState(false);

  const elementRef = useRef(null);

  const enterFullScreen = () => {
    const element = elementRef.current;

    if (element && element.requestFullscreen) {
      element.requestFullscreen();
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await getSharedArticle(id);
      if (res.ok) {
        setArticle(res.data.article);
        setSharing(res.data.sharing);
      } else if (res.error) {
        dispatch(setError(res.error.message));
        if (res.error.status === 404) setShowNotFound(true);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {article && (
        <div className={styles["article-preview-box"]}>
          <div className={styles["topic-container"]}>
            <div className={styles["backButton"]} onClick={goBack}>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className={styles["topic"]}>{article.topic}</div>
          </div>
          <div className={styles["functionButtons"]}>
            <AnimatedButton
              icon={<i className="fa-solid fa-print"></i>}
              content=" &nbsp;Print"
              buttonStyle={{
                fontSize: "1.8rem",
                padding: "0.3rem 0.8rem",
                textAlign: "center",
              }}
              type="downloadBt"
              action={handlePrint}
            />
            {sharing.editPermission && (
              <AnimatedButton
                icon={<i className="fa-regular fa-pen-to-square"></i>}
                link={`/shared/update/${id}`}
                content=" &nbsp;Edit"
                buttonStyle={{
                  fontSize: "1.8rem",
                  padding: "0.3rem 0.8rem",
                  textAlign: "center",
                }}
                type="editBt"
              />
            )}
            <AnimatedButton
              icon={<i className="fa-solid fa-expand"></i>}
              action={enterFullScreen}
              content=" &nbsp;Full Screen"
              buttonStyle={{
                fontSize: "1.8rem",
                padding: "0.3rem 0.8rem",
                textAlign: "center",
              }}
              type="createBt"
            />
          </div>
          <div className={styles["date-container"]}>
            <div className={styles["h4"]}>
              Shared On: {formatDate(sharing.createdAt)}
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
              <Tag key={index} tag={tag} color={"transparent"} />
            ))}
          </div>
          <div
            ref={elementRef}
            data-color-mode="dark"
            className={styles["preview-container"]}
          >
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
