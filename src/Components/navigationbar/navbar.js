import styles from "./navbar.module.css";
import "./navbar.css";

import { NavLink, Link } from "react-router-dom";

import { useLogout } from "../../hooks/user/useLogout";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import { useMessageContext } from "../../hooks/context/useMessageContext";
import NameLogo from "../logomaker/namelogo";

export default function NavBar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  const { dispatch } = useMessageContext();

  const handleLogout = async () => {
    const res = await logout();
    if (res.ok) {
      dispatch({ type: "SUCCESS", payload: res.ok });
    } else if (res.error) {
      dispatch({ type: "ERROR", payload: res.error });
    }
  };

  return (
    <div className={`${styles["nav-container"]} ${styles["sticky"]}`}>
      <div className={styles["navbar"]}>
        <div className={styles["nav-left"]}>
          <Link to="/" className={styles["app-name"]}>
            ProStore
          </Link>
        </div>

        {user ? (
          <>
            <div className={styles["nav-middle"]}>
              <NavLink to="/articles">
                <i className="fa-solid fa-bars"></i> &nbsp;My Articles
              </NavLink>
              <NavLink to="/shared">
                <i className="fa-solid fa-bars"></i> &nbsp;Shared with me
              </NavLink>
            </div>
            <div className={styles["nav-right-auth"]}>
              <Link to="/settings">
                {user.avatar ? (
                  <img
                    src={`data:image/jpeg;base64, ${user.avatar}`}
                    alt="avatar"
                    className={styles["avatar"]}
                  />
                ) : (
                  <NameLogo
                    logoStyle={{ width: "2.3rem", height: "3rem" }}
                    name={user.name}
                  />
                )}
              </Link>
              <div
                className={styles["log-btn"]}
                onClick={isPending ? null : handleLogout}
              >
                Logout
              </div>
            </div>
          </>
        ) : (
          <div className={styles["nav-right-noauth"]}>
            <NavLink to="/login" className={styles["log-btn"]}>
              LogIn
            </NavLink>
            <NavLink to="/signup" className={styles["log-btn"]}>
              SignUp
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
