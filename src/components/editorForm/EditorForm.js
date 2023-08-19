import Button from "../buttons/Button";
import ArticleEditor from "../editors/articleEditor/ArticleEditor";
import Loading from "../loaders/loading/Loading";
import TagSelect from "../tags/TagSelect";
import styles from "./EditorForm.module.css";

export default function EditorForm({
  data,
  setData,
  handleSubmit,
  isPending,
  goBack,
  disableSubmit,
}) {
  const { topic, tags, content } = data;

  const handleSetContent = (value) => {
    setData((prev) => ({ ...prev, content: value }));
  };

  const handleSetTags = (value) => {
    setData((prev) => ({ ...prev, tags: value }));
  };

  return (
    <div className={styles["container"]}>
      <form className={styles["article-form"]} onSubmit={handleSubmit}>
        <div className={styles["section1"]}>
          <input
            className={styles["s1-left"]}
            type={"text"}
            placeholder={"Enter Title..."}
            onChange={(e) =>
              setData((prev) => ({ ...prev, topic: e.target.value }))
            }
            value={topic}
            maxLength={200}
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
                alignSelf: "flex-start",
              }}
              type="cancelButton"
              action={goBack}
              formAction="reset"
            />

            {!isPending ? (
              <Button
                icon={<i className={`fa-solid fa-paper-plane`}></i>}
                content={<span className={styles["btnName"]}> Post</span>}
                disabled={disableSubmit}
                buttonStyle={{
                  fontSize: "1.6rem",
                  padding: "0.15rem 0.8rem",
                  ...(disableSubmit && { cursor: "not-allowed" }),
                  ...(disableSubmit && { backgroundColor: "#555" }),
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
          <TagSelect tags={tags} setTags={handleSetTags} search={false} />
        </div>
        <ArticleEditor content={content} setContent={handleSetContent} />
      </form>
    </div>
  );
}
