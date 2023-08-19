import styles from "./ShareModal.module.css";

import { useState } from "react";
import Button from "../../buttons/Button";
import ToggleButton from "../../buttons/ToggleButton";
import Tag from "../../tags/Tag";
import SelectUser from "./SelectUser";

import { useShareArticle } from "../../../hooks/sharing/useShareArticle";
import { useDispatch } from "react-redux";

import Loading from "../../../components/loaders/loading/Loading";
import { setError, setSuccess } from "../../../features/alertSlice";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import MessageEditor from "../../editors/messageEditor/MessageEditor";

const User = ({ user, index, removeUser }) => {
  return (
    <div className={styles["user"]}>
      {user?.avatar ? (
        <span>
          <img
            src={`data:image/jpeg;base64, ${user.avatar}`}
            alt="user-avatar"
            className={styles["user-avatar"]}
          />
        </span>
      ) : (
        <span className={styles.userLogo}>{user?.name?.charAt(0)}</span>
      )}
      <span>{user.name}</span>
      <span className={styles.userCross} onClick={() => removeUser(index)}>
        <i className="fa-solid fa-xmark"></i>
      </span>
    </div>
  );
};

const customStyles = {
  barsIcon: {
    backgroundColor: "#ffffff30",
    padding: "1.5rem",
    fontSize: "1.6rem",
    borderRadius: "50%",
    color: "#ffffffdd",
  },
  plusIcon: {
    backgroundColor: "#ffffff13",
    padding: "1rem 0.8rem",
    borderRadius: "50%",
    color: "#ffffffd6",
    fontSize: "1.6rem",
    boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
  },
  buttonStyle: { padding: "0.8rem 1.6rem" },
};

export default function ShareModal({
  articleShare,
  setOpenShareModal,
  nodeRef,
  updateSharings,
}) {
  const { shareArticle, isPending } = useShareArticle();
  const dispatch = useDispatch();

  const [openUserSelect, setOpenUserSelect] = useState(false);
  const [message, setMessage] = useState("");
  const [notify, setNotify] = useState(true);
  const [edit, setEdit] = useState(false);
  const [users, setUsers] = useState([]);

  const nodeRef2 = useRef(null);

  const handleShare = async (e) => {
    e.preventDefault();
    if (users.length === 0) {
      return dispatch(setError("Select at least 1 user"));
    }
    const res = await shareArticle({
      articleID: articleShare,
      users: users.map((user) => user._id),
      editPermission: edit,
      notify,
      message,
    });
    if (res.ok) {
      dispatch(setSuccess(res.ok));
      setOpenShareModal(false);
      if (updateSharings) updateSharings();
    } else if (res.error) {
      dispatch(setError(res.error));
    }
  };

  const addUser = () => {
    setOpenUserSelect(true);
  };

  const removeUser = (index) => {
    setUsers((users) => users.filter((_, idx) => idx !== index));
  };

  const handleSelectUser = (user, query) => {
    if (query === "add") {
      setUsers((prev) => [...prev, user]);
    } else {
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
    }
  };

  return (
    <div className={styles["overlay"]} ref={nodeRef}>
      <div className={styles["modal"]}>
        <div className={styles["header"]}>
          <div className="flex-row">
            <div className={styles["heading"]}>Share</div>
            <i
              style={customStyles.barsIcon}
              className="fa-solid fa-bars-staggered"
            />
          </div>
          <div className={styles["users"]}>
            {users.slice(0, 4).map((user, index) => (
              <User
                user={user}
                key={user.userName}
                index={index}
                removeUser={removeUser}
              />
            ))}
            {users?.length > 4 && (
              <Tag
                tag={{ value: `+ ${users.length - 4} more` }}
                color={"transparent"}
                tagStyles={{ borderRadius: "32px" }}
              />
            )}
            <span onClick={addUser}>
              <i
                style={customStyles.plusIcon}
                className="fa-solid fa-user-plus"
              ></i>
            </span>
          </div>
          <div style={{ overflow: "hidden", borderRadius: "6px" }}>
            <MessageEditor value={message} onChange={setMessage} />
          </div>
          <div className={styles.btContainer}>
            <div className={styles.toggle}>
              <ToggleButton on={notify} setOn={setNotify} />
              <span>Notify People</span>
            </div>
            <div className={styles.toggle}>
              <ToggleButton on={edit} setOn={setEdit} />
              <span>Edit</span>
            </div>
          </div>
        </div>
        <div className={styles["footer"]}>
          <Button
            content={"Cancel"}
            type={"customButton2"}
            buttonStyle={customStyles.buttonStyle}
            action={() => setOpenShareModal(false)}
          />
          {isPending ? (
            <Loading action={"post"} />
          ) : (
            <Button
              content={"Share"}
              type={"customButton"}
              buttonStyle={customStyles.buttonStyle}
              action={handleShare}
            />
          )}
        </div>
        <form onSubmit={null}></form>
      </div>
      <CSSTransition
        in={openUserSelect}
        timeout={300}
        nodeRef={nodeRef2}
        classNames="movein"
        unmountOnExit
      >
        <SelectUser
          setOpenUserSelect={setOpenUserSelect}
          handleSelectUser={handleSelectUser}
          selectedUsers={users}
          ref={nodeRef2}
        />
      </CSSTransition>
    </div>
  );
}
