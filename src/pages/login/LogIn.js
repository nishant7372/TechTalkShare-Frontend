import styles from "./LogIn.module.css";

import { useState } from "react";

import { useLogin } from "../../hooks/user/userApis";

import Spinner from "../../components/loaders/spinner/Spinner";

import images from "../../constants/images";
import Button from "../../components/buttons/Button";
import { useHandleResponse } from "../../hooks/utils/useHandleResponse";

export default function LogIn() {
  const [passwordType, setPasswordType] = useState("eyePassword");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending } = useLogin();

  const { handleResponse } = useHandleResponse();

  const showPassword = () => {
    passwordType === "eyePassword"
      ? setPasswordType("eyeText")
      : setPasswordType("eyePassword");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(userName, password);
    handleResponse(res);
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
