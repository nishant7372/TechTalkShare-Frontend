import styles from "./updateArticle.module.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useUpdateArticle } from "../../../hooks/article/useUpdateArticle";
import { useReadArticle } from "../../../hooks/article/useReadArticle";
import { useMessageContext } from "../../../hooks/context/useMessageContext";

import Editor from "../components/editor/editor";
import TagSelect from "../components/tag/tagSelect";
import Loading from "../../../Components/loading-spinners/loading/loading";
import NotFound from "../../error/notFound";

export default function UpdateArticle() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);

  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [showNotFound, setShowNotFound] = useState(false);

  const { dispatch } = useMessageContext();

  const { updateArticle, isPending: updatePending } = useUpdateArticle();

  const { readArticle, isPending: readPending } = useReadArticle();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // Reading Article
  useEffect(() => {
    const fetch = async () => {
      const res = await readArticle(id);

      if (res.ok) {
        setArticle(res.data);
        setTopic(res.data.topic);
        setContent(res.data.content);
        setTags(res.data.tags);
      } else if (res.error) {
        dispatch({ type: "ERROR", payload: res.error });
        if (res.error === "An error occurred.") setShowNotFound(true);
      }
    };
    fetch();
  }, []);

  // Updating Article
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = {
      ...(topic !== article.topic && { topic }),
      ...(content !== article.content && { content }),
      ...(tags !== article.tags && { tags }),
    };

    if (Object.keys(updates).length === 0) {
      return;
    }
    const res = await updateArticle(id, updates);

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
        <>
          <div className={styles["update-article"]}>
            <form className={styles["article-form"]} onSubmit={handleSubmit}>
              <div className={styles["section1"]}>
                <input
                  className={styles["s1-left"]}
                  type="text"
                  placeholder="Enter your Title"
                  onChange={(e) => setTopic(e.target.value)}
                  value={topic}
                  maxLength={100}
                  required
                  autoFocus
                />
                <div className={styles["s1-right"]}>
                  <div
                    className={`cancelButton ${styles["postbtn"]}`}
                    onClick={goBack}
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                    <span className={styles["btnName"]}> Cancel</span>
                  </div>

                  {!updatePending && (
                    <button
                      className={`saveButton ${styles["postbtn"]}`}
                      type="submit"
                    >
                      <i className={`fa-solid fa-paper-plane`}></i>
                      <span className={styles["btnName"]}> Update</span>
                    </button>
                  )}
                  {updatePending && <Loading action="post" />}
                </div>
              </div>
              <div className={styles["section2"]}>
                <TagSelect tags={tags} setTags={setTags} search={false} />
              </div>
              <div className={styles["section3"]} data-color-mode="dark">
                <Editor content={content} setContent={setContent} />
              </div>
            </form>
          </div>
        </>
      )}
      {readPending && <Loading action={"read"} />}
      {showNotFound && <NotFound />}
    </>
  );
}
