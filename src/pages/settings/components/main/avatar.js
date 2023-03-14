import styles from "./avatar.module.css";
import "../common.css";

import { useState } from "react";

import { useUploadAvatar } from "../../../../hooks/avatar/useUploadAvatar";
import { useReadProfile } from "../../../../hooks/user/useReadProfile";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useDeleteAvatar } from "../../../../hooks/avatar/useDeleteAvatar";
import Spinner from "../../../../Components/Spinner/Spinner";
import Error from "../../../../Components/Message/error";
import Successful from "../../../../Components/Message/successful";

export default function Avatar() {
  const {
    uploadAvatar,
    error: uploadError,
    isPending: uploadPending,
  } = useUploadAvatar();
  const {
    deleteAvatar,
    error: deleteError,
    isPending: deletePending,
  } = useDeleteAvatar();

  const { readProfile } = useReadProfile();
  const { user } = useAuthContext();
  const avatarImage = process.env.PUBLIC_URL + "/img/avatar.png";

  const [currImg, setCurrImg] = useState(avatarImage);

  const [isSelected, setIsSelected] = useState(false);

  const [renderUploadMsg, setRenderUploadMsg] = useState(false);

  const [renderDeleteMsg, setRenderDeleteMsg] = useState(false);

  const handleSave = async (avatarImage) => {
    await uploadAvatar(avatarImage);

    setIsSelected(false);

    setRenderUploadMsg(true);
    setTimeout(() => {
      setRenderUploadMsg(false);
    }, 3000);

    await getProfile();
  };

  const handleDeleteAvatar = async () => {
    await deleteAvatar();

    setRenderDeleteMsg(true);
    setTimeout(() => {
      setRenderDeleteMsg(false);
    }, 3000);

    await getProfile();
  };

  const getProfile = async () => {
    await readProfile();
  };

  return (
    <div className={styles["avatarUpload-box"]}>
      <div className={"heading"}>Avatar</div>
      <div className={`${styles["avatar-img"]}`}>
        <img
          className={styles["avatar-image"]}
          alt="avatar"
          src={
            isSelected
              ? URL.createObjectURL(currImg)
              : user?.avatar
              ? `data:image/jpeg;base64, ${user.avatar}`
              : avatarImage
          }
        />
      </div>

      {isSelected && (
        <div className={"flex-row"}>
          {uploadPending && <Spinner />}
          {!uploadPending && (
            <>
              <div
                onClick={() => {
                  handleSave(currImg);
                }}
                className={"saveButton"}
              >
                Save
              </div>
              <div
                onClick={() => {
                  setCurrImg(avatarImage);
                  setIsSelected(false);
                }}
                className={"removeButton"}
              >
                Remove
              </div>
            </>
          )}
        </div>
      )}

      {!isSelected && (
        <div>
          {!user?.avatar && (
            <label htmlFor="myFileInput" className={"uploadButton"}>
              Upload Avatar
            </label>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            id="myFileInput"
            className={styles["avatar-input"]}
            onChange={(e) => {
              setCurrImg(e.target.files[0]);
              setIsSelected(true);
            }}
          />
          {user.avatar && (
            <>
              {deletePending && <Spinner />}
              {!deletePending && (
                <div onClick={handleDeleteAvatar} className={"deleteButton"}>
                  Delete Avatar
                </div>
              )}
            </>
          )}
        </div>
      )}

      {renderUploadMsg && uploadError && <Error error={uploadError} />}
      {renderUploadMsg && !uploadError && !uploadPending && (
        <Successful successful={"Upload successful"} />
      )}
      {renderDeleteMsg && deleteError && <Error error={deleteError} />}
      {renderDeleteMsg && !deleteError && !deletePending && (
        <Successful successful={"Delete successful"} />
      )}
      <div className={"description"}>
        Allowed Formats: ".jpeg, .jpg, .png" <br />
        Allowed size: 1mb
      </div>
    </div>
  );
}
