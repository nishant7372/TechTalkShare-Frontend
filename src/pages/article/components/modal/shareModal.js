import styles from "./shareModal.module.css";

import { useState } from "react";
import { useEffect } from "react";

import { useShareArticle } from "../../../../hooks/sharing/useShareArticle";
import { useMessageContext } from "../../../../hooks/context/useMessageContext";
import { useGetUsers } from "../../../../hooks/user/useGetUsers";
import { useAuthContext } from "../../../../hooks/context/useAuthContext";

import Loading from "../../../../Components/loading-spinners/loading/loading";
import ToggleButton from "../../../../Components/button/toggleButton";
import Error from "../../../../Components/messages/error";
import SimpleButton from "../../../../Components/button/simpleButton";

export default function ShareModal({ articleShare, setOpenShareModal }) {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState(null);
  const [writeOn, setWriteOn] = useState(false);
  const [shareOn, setShareOn] = useState(false);
  const [sharedWith, setSharedWith] = useState([]);

  const { shareArticle, isPending } = useShareArticle();
  const { user: me } = useAuthContext();
  const {
    getUsers,
    error: usersError,
    isPending: usersPending,
  } = useGetUsers();
  const { dispatch } = useMessageContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await shareArticle({
      articleID: articleShare,
      userName: userName,
      writePermission: writeOn,
      sharePermission: shareOn,
    });
    if (res.ok) {
      dispatch({ type: "SUCCESS", payload: res.ok });
      setOpenShareModal(false);
    } else if (res.error) {
      dispatch({ type: "ERROR", payload: res.error });
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
    <div className={styles["overlay"]}>
      <div className={styles["shareModal"]}>
        <form onSubmit={handleSubmit}>
          <div
            className={styles["cancelButton"]}
            onClick={() => setOpenShareModal(false)}
          >
            X
          </div>
          <div className="flex-row">
            <input
              type="userName"
              onChange={(e) => setUserName(e.target.value.toLowerCase())}
              value={userName}
              placeholder={"userName"}
              className={styles["shareInput"]}
              required
            />
            {!isPending && (
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
            {isPending && <Loading action={"post"} />}
          </div>
          <div className={styles["toggle"]}>
            <div>Write:</div> <ToggleButton on={writeOn} setOn={setWriteOn} />
            <div>Share:</div> <ToggleButton on={shareOn} setOn={setShareOn} />
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
                {/* <input type="checkbox" /> */}
                <img
                  src={
                    !user.avatar
                      ? process.env.PUBLIC_URL + "/img/avatar.png"
                      : `data:image/jpeg;base64, ${user.avatar}`
                  }
                  alt="user-avatar"
                  className={styles["user-avatar"]}
                />
                <div>
                  <div>{user.userName} </div>{" "}
                  <div className={styles["name"]}>{user.name} </div>
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
