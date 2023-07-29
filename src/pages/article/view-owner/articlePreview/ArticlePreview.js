import styles from "./ArticlePreview.module.css";

import MarkdownPreview from "@uiw/react-markdown-preview";

import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { useReadArticle } from "../../../../hooks/article/useReadArticle";
import { useDeleteArticle } from "../../../../hooks/article/useDeleteArticle";
import { useFormatDate } from "../../../../hooks/utils/useFormatDate";

import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../../../features/alertSlice";

import Loading from "../../../../components/loaders/loading/Loading";
import NotFound from "../../../error/NotFound";
import Tag from "./../../../../components/tags/Tag";
import AnimatedButton from "../../../../components/buttons/AnimatedButton";
import Confirm from "../../../../components/modals/confirmModal/Confirm";

export default function ArticlePreview() {
  const { id } = useParams();
  const { formatDate } = useFormatDate();
  const dispatch = useDispatch();
  const { readArticle, isPending: readPending } = useReadArticle();
  const { deleteArticle, isPending: deletePending } = useDeleteArticle();

  const [article, setArticle] = useState(null);
  const [showNotFound, setShowNotFound] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const nodeRef = useRef(null);

  const navigate = useNavigate();

  const elementRef = useRef(null);

  const enterFullScreen = () => {
    const element = elementRef.current;

    if (element && element.requestFullscreen) {
      element.requestFullscreen();
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await readArticle(id);

      if (res.ok) {
        setArticle(res.data);
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

  const handleDelete = async (response) => {
    if (!response) {
      setShowConfirm(false);
      return;
    }
    const res = await deleteArticle(id);
    if (res.ok) {
      dispatch(setSuccess(res.ok));
      goBack();
    } else if (res.error) {
      dispatch(setError(res.error));
    }
    setShowConfirm(false);
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
            <AnimatedButton
              icon={<i className="fa-solid fa-share-nodes"></i>}
              link={`/sharings/${id}`}
              content=" &nbsp;Share"
              buttonStyle={{
                fontSize: "1.8rem",
                padding: "0.3rem 0.8rem",
                textAlign: "center",
              }}
              type="infoBt"
            />
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
            <AnimatedButton
              icon={<i className="fa-regular fa-pen-to-square"></i>}
              link={`/articles/update/${id}`}
              content=" &nbsp;Edit"
              buttonStyle={{
                fontSize: "1.8rem",
                padding: "0.3rem 0.8rem",
                textAlign: "center",
              }}
              type="editBt"
            />
            {deletePending ? (
              <Loading action={"delete"} />
            ) : (
              <AnimatedButton
                icon={<i className="fa-solid fa-trash"></i>}
                content=" &nbsp;Delete"
                buttonStyle={{
                  fontSize: "1.8rem",
                  padding: "0.3rem 0.8rem",
                  textAlign: "center",
                }}
                type="deleteBt"
                action={() => setShowConfirm(true)}
              />
            )}
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
      <CSSTransition
        in={showConfirm}
        timeout={300}
        nodeRef={nodeRef}
        classNames="message"
        unmountOnExit
      >
        <Confirm
          icon={"⚠️ "}
          message={" You are about to delete an Article"}
          deleteItem={handleDelete}
          nodeRef={nodeRef}
        />
      </CSSTransition>
      {readPending && <Loading action={"read"} />}
      {showNotFound && <NotFound />}
    </>
  );
}
