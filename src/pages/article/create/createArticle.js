import "./../../settings/components/common.css";
import styles from "./createArticle.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateArticle } from "../../../hooks/article/useCreateArticle";
import { useMessageContext } from "../../../hooks/useMessageContext";

import Editor from "../components/editor";
import TagSelect from "../components/tagSelect";
import Loading from "../../../Components/loading/loading";

export default function CreateArticle() {
  const { createArticle, isPending } = useCreateArticle();
  const { dispatch } = useMessageContext();

  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // Posting new Article
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createArticle({ topic, content, tags });

    if (res.ok) {
      dispatch({ type: "SUCCESS", payload: res.ok });
      goBack();
    } else if (res.error) {
      dispatch({ type: "ERROR", payload: res.error });
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

              {!isPending && (
                <button
                  className={`saveButton ${styles["postbtn"]}`}
                  type="submit"
                >
                  <i className={`fa-solid fa-paper-plane`}></i>
                  <span className={styles["btnName"]}> Post</span>
                </button>
              )}
              {isPending && <Loading action="post" />}
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
