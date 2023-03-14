import styles from "./deleteAccount.module.css";
import "../common.css";

import { useState } from "react";

import { useDeleteAccount } from "../../../../hooks/user/useDeleteAccount";

import Confirm from "../../../../Components/modals/confirm/confirm";
import Error from "../../../../Components/messages/error";
import Spinner from "../../../../Components/loading-spinners/spinner/spinner";

export default function DeleteAccount() {
  const [showConfirm, setShowConfirm] = useState(false);
  const { deleteAccount, error, isPending } = useDeleteAccount();

  const [renderMsg, setRenderMsg] = useState(false);

  const handleClick = () => {
    setShowConfirm(true);
  };

  const deleteItem = async (response) => {
    setShowConfirm(false);
    if (response) {
      await deleteAccount();
    }
    setRenderMsg(true);
    setTimeout(() => {
      setRenderMsg(false);
    }, 3000);
  };

  return (
    <div className={styles["deleteAccount-box"]}>
      <div className={"heading"}>Delete Account</div>
      <div>
        <p className={"description"}>
          Permanently delete your account and all data associated with it.
        </p>
        <p className={"warning"}>
          Please note that there is no option to restore the account or its
          data.
        </p>
      </div>

      {!isPending && (
        <div className={"deleteButton"} onClick={handleClick}>
          Delete Account
        </div>
      )}
      {isPending && (
        <>
          <Spinner />
          <div> Deleting Account...</div>
        </>
      )}
      {showConfirm && (
        <Confirm
          message={"Permanently delete Account."}
          deleteItem={deleteItem}
        />
      )}
      {renderMsg && error && <Error error={error} />}
    </div>
  );
}
