import styles from "./Security.module.css";

import { useState } from "react";

import { useUpdateUser } from "../../../hooks/user/useUpdateUser";

import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../../features/alertSlice";

import Button from "../../../components/buttons/Button";
import Spinner from "../../../components/loaders/spinner/Spinner";
import images from "../../../constants/images";

export default function Security() {
  const dispatch = useDispatch();

  const { updateUser, isPending } = useUpdateUser();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const closedEye = images.eyePassword;
  const openEye = images.eyeText;

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      const res = await updateUser({ password: newPassword });
      if (res.ok) {
        dispatch(setSuccess(res.ok));
      } else if (res.error) {
        dispatch(setError(res.error));
      }
      setNewPassword("");
      setConfirmPassword("");
    } else {
      dispatch(setError("Passwords does not Match"));
    }
  };

  const showPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <div className={styles["security-box"]}>
      <div className={"heading"}>Change Password</div>
      <form className={styles["change-password"]} onSubmit={handleUpdate}>
        <div className={"flex-col"}>
          <label htmlFor="newPassword" className={styles["label"]}>
            New password:
          </label>
          <div className={styles["password-field"]}>
            <input
              type={passwordType}
              placeholder="New password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />
            <div className={styles["img"]}>
              <img
                src={passwordType === "password" ? closedEye : openEye}
                onClick={showPassword}
                alt="eye-toggle"
              />
            </div>
          </div>
        </div>
        <div className={"flex-col"}>
          <label htmlFor="newPassword" className={styles["label"]}>
            Confirm new password:
          </label>
          <div className={styles["password-field"]}>
            <input
              type={passwordType}
              placeholder="Confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
            <div className={styles["img"]}>
              <img
                src={passwordType === "password" ? closedEye : openEye}
                onClick={showPassword}
                alt="eye-toggle"
              />
            </div>
          </div>
        </div>
        <div className={"flex-col"}>
          {isPending ? (
            <div className={styles["disabled"]}>
              <Spinner />
            </div>
          ) : (
            <Button
              icon={<i className="fa-regular fa-pen-to-square"></i>}
              content=" Update"
              buttonStyle={{
                fontSize: "1.8rem",
                padding: "0.3rem 0.8rem",
                alignSelf: "flex-start",
                ...((newPassword === "" || confirmPassword === "") && {
                  cursor: "not-allowed",
                }),
                ...((newPassword === "" || confirmPassword === "") && {
                  backgroundColor: "#555",
                }),
              }}
              disabled={newPassword === "" || confirmPassword === ""}
              type="updateButton"
              formAction="submit"
            />
          )}
        </div>
      </form>
    </div>
  );
}
