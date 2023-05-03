import styles from "./updateArticle.module.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useUpdateSharedArticle } from "../../../hooks/sharing/useUpdateSharedArticle";
import { useGetSharedArticle } from "../../../hooks/sharing/useGetSharedArticle";
import { useMessageContext } from "../../../hooks/context/useMessageContext";

import Editor from "../components/editors/editor";
import TagSelect from "../components/tags/tagSelect";
import Loading from "../../../Components/loading-spinners/loading/loading";
import NotFound from "../../error/notFound";

export default function UpdateSharedArticle() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);

  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [showNotFound, setShowNotFound] = useState(false);

  const { dispatch } = useMessageContext();

  const { updateSharedArticle, isPending: updatePending } =
    useUpdateSharedArticle();

  const { getSharedArticle, isPending: readPending } = useGetSharedArticle();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // Reading Article
  useEffect(() => {
    const fetch = async () => {
      const res = await getSharedArticle(id);
      if (res.ok && res.data.sharing.writePermission) {
        setArticle(res.data.article);
        setTopic(res.data.article.topic);
        setContent(res.data.article.content);
        setTags(res.data.article.tags);
      } else if (res.error) {
        dispatch({ type: "ERROR", payload: res.error });
        if (res.error === "An error occurred.") setShowNotFound(true);
      } else if (!res.data.sharing.writePermission) {
        setShowNotFound(true);
      }
    };
    fetch();
    // eslint-disable-next-line
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
    const res = await updateSharedArticle(id, updates);

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
