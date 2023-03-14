import styles from "./LogIn.module.css";

import { useState } from "react";

import { useLogin } from "../../hooks/user/useLogin";

import Spinner from "../../Components/Spinner/Spinner";
import Error from "./../../Components/Message/error";

export default function LogIn() {
  const [passwordType, setPasswordType] = useState("password");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [renderMsg, setRenderMsg] = useState(false);

  const { login, error, isPending } = useLogin();

  const parseError = (error) => {
    return error.includes("Unable to login")
      ? "Incorrect userName or Password!"
      : error;
  };

  const showPassword = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userName, password);
    setRenderMsg(true);
    setInterval(() => {
      setRenderMsg(false);
    }, 3000);
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
        {renderMsg && error && <Error error={parseError(error)} />}
        {isPending && (
          <>
            <div className={styles["disabled"]}>
              <Spinner />
              <p>Signing in...</p>
            </div>
          </>
        )}
        {!isPending && <button className={styles["btn"]}>LogIn</button>}
      </form>
    </div>
  );
}
