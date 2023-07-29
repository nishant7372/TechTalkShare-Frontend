import styles from "./Create.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateArticle } from "../../../hooks/article/useCreateArticle";
import { useDispatch } from "react-redux";

import Editor from "../../../components/editors/Editor";
import TagSelect from "../../../components/tags/TagSelect";
import Loading from "../../../components/loaders/loading/Loading";
import Button from "../../../components/button/Button";

import { setError, setSuccess } from "../../../features/alertSlice";

export default function Create() {
  const { createArticle, isPending } = useCreateArticle();
  const dispatch = useDispatch();

  let tp = JSON.parse(localStorage.getItem("topic"));
  let tg = JSON.parse(localStorage.getItem("tags"));
  let ct = JSON.parse(localStorage.getItem("content"));

  const [topic, setTopic] = useState(tp ? tp : "");
  const [tags, setTags] = useState(tg ? tg : []);
  const [content, setContent] = useState(ct ? ct : "");
  const [noChange, setNoChange] = useState(true);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
    clearLocalStorage();
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("topic");
    localStorage.removeItem("tags");
    localStorage.removeItem("content");
  };

  const addtoLocalStorage = () => {
    localStorage.setItem("topic", JSON.stringify(topic));
    localStorage.setItem("tags", JSON.stringify(tags));
    localStorage.setItem("content", JSON.stringify(content));
  };

  useEffect(() => {
    addtoLocalStorage();
    setNoChange(topic === "" || content === "");
    // eslint-disable-next-line
  }, [topic, tags, content]);

  // Posting new Article
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createArticle({ topic, content, tags });

    if (res.ok) {
      dispatch(setSuccess(res.ok));
      goBack();
    } else if (res.error) {
      dispatch(setError(res.error));
    }
  };

  return (
    <>
      <div className={styles["create-article"]}>
        <form className={styles["article-form"]} onSubmit={handleSubmit}>
          <div className={styles["section1"]}>
            <input
              className={styles["s1-left"]}
              type="text"
              placeholder="Enter Title"
              onChange={(e) => setTopic(e.target.value)}
              value={topic}
              maxLength={100}
              required
              autoFocus
            />
            <div className={styles["s1-right"]}>
              <Button
                icon={<i className="fa-solid fa-circle-xmark"></i>}
                content={<span className={styles["btnName"]}> Cancel</span>}
                buttonStyle={{
                  fontSize: "1.6rem",
                  padding: "0.15rem 0.8rem",
                }}
                type="cancelButton"
                action={goBack}
                formAction="reset"
              />

              {!isPending ? (
                <Button
                  icon={<i className={`fa-solid fa-paper-plane`}></i>}
                  content={<span className={styles["btnName"]}> Post</span>}
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
  );
}
