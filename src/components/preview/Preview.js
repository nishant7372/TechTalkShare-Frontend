import styles from "./Preview.module.css";

import { useRef } from "react";
import Tag from "../tags/Tag";
import AnimatedButton from "../buttons/AnimatedButton";
import Loading from "../loaders/loading/Loading";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { enterPageFullScreen } from "../../hooks/utils/gobalFunctions";
import Confirm from "../modals/confirmModal/Confirm";
import { CSSTransition } from "react-transition-group";
import { useFormatDate } from "../../hooks/utils/useFormatDate";

const buttonStyles = {
  fontSize: "1.8rem",
  padding: "0.3rem 0.8rem",
  textAlign: "center",
};

const FullScreenButton = ({ action }) => {
  return (
    <AnimatedButton
      icon={<i className="fa-solid fa-expand"></i>}
      action={action}
      content=" &nbsp;Full Screen"
      buttonStyle={buttonStyles}
      type="createBt"
    />
  );
};

const ShareButton = ({ link }) => {
  return (
    <AnimatedButton
      icon={<i className="fa-solid fa-share-nodes"></i>}
      link={link}
      content=" &nbsp;Share"
      buttonStyle={buttonStyles}
      type="infoBt"
    />
  );
};

const PrintButton = ({ action }) => {
  return (
    <AnimatedButton
      icon={<i className="fa-solid fa-print"></i>}
      content=" &nbsp;Print"
      buttonStyle={buttonStyles}
      type="downloadBt"
      action={action}
    />
  );
};

const EditButton = ({ link }) => {
  return (
    <AnimatedButton
      icon={<i className="fa-regular fa-pen-to-square"></i>}
      link={link}
      content=" &nbsp;Edit"
      buttonStyle={buttonStyles}
      action={enterPageFullScreen}
      type="editBt"
    />
  );
};

const DeleteButton = ({ deletePending, action }) => {
  return deletePending ? (
    <Loading action={"delete"} />
  ) : (
    <AnimatedButton
      icon={<i className="fa-solid fa-trash"></i>}
      content=" &nbsp;Delete"
      buttonStyle={buttonStyles}
      type="deleteBt"
      action={action}
    />
  );
};

export default function Preview({
  article,
  handleDelete,
  deletePending,
  showConfirm,
  setShowConfirm,
  goBack,
  sharing,
  id,
}) {
  const elementRef = useRef(null);
  const nodeRef = useRef(null);

  const enterFullScreen = () => {
    const element = elementRef.current;

    if (element && element.requestFullscreen) {
      element.requestFullscreen();
    }
  };

  const { formatDate } = useFormatDate();
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className={styles["article-preview-box"]}>
      <div className={styles["topic-container"]}>
        <div className={styles["backButton"]} onClick={goBack}>
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className={styles["topic"]}>{article?.topic}</div>
      </div>
      <div className={styles["functionButtons"]}>
        <FullScreenButton action={enterFullScreen} />
        {!sharing && <ShareButton link={`/articles/sharings/${id}`} />}
        <PrintButton action={handlePrint} />
        {sharing?.editPermission && (
          <EditButton link={`/shared/update/${id}`} />
        )}
        {!sharing && <EditButton link={`/articles/update/${id}`} />}
        {!sharing && (
          <DeleteButton
            deletePending={deletePending}
            action={() => setShowConfirm(true)}
          />
        )}
      </div>

      <div className={styles["date-container"]}>
        {sharing ? (
          <div className={styles["h4"]}>
            Shared On: {formatDate(sharing?.createdAt)}
          </div>
        ) : (
          <div className={styles["h4"]}>
            Created At: {formatDate(article?.createdAt)}
          </div>
        )}
        <div className={styles["h4"]}>
          Updated At: {formatDate(article?.updatedAt)}
        </div>
      </div>
      <div className={styles["tag-container"]}>
        {article?.tags?.length > 0 && (
          <Tag tag={{ value: "🏷️ Tags:" }} color={"transparent"} />
        )}
        {article?.tags?.map((tag, index) => (
          <Tag key={index} tag={tag} color={"transparent"} />
        ))}
      </div>

      <div
        ref={elementRef}
        data-color-mode="dark"
        className={styles["preview-container"]}
      >
        <MarkdownPreview
          source={article?.content}
          className={styles["markdown"]}
        />
      </div>
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
    </div>
  );
}
