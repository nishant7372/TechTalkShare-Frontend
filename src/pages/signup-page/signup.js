import styles from "./signup.module.css";

import { useState } from "react";

import { useSignup } from "../../hooks/user/useSignup";

import Spinner from "../../Components/loading-spinners/spinner/spinner";
import Error from "../../Components/messages/error";

export default function SignUp() {
  const [passwordType, setPasswordType] = useState("password");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [renderMsg, setRenderMsg] = useState(false);

  const { signup, error, isPending } = useSignup();

  const parseError = (error) => {
    return error.includes("duplicate key error")
      ? "Username already taken!"
      : error;
  };

  const showPassword = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(userName, password, name);
    setRenderMsg(true);
    setInterval(() => {
      setRenderMsg(false);
    }, 3000);
  };

  return (
    <div className={styles[`form-container`]}>
      <form
        className={styles["signup-form"]}
        onSubmit={handleSubmit}
        spellCheck="false"
      >
        <h2>SignUp</h2>
        <label>
          <span>Name</span>
          <input
            className={styles["text-input"]}
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            autoFocus
          />
        </label>
        <label>
          <span>Username</span>
          <input
            className={styles["text-input"]}
            type="text"
            placeholder="userName"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
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
              autoComplete="new-password"
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
              <p>Creating Account...</p>
            </div>
          </>
        )}
        {!isPending && <button className={`${styles["btn"]}`}>SignUp</button>}
      </form>
    </div>
  );
}
