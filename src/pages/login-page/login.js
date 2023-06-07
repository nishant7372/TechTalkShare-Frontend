import styles from "./login.module.css";

import { useState } from "react";

import { useLogin } from "../../hooks/user/useLogin";
import { useMessageContext } from "../../hooks/context/useMessageContext";

import Spinner from "../../Components/loading-spinners/spinner/spinner";

export default function LogIn() {
  const [passwordType, setPasswordType] = useState("password");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending } = useLogin();

  const { dispatch: messageDispatch } = useMessageContext();

  const parseError = (error) => {
    return error.includes("Unable to login")
      ? "Incorrect Username or Password!"
      : error;
  };

  const showPassword = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(userName, password);
    if (res.ok) {
      messageDispatch({ type: "SUCCESS", payload: res.ok });
    } else if (res.error) {
      messageDispatch({ type: "ERROR", payload: parseError(res.error) });
    }
  };

  return (
    <div className={styles[`form-container`]}>
      <form
        className={styles["login-form"]}
        onSubmit={handleSubmit}
        spellCheck="false"
      >
        <h2>LogIn</h2>
        <label>
          <span>Username</span>
          <input
            className={styles["text-input"]}
            type="text"
            placeholder="userName"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
            autoFocus
          />
        </label>
        <label className={styles.lastLabel}>
          <span>Password</span>
          <div className={styles["password-field"]}>
            <input
              type={passwordType}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <div className={styles["img"]}>
              <img
                src={`${process.env.PUBLIC_URL}/img/eye-${passwordType}.png`}
                onClick={showPassword}
                alt="eye-toggle"
              />
            </div>
          </div>
        </label>
        {isPending ? (
          <>
            <div className={styles["disabled"]}>
              <Spinner />
              <p>Signing in...</p>
            </div>
          </>
        ) : (
          <button className={styles["btn"]}>LogIn</button>
        )}
      </form>
    </div>
  );
}
