import styles from "./SignUp.module.css";

import { useState } from "react";

import { useSignup } from "../../hooks/user/userApis";

import Spinner from "../../components/loaders/spinner/Spinner";
import images from "../../constants/images";
import Button from "../../components/buttons/Button";
import { useHandleResponse } from "../../hooks/utils/useHandleResponse";

export default function SignUp() {
  const { signup, isPending } = useSignup();
  const { handleResponse } = useHandleResponse();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("eyePassword");

  const showPassword = () => {
    passwordType === "eyePassword"
      ? setPasswordType("eyeText")
      : setPasswordType("eyePassword");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(userName, password, name);
    handleResponse(res);
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
              type={passwordType === "eyePassword" ? "password" : "text"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="new-password"
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
              <p>Creating Account...</p>
            </div>
          </>
        ) : (
          <Button
            content={"SignUp"}
            type={"customButton"}
            buttonStyle={{ padding: "0.6rem 1.6rem", fontWeight: "600" }}
          />
        )}
      </form>
    </div>
  );
}
