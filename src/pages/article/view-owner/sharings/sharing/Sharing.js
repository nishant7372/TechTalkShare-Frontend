import styles from "./Sharing.module.css";

import { useState } from "react";
import { useEffect } from "react";
import { Tooltip } from "react-tooltip";

import { useFormatDate } from "../../../../../hooks/utils/useFormatDate";
import { useUpdateSharing } from "../../../../../hooks/sharing/useUpdateSharing";
import { useDeleteSharing } from "../../../../../hooks/sharing/useDeleteSharing";

import ToggleButton from "../../../../../components/buttons/ToggleButton";
import Button from "../../../../../components/buttons/Button";
import Spinner from "../../../../../components/loaders/spinner/Spinner";
import { useHandleResponse } from "../../../../../hooks/utils/useHandleResponse";

export default function Sharing({ sharing, updated, updateSharings }) {
  const { timeSince } = useFormatDate();

  const { handleResponse } = useHandleResponse();
  const { deleteSharing, isPending: deletePending } = useDeleteSharing();
  const { updateSharing, isPending: updatePending } = useUpdateSharing();

  const [noChange, setNoChange] = useState(false);
  const [editPermission, setEditPermission] = useState(sharing.editPermission);

  const handleEditStatus = (res) => {
    setEditPermission(res);
  };

  const handleSave = async () => {
    const res = await updateSharing(sharing._id, {
      ...(editPermission !== sharing.editPermission && { editPermission }),
    });
    handleResponse(res);
    updateSharings();
  };

  const handleDelete = async () => {
    const res = await deleteSharing(sharing._id);
    handleResponse(res);
    updateSharings();
  };

  useEffect(() => {
    setNoChange(editPermission === sharing.editPermission);
  }, [editPermission, sharing]);

  return (
    <div className={styles["sharing"]}>
      <div className={styles["top-container"]}>
        <div
          className={styles["col"]}
          data-tooltip-id="name2-tooltip"
          data-tooltip-content={sharing.sharedWith.name}
          data-tooltip-place="top"
          data-tooltip-variant="info"
        >
          @ {sharing?.sharedWith?.userName}
        </div>
        <Tooltip
          id="name1-tooltip"
          style={{
            fontSize: "1.6rem",
            backgroundColor: "orange",
            padding: "0.4rem 0.8rem",
          }}
        />
        <Tooltip
          id="name2-tooltip"
          style={{
            fontSize: "1.6rem",
            backgroundColor: "green",
            padding: "0.4rem 0.8rem",
          }}
        />
        <div className={styles["col"]}>
          <ToggleButton on={editPermission} setOn={handleEditStatus} />
        </div>

        <div className={styles["col"]}>
          {!updated && (
            <div className={styles["h4"]}>
              {timeSince(sharing.createdAt)} ago
            </div>
          )}
          {updated && (
            <div className={styles["h4"]}>
              {timeSince(sharing.updatedAt)} ago
            </div>
          )}
        </div>
        <div className={styles["col"]}>
          {updatePending ? (
            <div className={styles["disabled"]}>
              <Spinner spinnerStyles={{ width: "2.3rem", height: "2.3rem" }} />
            </div>
          ) : (
            <div
              data-tooltip-id="my-tooltip"
              data-tooltip-content={!noChange ? "Save Changes" : null}
              data-tooltip-place="top"
              data-tooltip-variant="info"
              style={{ display: "inline-block" }}
            >
              <Button
                icon={<i className="fa-regular fa-floppy-disk"></i>}
                content="&nbsp; Save"
                disabled={noChange}
                buttonStyle={{
                  fontSize: "1.6rem",
                  padding: "0.3rem 0.8rem",
                  ...(noChange && { cursor: "not-allowed" }),
                  ...(noChange && { backgroundColor: "#555" }),
                  textAlign: "center",
                }}
                type="saveButton"
                action={handleSave}
              />
            </div>
          )}
          <Tooltip
            id="my-tooltip"
            style={{
              fontSize: "1.6rem",
              backgroundColor: "orangered",
              padding: "0.4rem 0.8rem",
            }}
          />
        </div>
        <div className={styles["col"]}>
          {deletePending ? (
            <div className={styles["disabled"]}>
              <Spinner spinnerStyles={{ width: "2.3rem", height: "2.3rem" }} />
            </div>
          ) : (
            <Button
              icon={<i className="fa-solid fa-user-slash"></i>}
              content="&nbsp; Revoke"
              buttonStyle={{
                fontSize: "1.6rem",
                padding: "0.3rem 0.8rem",
                textWrap: "noWrap",
                textAlign: "center",
                alignSelf: "flex-start",
              }}
              type="deleteButton"
              action={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
