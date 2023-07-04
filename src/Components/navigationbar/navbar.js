import styles from "./navbar.module.css";
import "./navbar.css";

import { useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { useLogout } from "../../hooks/user/useLogout";

import { useDispatch, useSelector } from "react-redux";
import { setError, setSuccess } from "../../features/alertSlice";

import NameLogo from "../logomaker/namelogo";
import AnimatedButton from "../button/animatedButton";

export default function NavBar() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const { logout, isPending } = useLogout();

  const [showSidebar, setShowSiderbar] = useState(false);

  const nodeRef = useRef(null);

  const handleLogout = async () => {
    const res = await logout();
    if (res.ok) {
      dispatch(setSuccess(res.ok));
    } else if (res.error) {
      dispatch(setError(res.error));
    }
  };

  return (
    <div className={`${styles["nav-container"]} ${styles["sticky"]}`}>
      <div className={styles["navbar"]}>
        <div className={styles["nav-left"]}>
          {user && (
            <>
              <div className={styles["links"]}>
                <AnimatedButton
                  icon={<i className="fa-solid fa-bars"></i>}
                  buttonStyle={{
                    fontSize: "1.8rem",
                    padding: "0.3rem 1rem",
                    textAlign: "center",
                    borderRadius: "50%",
                  }}
                  type="navigationBt"
                  action={() => setShowSiderbar((prev) => !prev)}
                />
              </div>
              <CSSTransition
                in={showSidebar}
                timeout={300}
                nodeRef={nodeRef}
                classNames="movein"
                unmountOnExit
              >
                <div className={styles["sidebar"]} ref={nodeRef}>
                  <NavLink to="/articles">
                    <i className="fa-solid fa-note-sticky"></i> &nbsp;My
                    Articles
                  </NavLink>
                  <NavLink to="/shared">
                    <i className="fa-solid fa-share-from-square"></i>{" "}
                    &nbsp;Shared with me
                  </NavLink>
                  <NavLink to="/download">
                    <i className="fa-solid fa-cloud-arrow-down"></i>{" "}
                    &nbsp;Download
                  </NavLink>
                  <NavLink to="/downloads">
                    <i className="fa-solid fa-clock-rotate-left"></i>{" "}
                    &nbsp;Download History
                  </NavLink>
                  <NavLink to="/chat">
                    <i className="fa-brands fa-rocketchat"></i> &nbsp;Chat
                  </NavLink>
                </div>
              </CSSTransition>
            </>
          )}
          <Link to="/" className={styles["app-name"]}>
            <img
              src={process.env.PUBLIC_URL + "/img/devstore-logo.png"}
              alt="logo"
            ></img>
          </Link>
        </div>

        {user ? (
          <>
            <div className={styles["nav-middle"]}>
              <NavLink to="/articles">
                <i className="fa-solid fa-note-sticky"></i> &nbsp;My Articles
              </NavLink>
              <NavLink to="/shared">
                <i className="fa-solid fa-share-from-square"></i> &nbsp;Shared
                with me
              </NavLink>
              <NavLink to="/download">
                <i className="fa-solid fa-cloud-arrow-down"></i> &nbsp;Download
              </NavLink>
              <NavLink to="/chat">
                <i className="fa-brands fa-rocketchat"></i> &nbsp; Chat
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
