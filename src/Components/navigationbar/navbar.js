import styles from "./navbar.module.css";

import "./navbar.css";

import { NavLink, Link } from "react-router-dom";

import { useLogout } from "../../hooks/user/useLogout";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import { useMessageContext } from "../../hooks/context/useMessageContext";
import { CSSTransition } from "react-transition-group";

import AnimatedButton from "../button/animatedButton";
import NameLogo from "../logomaker/namelogo";
import { useState } from "react";
import { useRef } from "react";

export default function NavBar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  const { dispatch } = useMessageContext();

  const [showSidebar, setShowSiderbar] = useState(false);

  const nodeRef = useRef(null);

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
                <i className="fa-solid fa-bars"></i> &nbsp;My Articles
              </NavLink>
              <NavLink to="/shared">
                <i className="fa-solid fa-bars"></i> &nbsp;Shared with me
              </NavLink>
              <NavLink to="/downloads">
                <i className="fa-solid fa-bars"></i> &nbsp;Downloads
              </NavLink>
            </div>
          </CSSTransition>
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
                <i className="fa-solid fa-bars"></i> &nbsp;My Articles
              </NavLink>
              <NavLink to="/shared">
                <i className="fa-solid fa-bars"></i> &nbsp;Shared with me
              </NavLink>
              <NavLink to="/downloads">
                <i className="fa-solid fa-bars"></i> &nbsp;Downloads
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
