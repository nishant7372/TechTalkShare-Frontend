import styles from "./personalInfo.module.css";

import { useState, useEffect } from "react";

import { useAuthContext } from "../../../../hooks/context/useAuthContext";
import { useUpdateUser } from "../../../../hooks/user/useUpdateUser";
import { useReadProfile } from "../../../../hooks/user/useReadProfile";
import { useMessageContext } from "../../../../hooks/context/useMessageContext";

import Spinner from "../../../../Components/loading-spinners/spinner/spinner";
import SimpleButton from "../../../../Components/button/simpleButton";

export default function PersonalInfo() {
  const { user } = useAuthContext();
  const { updateUser, isPending } = useUpdateUser();
  const { readProfile } = useReadProfile();
  const { dispatch: messageDispatch } = useMessageContext();

  const [noChange, setNoChange] = useState(false);
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);

  const handleSave = async () => {
    const res = await updateUser({ name, age });
    if (res.ok) {
      messageDispatch({ type: "SUCCESS", payload: res.ok });
    } else if (res.error) {
      messageDispatch({ type: "ERROR", payload: res.error });
    }
    await readProfile();
  };

  useEffect(() => {
    setNoChange(+age === user.age && name === user.name);
  }, [age, name, user]);

  return (
    <div className={styles["personalInfo-box"]}>
      <div className={"heading"}>Personal Info</div>
      <form className={styles["info"]}>
        <div className={"flex-row"}>
          <label htmlFor="name">Name: </label>
          <input
            required
            className={styles["input"]}
            type="text"
            name="Name"
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
            name="Age"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </div>
      </form>
      <div className={"flex-row"}>
        {isPending ? (
          <div className={styles["disabled"]}>
            <Spinner />
          </div>
        ) : (
          <SimpleButton
            icon={<i className="fa-regular fa-floppy-disk"></i>}
            content=" &nbsp;Save Changes"
            disabled={noChange}
            buttonStyle={{
              fontSize: "1.8rem",
              padding: "0.3rem 0.8rem",
              ...(noChange && { cursor: "not-allowed" }),
              ...(noChange && { backgroundColor: "#555" }),
            }}
            type="saveButton"
            action={handleSave}
          />
        )}
      </div>
    </div>
  );
}
