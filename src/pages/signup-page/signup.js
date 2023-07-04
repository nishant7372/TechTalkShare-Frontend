import styles from "./signup.module.css";

import { useState } from "react";

import { useSignup } from "../../hooks/user/useSignup";

import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../features/alertSlice";

import Spinner from "../../Components/loading-spinners/spinner/spinner";

export default function SignUp() {
  const dispatch = useDispatch();

  const { signup, isPending } = useSignup();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

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
    const res = await signup(userName, password, name);
    if (res.ok) {
      dispatch(setSuccess(res.ok));
    } else if (res.error) {
      dispatch(setError(parseError(res.error)));
    }
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
        {isPending ? (
          <>
            <div className={styles["disabled"]}>
              <Spinner />
              <p>Creating Account...</p>
            </div>
          </>
        ) : (
          <button className={`${styles["btn"]}`}>SignUp</button>
        )}
      </form>
    </div>
  );
}
