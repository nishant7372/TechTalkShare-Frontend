import styles from "./Avatar.module.css";

import { useState } from "react";

import { useUploadAvatar } from "../../../hooks/avatar/useUploadAvatar";
import { useReadProfile } from "../../../hooks/user/useReadProfile";
import { useDeleteAvatar } from "../../../hooks/avatar/useDeleteAvatar";

import { useSelector } from "react-redux";

import Spinner from "../../../components/loaders/spinner/Spinner";
import Button from "../../../components/buttons/Button";
import images from "../../../constants/images";
import { useHandleResponse } from "../../../hooks/utils/useHandleResponse";

export default function Avatar() {
  const { user } = useSelector((store) => store.auth);

  const { readProfile } = useReadProfile();
  const { uploadAvatar, isPending: uploadPending } = useUploadAvatar();
  const { deleteAvatar, isPending: deletePending } = useDeleteAvatar();
  const { handleResponse } = useHandleResponse();

  const avatarImage = images.avatar;

  const [currImg, setCurrImg] = useState(avatarImage);
  const [isSelected, setIsSelected] = useState(false);

  const handleSave = async (avatarImage) => {
    const res = await uploadAvatar(avatarImage);
    handleResponse(res);
    setIsSelected(false);
    await readProfile();
  };

  const handleDeleteAvatar = async () => {
    const res = await deleteAvatar();
    handleResponse(res);
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
              <Button
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

              <Button
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
              <Button
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
                <Button
                  icon={<i className="fa-solid fa-trash"></i>}
                  content=" &nbsp;Delete Avatar"
                  buttonStyle={{
                    fontSize: "1.8rem",
                    padding: "0.3rem 0.8rem",
                    alignSelf: "flex-start",
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
