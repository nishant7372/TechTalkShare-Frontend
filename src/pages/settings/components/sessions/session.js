import styles from "./session.module.css";

import { useState } from "react";

import { useFormatDate } from "../../../../hooks/utils/useFormatDate";
import { useSessionLogout } from "../../../../hooks/user/useSessionLogout";
import { useReadProfile } from "../../../../hooks/user/useReadProfile";

import Successful from "../../../../Components/messages/successful";
import Error from "../../../../Components/messages/error";
import Spinner from "../../../../Components/loading-spinners/spinner/spinner";

export default function Session({ session, active }) {
  const [renderMsg, setRenderMsg] = useState(false);
  const { formatDate } = useFormatDate();
  const { sessionLogout, error, isPending } = useSessionLogout();
  const { readProfile } = useReadProfile();

  const { _id } = session;
  const { osDetails, creationTime } = session.session;

  const handleClick = async () => {
    await sessionLogout(_id, active);
    await readProfile();
    setRenderMsg(true);
    setTimeout(() => {
      setRenderMsg(false);
    }, 3000);
  };

  const showDevice = (model) => {
    switch (model) {
      case "desktop":
        return "💻";
      case "mobile":
        return "📲";
      default:
        return "💻";
    }
  };

  return (
    <div className={styles["session"]}>
      <div className={`${styles["container1"]} flex-row`}>
        <div className={styles["big-img"]}>
          {osDetails.model === "tablet" && (
            <img
              src={process.env.PUBLIC_URL + "/img/tablet.png"}
              className={styles["device-img"]}
              alt="tablet"
            />
          )}
          {osDetails.model !== "tablet" && showDevice(osDetails.model)}
        </div>
        <div className="flex-col">
          <div className={styles["session-name"]}>
            <div className={styles["h3"]}>{osDetails.osname}</div>
            {active && (
              <Successful
                className={styles["active-now"]}
                successful={"Active Now"}
                color={"skyblue"}
              />
            )}
          </div>
          <div className={styles["h4"]}>🌐 {osDetails.browser}</div>
          <div className={styles["h6"]}>{formatDate(creationTime)}</div>
        </div>
      </div>
      <div className={styles["container2"]}>
        {isPending && <Spinner />}
        {!isPending && (
          <div
            className={`logOutButton ${styles["logOutButton"]}`}
            onClick={handleClick}
          >
            Logout
          </div>
        )}
        <div>
          {renderMsg && error && <Error error={error} />}
          {renderMsg && !error && !isPending && (
            <Successful successful={"Logout successful"} />
          )}
        </div>
      </div>
    </div>
  );
}
