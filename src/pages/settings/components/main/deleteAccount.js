import styles from "./deleteAccount.module.css";

import { useState, useRef } from "react";

import { useDeleteAccount } from "../../../../hooks/user/useDeleteAccount";
import { useMessageContext } from "../../../../hooks/context/useMessageContext";
import { CSSTransition } from "react-transition-group";

import Confirm from "../../../../Components/modals/confirm/confirm";
import Spinner from "../../../../Components/loading-spinners/spinner/spinner";
import SimpleButton from "../../../../Components/button/simpleButton";

export default function DeleteAccount() {
  const [showConfirm, setShowConfirm] = useState(false);
  const { deleteAccount, isPending } = useDeleteAccount();

  const { dispatch: messageDispatch } = useMessageContext();

  const nodeRef = useRef(null);

  const handleClick = () => {
    setShowConfirm(true);
  };

  const deleteItem = async (response) => {
    setShowConfirm(false);
    if (!response) {
      return;
    }
    const res = await deleteAccount();
    if (res.ok) {
      messageDispatch({ type: "SUCCESS", payload: res.ok });
    } else if (res.error) {
      messageDispatch({ type: "ERROR", payload: res.error });
    }
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

      {isPending ? (
        <>
          <Spinner />
          <div> Deleting Account...</div>
        </>
      ) : (
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
      <CSSTransition
        in={showConfirm}
        timeout={300}
        nodeRef={nodeRef}
        classNames="message"
        unmountOnExit
      >
        <Confirm
          icon={"⚠️ "}
          message={"Permanently delete Account."}
          deleteItem={deleteItem}
          nodeRef={nodeRef}
        />
      </CSSTransition>
    </div>
  );
}
