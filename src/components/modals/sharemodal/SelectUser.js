import styles from "./SelectUser.module.css";

import { useRef, useState, forwardRef, useEffect } from "react";

import { useSelector } from "react-redux";
import { useGetUsers } from "../../../hooks/user/useGetUsers";

import Input from "../../input/Input";
import Button from "../../buttons/Button";
import Alert from "../../../components/alerts/Alert";
import NameLogo from "../../../components/avatar/NameAvatar";
import Loading from "../../../components/loaders/loading/Loading";

const customStyles = {
  checkBox: { width: "1.8rem", height: "1.8rem", cursor: "pointer" },
  logoStyles: {
    width: "1.7rem",
    height: "2.6rem",
    fontSize: "1.6rem",
  },
  barsIcon: {
    backgroundColor: "#ffffff30",
    padding: "1.5rem",
    fontSize: "1.6rem",
    borderRadius: "50%",
    color: "#ffffffdd",
  },
  inputStyle: { backgroundColor: "rgb(4, 3, 10)", width: "95%" },
  buttonStyle: {
    width: "100%",
    textAlign: "center",
    padding: "0.6rem 0rem",
  },
};

const SelectUser = forwardRef(
  ({ handleSelectUser, setOpenUserSelect, selectedUsers }, ref) => {
    const [data, setData] = useState(null);
    const [userName, setUserName] = useState("");
    const [users, setUsers] = useState([]);

    const inputRef = useRef(null);

    const { user: me } = useSelector((store) => store.auth);
    const {
      getUsers,
      error: usersError,
      isPending: usersPending,
    } = useGetUsers();

    const filterResults = (term) => {
      const res = data
        .filter((user) => {
          return user.userName.startsWith(term) && user._id !== me._id;
        })
        .sort((a, b) => a.userName.localeCompare(b.userName));
      return addChecked(res);
    };

    const addChecked = (users) => {
      return users.map((user) => {
        return {
          ...user,
          checked: selectedUsers?.some((u) => u._id === user._id) || false,
        };
      });
    };

    useEffect(() => {
      const fetchUsers = async () => {
        const res = await getUsers();
        setData(res.data);
      };
      fetchUsers();
      if (inputRef) {
        inputRef.current.focus();
      }
      // eslint-disable-next-line
    }, []);

    useEffect(() => {
      if (data) setUsers(filterResults(userName));
      // eslint-disable-next-line
    }, [userName, data]);

    return (
      <div className={styles["overlay"]} ref={ref}>
        <div className={styles["modal"]}>
          <div className="flex-row" style={{ width: "100%" }}>
            <div className={styles["heading"]}>Add Users</div>
            <i
              style={customStyles.barsIcon}
              className="fa-solid fa-bars-staggered"
            />
          </div>
          <Input
            type={"text"}
            placeholder={"userName"}
            value={userName}
            required
            setState={(e) => setUserName(e.target.value.toLowerCase())}
            name={"userName"}
            inputStyle={customStyles.inputStyle}
            ref={inputRef}
          />
          <div className={styles["users"]}>
            {usersPending ? (
              <Loading action={"users-loading"} />
            ) : users?.length > 0 ? (
              users.map((user) => (
                <User
                  key={user.userName}
                  user={user}
                  handleSelectUser={handleSelectUser}
                />
              ))
            ) : (
              <div className={styles["not-found"]}>No User found</div>
            )}

            {usersError && (
              <div className={styles["users-error"]}>
                <Alert message={usersError} type={"ERROR"} />
              </div>
            )}
          </div>
          <Button
            content={"Done"}
            type={"customButton"}
            buttonStyle={customStyles.buttonStyle}
            action={() => setOpenUserSelect(false)}
          />
        </div>
      </div>
    );
  }
);

const User = ({ user, handleSelectUser }) => {
  const [checked, setChecked] = useState(user.checked);

  const handleChange = (check) => {
    setChecked(check);
    handleSelectUser(user, check ? "add" : "remove");
  };

  return (
    <div className={styles["user"]} onClick={() => handleChange(!checked)}>
      <div>
        <input
          type="checkbox"
          style={customStyles.checkBox}
          checked={checked}
          onChange={(e) => {
            handleChange(e.target.checked);
          }}
          className={styles.check}
        />
      </div>
      {user.avatar ? (
        <img
          src={`data:image/jpeg;base64, ${user.avatar}`}
          alt="user-avatar"
          className={styles["user-avatar"]}
        />
      ) : (
        <NameLogo logoStyle={customStyles.logoStyles} name={user.name} />
      )}
      <div>
        <div>{user.name}</div>
        <div className={styles["user-name"]}>@{user.userName} </div>
      </div>
    </div>
  );
};

export default SelectUser;
