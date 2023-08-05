import styles from "./LogIn.module.css";

import { useState } from "react";

import { useLogin } from "../../hooks/user/useLogin";

import Spinner from "../../components/loaders/spinner/Spinner";

import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../features/alertSlice";
import images from "../../constants/images";
import Button from "../../components/buttons/Button";

export default function LogIn() {
  const [passwordType, setPasswordType] = useState("eyePassword");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending } = useLogin();

  const dispatch = useDispatch();

  const parseError = (error) => {
    return error.includes("Unable to login")
      ? "Incorrect Username or Password!"
      : error;
  };

  const showPassword = () => {
    passwordType === "eyePassword"
      ? setPasswordType("eyeText")
      : setPasswordType("eyePassword");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(userName, password);
    if (res.ok) {
      dispatch(setSuccess(res.ok));
    } else if (res.error) {
      dispatch(setError(parseError(res.error)));
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
              type={passwordType === "eyePassword" ? "password" : "text"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <div className={styles["img"]}>
              <img
                src={images[passwordType]}
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
          <Button
            content={"LogIn"}
            type={"customButton"}
            buttonStyle={{ padding: "0.6rem 1.6rem", fontWeight: "600" }}
          />
        )}
      </form>
    </div>
  );
}
