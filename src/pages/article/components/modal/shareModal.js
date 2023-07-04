import styles from "./shareModal.module.css";

import { useState } from "react";
import { useEffect } from "react";

import { useShareArticle } from "../../../../hooks/sharing/useShareArticle";
import { useDispatch, useSelector } from "react-redux";
import { useGetUsers } from "../../../../hooks/user/useGetUsers";

import Loading from "../../../../Components/loading-spinners/loading/loading";
import ToggleButton from "../../../../Components/button/toggleButton";
import Error from "../../../../Components/messages/error";
import SimpleButton from "../../../../Components/button/simpleButton";
import NameLogo from "../../../../Components/logomaker/namelogo";
import { setError, setSuccess } from "../../../../features/alertSlice";

export default function ShareModal({
  articleShare,
  setOpenShareModal,
  nodeRef,
  updateSharings,
}) {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState(null);
  const [editOn, setEditOn] = useState(false);
  const [sharedWith, setSharedWith] = useState([]);

  const { shareArticle, isPending } = useShareArticle();
  const { user: me } = useSelector((store) => store.auth);
  const {
    getUsers,
    error: usersError,
    isPending: usersPending,
  } = useGetUsers();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await shareArticle({
      articleID: articleShare,
      userName: userName,
      editPermission: editOn,
    });
    if (res.ok) {
      dispatch(setSuccess(res.ok));
      setOpenShareModal(false);
      updateSharings();
    } else if (res.error) {
      dispatch(setError(res.error));
    }
  };

  const filterResults = (term) => {
    return users
      ? users
          .filter((user) => {
            return user.userName.startsWith(term) && user._id !== me._id;
          })
          .sort((a, b) => a.userName.localeCompare(b.userName))
      : null;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();
      setUsers(res.data);
    };
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const results = filterResults(userName);
    setSharedWith(results);
    // eslint-disable-next-line
  }, [userName, users]);

  return (
    <div className={styles["overlay"]} ref={nodeRef}>
      <div className={styles["shareModal"]}>
        <form onSubmit={handleSubmit}>
          <div
            className={styles["cancelButton"]}
            onClick={() => setOpenShareModal(false)}
          >
            X
          </div>
          <div className="flex-row" style={{ position: "relative" }}>
            <span className={styles["pre"]}>@</span>
            <input
              type="userName"
              onChange={(e) => setUserName(e.target.value.toLowerCase())}
              value={userName}
              placeholder={"userName"}
              className={styles["shareInput"]}
              required
            />

            {isPending ? (
              <Loading action={"post"} />
            ) : (
              <SimpleButton
                content={"Share"}
                buttonStyle={{
                  fontSize: "1.8rem",
                  padding: "0.4rem 0.8rem",
                }}
                type="saveButton"
                formAction="submit"
              />
            )}
          </div>
          <div className={styles["toggle"]}>
            <div>Edit Permission:</div>{" "}
            <ToggleButton on={editOn} setOn={setEditOn} />
          </div>
        </form>
        <div className={styles["sharedWith"]}>
          {sharedWith &&
            sharedWith.length > 0 &&
            sharedWith.map((user, index) => (
              <div
                key={index}
                className={styles["sharedWithUser"]}
                onClick={() => setUserName(user.userName)}
              >
                {user.avatar ? (
                  <img
                    src={`data:image/jpeg;base64, ${user.avatar}`}
                    alt="user-avatar"
                    className={styles["user-avatar"]}
                  />
                ) : (
                  <NameLogo
                    logoStyle={{
                      width: "1.7rem",
                      height: "2.6rem",
                      fontSize: "1.6rem",
                    }}
                    name={user.name}
                  />
                )}
                <div>
                  <div>{user.name} </div>{" "}
                  <div className={styles["name"]}>@{user.userName} </div>
                </div>
              </div>
            ))}
          {usersPending && <Loading action={"users-loading"} />}
          {usersError && (
            <div className={styles["userErrors"]}>
              <Error error={usersError} />
            </div>
          )}
          {sharedWith && sharedWith.length === 0 && (
            <div className={styles["not-found"]}>No UserName found</div>
          )}
        </div>
      </div>
    </div>
  );
}
