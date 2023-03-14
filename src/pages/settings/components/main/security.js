import styles from "./security.module.css";
import "../common.css";

import { useState } from "react";

import { useUpdateUser } from "../../../../hooks/user/useUpdateUser";

import Spinner from "../../../../Components/loading-spinners/spinner/spinner";
import Error from "../../../../Components/messages/error";
import Successful from "../../../../Components/messages/successful";

export default function Security() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [localError, setLocalError] = useState(null);
  const [renderMsg, setRenderMsg] = useState(false);

  const closedEye = `${process.env.PUBLIC_URL}/img/eye-password.png`;
  const openEye = `${process.env.PUBLIC_URL}/img/eye-text.png`;

  const { updateUser, error, isPending } = useUpdateUser();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      setLocalError(null);
      await updateUser({ password: newPassword });
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setLocalError("Passwords does not Match");
    }
    setRenderMsg(true);
    setTimeout(() => {
      setRenderMsg(false);
    }, 3000);
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
      <form onSubmit={handleUpdate} className={styles["change-password"]}>
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
          {isPending && (
            <div className={styles["disabled"]}>
              <Spinner />
            </div>
          )}
          {!isPending && (
            <button className={"updateButton"} type="submit">
              Update
            </button>
          )}

          {renderMsg && !localError && error && <Error error={error} />}
          {renderMsg && localError && <Error error={localError} />}

          {renderMsg && !localError && !error && !isPending && (
            <Successful successful={"Update Successful"} />
          )}
        </div>
      </form>
    </div>
  );
}
