import styles from "./session.module.css";

import { useFormatDate } from "../../../../hooks/utils/useFormatDate";
import { useSessionLogout } from "../../../../hooks/user/useSessionLogout";
import { useReadProfile } from "../../../../hooks/user/useReadProfile";
import { useMessageContext } from "../../../../hooks/context/useMessageContext";

import Successful from "../../../../Components/messages/successful";
import Spinner from "../../../../Components/loading-spinners/spinner/spinner";
import SimpleButton from "../../../../Components/button/simpleButton";

export default function Session({ session, active }) {
  const { formatDate } = useFormatDate();
  const { sessionLogout, isPending } = useSessionLogout();
  const { readProfile } = useReadProfile();
  const { dispatch: messageDispatch } = useMessageContext();

  const { _id } = session;
  const { osDetails, creationTime } = session.session;

  const handleLogout = async () => {
    const res = await sessionLogout(_id, active);
    if (res.ok) {
      messageDispatch({ type: "SUCCESS", payload: res.ok });
    }
    if (res.error) {
      messageDispatch({ type: "ERROR", payload: res.error });
    }
    await readProfile();
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
                style={{
                  backgroundColor: "rgb(9, 141, 193)",
                  padding: "0.1rem 0.8rem",
                }}
              />
            )}
          </div>
          <div className={styles["h4"]}>🌐 {osDetails.browser}</div>
          <div className={styles["h6"]}>{formatDate(creationTime)}</div>
        </div>
      </div>
      <div className={styles["container2"]}>
        {isPending ? (
          <Spinner />
        ) : (
          <SimpleButton
            icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}
            content=" &nbsp;Logout"
            buttonStyle={{
              fontSize: "1.7rem",
              padding: "0.3rem 0.8rem",
              alignSelf: "flex-end",
            }}
            type="logOutButton"
            action={handleLogout}
          />
        )}
      </div>
    </div>
  );
}
