import styles from "./avatar.module.css";

import { useState } from "react";

import { useUploadAvatar } from "../../../../hooks/avatar/useUploadAvatar";
import { useReadProfile } from "../../../../hooks/user/useReadProfile";
import { useDeleteAvatar } from "../../../../hooks/avatar/useDeleteAvatar";

import { useDispatch, useSelector } from "react-redux";
import { setError, setSuccess } from "../../../../features/alertSlice";

import Spinner from "../../../../Components/loading-spinners/spinner/spinner";
import SimpleButton from "../../../../Components/button/simpleButton";

export default function Avatar() {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);

  const { readProfile } = useReadProfile();
  const { uploadAvatar, isPending: uploadPending } = useUploadAvatar();
  const { deleteAvatar, isPending: deletePending } = useDeleteAvatar();

  const avatarImage = process.env.PUBLIC_URL + "/img/avatar.png";

  const [currImg, setCurrImg] = useState(avatarImage);
  const [isSelected, setIsSelected] = useState(false);

  const handleSave = async (avatarImage) => {
    const res = await uploadAvatar(avatarImage);
    if (res.ok) {
      dispatch(setSuccess(res.ok));
    } else if (res.error) {
      dispatch(setError(res.error));
    }
    setIsSelected(false);
    await readProfile();
  };

  const handleDeleteAvatar = async () => {
    const res = await deleteAvatar();
    if (res.ok) {
      dispatch(setSuccess(res.ok));
    } else if (res.error) {
      dispatch(setError(res.error));
    }
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
          {uploadPending ? (
            <Spinner />
          ) : (
            <>
              <SimpleButton
                icon={<i className="fa-regular fa-floppy-disk"></i>}
                content=" &nbsp;Save"
                buttonStyle={{
                  fontSize: "1.8rem",
                  padding: "0.3rem 0.8rem",
                }}
                type="saveButton"
                action={() => {
                  handleSave(currImg);
                }}
              />

              <SimpleButton
                icon={<i className="fa-solid fa-circle-minus"></i>}
                content=" &nbsp;Remove"
                buttonStyle={{
                  fontSize: "1.8rem",
                  padding: "0.3rem 0.8rem",
                }}
                type="removeButton"
                action={() => {
                  setCurrImg(avatarImage);
                  setIsSelected(false);
                }}
              />
            </>
          )}
        </div>
      )}

      {!isSelected && (
        <div>
          {!user?.avatar && (
            <label htmlFor="myFileInput">
              <SimpleButton
                icon={<i className="fa-solid fa-cloud-arrow-up"></i>}
                content=" &nbsp;Upload Avatar"
                buttonStyle={{
                  fontSize: "1.8rem",
                  padding: "0.3rem 0.8rem",
                }}
                type="uploadButton"
                divType={true}
              />
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
                <SimpleButton
                  icon={<i className="fa-solid fa-trash"></i>}
                  content=" &nbsp;Delete Avatar"
                  buttonStyle={{
                    fontSize: "1.8rem",
                    padding: "0.3rem 0.8rem",
                  }}
                  type="deleteButton"
                  action={handleDeleteAvatar}
                />
              )}
            </>
          )}
        </div>
      )}
      <div className={"description"}>
        Allowed Formats: ".jpeg, .jpg, .png" <br />
        Allowed size: 1mb
      </div>
    </div>
  );
}
