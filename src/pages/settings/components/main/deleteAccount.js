import styles from "./deleteAccount.module.css";

import { useState } from "react";

import { useDeleteAccount } from "../../../../hooks/user/useDeleteAccount";

import Confirm from "../../../../Components/modals/confirm/confirm";
import Error from "../../../../Components/messages/error";
import Spinner from "../../../../Components/loading-spinners/spinner/spinner";
import SimpleButton from "../../../../Components/button/simpleButton";

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
        <SimpleButton
          icon={<i className="fa-solid fa-trash"></i>}
          content=" &nbsp;Delete Account"
          buttonStyle={{
            fontSize: "1.8rem",
            padding: "0.3rem 0.8rem",
          }}
          type="deleteButton"
          action={handleClick}
        />
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
