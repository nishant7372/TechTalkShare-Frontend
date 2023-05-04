import styles from "./security.module.css";

import { useState } from "react";

import { useUpdateUser } from "../../../../hooks/user/useUpdateUser";

import Spinner from "../../../../Components/loading-spinners/spinner/spinner";
import Error from "../../../../Components/messages/error";
import Successful from "../../../../Components/messages/successful";
import SimpleButton from "../../../../Components/button/simpleButton";

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
          {isPending && (
            <div className={styles["disabled"]}>
              <Spinner />
            </div>
          )}
          {!isPending && (
            <SimpleButton
              icon={<i className="fa-regular fa-pen-to-square"></i>}
              content=" Update"
              buttonStyle={{
                fontSize: "1.8rem",
                padding: "0.3rem 0.8rem",
              }}
              type="updateButton"
              formAction="submit"
            />
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
