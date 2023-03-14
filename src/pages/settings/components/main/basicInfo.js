import styles from "./basicInfo.module.css";
import "../common.css";

import { useState } from "react";

import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useUpdateUser } from "../../../../hooks/user/useUpdateUser";
import { useReadProfile } from "../../../../hooks/user/useReadProfile";

import Spinner from "../../../../Components/loading-spinners/spinner/spinner";
import Error from "../../../../Components/messages/error";
import Successful from "../../../../Components/messages/successful";

export default function BasicInfo() {
  const { user } = useAuthContext();
  const { updateUser, error, isPending } = useUpdateUser();
  const { readProfile } = useReadProfile();

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);

  const [renderMsg, setRenderMsg] = useState(false);

  const handleSave = async () => {
    await updateUser({ name, age });
    await readProfile();
    setRenderMsg(true);
    setTimeout(() => {
      setRenderMsg(false);
    }, 3000);
  };

  return (
    <div className={styles["basicInfo-box"]}>
      <div className={"heading"}>Basic Info</div>
      <form className={styles["info"]}>
        <div className={"flex-row"}>
          <label htmlFor="name">Name: </label>
          <input
            required
            className={styles["input"]}
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className={"flex-row"}>
          <label htmlFor="age">Age: </label>
          <input
            required
            className={styles["input"]}
            type="number"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </div>
      </form>
      <div className={"flex-row"}>
        {isPending && (
          <div className={styles["disabled"]}>
            <Spinner />
          </div>
        )}
        {!isPending && (
          <div className={"saveButton"} onClick={handleSave}>
            Save changes
          </div>
        )}
        {renderMsg && error && <Error error={error} />}

        {renderMsg && !error && !isPending && (
          <Successful successful={"Update Successful"} />
        )}
      </div>
    </div>
  );
}
