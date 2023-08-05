import styles from "./DeleteAccount.module.css";

import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { useDeleteAccount } from "../../../hooks/user/useDeleteAccount";

import Confirm from "../../../components/modals/confirmModal/Confirm";
import Button from "../../../components/buttons/Button";
import Spinner from "../../../components/loaders/spinner/Spinner";
import { useHandleResponse } from "../../../hooks/utils/useHandleResponse";

export default function DeleteAccount() {
  const nodeRef = useRef(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const { handleResponse } = useHandleResponse();
  const { deleteAccount, isPending } = useDeleteAccount();

  const handleClick = () => {
    setShowConfirm(true);
  };

  const deleteItem = async (response) => {
    setShowConfirm(false);
    if (!response) {
      return;
    }
    const res = await deleteAccount();
    handleResponse(res);
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
        <Button
          icon={<i className="fa-solid fa-trash"></i>}
          content=" &nbsp;Delete Account"
          buttonStyle={{
            fontSize: "1.8rem",
            padding: "0.3rem 0.8rem",
            alignSelf: "flex-start",
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
