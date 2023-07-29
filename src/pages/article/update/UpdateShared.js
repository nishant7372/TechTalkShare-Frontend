import styles from "./Update.module.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useUpdateSharedArticle } from "../../../hooks/sharing/useUpdateSharedArticle";
import { useGetSharedArticle } from "../../../hooks/sharing/useGetSharedArticle";

import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../../features/alertSlice";

import NotFound from "../../error/NotFound";
import Editor from "../../../components/editors/Editor";
import TagSelect from "../../../components/tags/TagSelect";
import Loading from "../../../components/loaders/loading/Loading";
import Button from "../../../components/buttons/Button";

export default function UpdateShared() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);

  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [showNotFound, setShowNotFound] = useState(false);
  const [noChange, setNoChange] = useState(false);

  const dispatch = useDispatch();

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
      if (res.ok && res.data.sharing.editPermission) {
        setArticle(res.data.article);
        setTopic(res.data.article.topic);
        setContent(res.data.article.content);
        setTags(res.data.article.tags);
      } else if (res.error) {
        dispatch(setError(res.error.message));
        if (res.error.status === 404) setShowNotFound(true);
      } else if (!res.data.sharing.editPermission) {
        dispatch(setError("401 Unauthorized"));
        setShowNotFound(true);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setNoChange(
      (topic === article?.topic &&
        content === article?.content &&
        tags === article?.tags) ||
        topic === "" ||
        content === ""
    );
    // eslint-disable-next-line
  }, [topic, tags, content]);

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
      dispatch(setSuccess(res.ok));
      goBack();
    } else if (res.error) {
      dispatch(setError(res.error));
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
                  <Button
                    icon={<i className={`fa-solid fa-paper-plane`}></i>}
                    content={<span className={styles["btnName"]}> Cancel</span>}
                    buttonStyle={{
                      fontSize: "1.6rem",
                      padding: "0.15rem 0.8rem",
                    }}
                    type="cancelButton"
                    formAction="reset"
                    action={goBack}
                  />

                  {!updatePending ? (
                    <Button
                      icon={<i className={`fa-solid fa-paper-plane`}></i>}
                      content={
                        <span className={styles["btnName"]}> Update</span>
                      }
                      disabled={noChange}
                      buttonStyle={{
                        fontSize: "1.6rem",
                        padding: "0.15rem 0.8rem",
                        ...(noChange && { cursor: "not-allowed" }),
                        ...(noChange && { backgroundColor: "#555" }),
                      }}
                      type="saveButton"
                      formAction="submit"
                    />
                  ) : (
                    <Loading action="post" />
                  )}
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
