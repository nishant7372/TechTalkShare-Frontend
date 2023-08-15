import styles from "./Users.module.css";
import "./Users.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Loading from "../../components/loaders/loading/Loading";
import Alert from "../../components/alerts/Alert";
import NameLogo from "../../components/avatar/NameAvatar";

import { useGetUsers } from "../../hooks/user/useGetUsers";
import { useSelector } from "react-redux";

export default function Users({ onlineUsers, hideUserMenu }) {
  const {
    getUsers,
    error: usersError,
    isPending: usersPending,
  } = useGetUsers();

  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([]);

  const { user: me } = useSelector((store) => store.auth);

  const filterUsers = (users) => {
    return users.filter((user) => user._id !== me._id);
  };

  const filterResults = (term) => {
    return users
      ? users
          .filter((user) => {
            return user.userName.startsWith(term);
          })
          .sort((a, b) => a.userName.localeCompare(b.userName))
      : null;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();
      setUsers(filterUsers(res.data));
    };
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const results = filterResults(userName);
    setAvailableUsers(results);
    // eslint-disable-next-line
  }, [userName, users]);

  return (
    <div
      className={`${styles["leftSection"]} ${
        hideUserMenu ? styles["hidden"] : null
      }`}
    >
      <div
        style={{ position: "relative", height: "5rem", alignItems: "center" }}
      >
        <span className={styles["pre"]}>@</span>
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value.toLowerCase())}
          value={userName}
          placeholder={"userName"}
          className={styles["userSearchBar"]}
          required
        />
      </div>
      <div className={styles["users"]}>
        {availableUsers && availableUsers.length > 0 ? (
          availableUsers.map((user, index) => (
            <NavLink
              to={`/chat/${user.userName}`}
              key={index}
              className={`user ${styles["user"]}`}
            >
              {user.avatar ? (
                <img
                  src={`data:image/jpeg;base64, ${user.avatar}`}
                  alt="user-avatar"
                  className={styles["userAvatar"]}
                />
              ) : (
                <NameLogo
                  logoStyle={{
                    width: "1.7rem",
                    height: "2.6rem",
                    fontSize: "1.6rem",
                  }}
                  name={user.name}
                  resize={true}
                />
              )}
              <div>
                <div>
                  {user.name}
                  {onlineUsers.includes(user._id) && (
                    <span className={styles["online-status"]}></span>
                  )}
                </div>
                <div className={styles["name"]}>@{user.userName} </div>
              </div>
            </NavLink>
          ))
        ) : (
          <div className={styles["not-found"]}>No User Found</div>
        )}
        {usersPending && <Loading action={"users-loading"} />}
        {usersError && (
          <div className={styles["userErrors"]}>
            <Alert message={usersError} type="ERROR" />
          </div>
        )}
      </div>
    </div>
  );
}
