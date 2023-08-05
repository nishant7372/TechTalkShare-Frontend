import styles from "./SignUp.module.css";

import { useState } from "react";

import { useSignup } from "../../hooks/user/useSignup";

import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../features/alertSlice";

import Spinner from "../../components/loaders/spinner/Spinner";
import images from "../../constants/images";
import Button from "../../components/buttons/Button";

export default function SignUp() {
  const dispatch = useDispatch();

  const { signup, isPending } = useSignup();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("eyePassword");

  const parseError = (error) => {
    return error.includes("duplicate key error")
      ? "Username already taken!"
      : error;
  };

  const showPassword = () => {
    passwordType === "eyePassword"
      ? setPasswordType("eyeText")
      : setPasswordType("eyePassword");
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
