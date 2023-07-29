import styles from "./Session.module.css";

import { useFormatDate } from "../../../../hooks/utils/useFormatDate";
import { useReadProfile } from "../../../../hooks/user/useReadProfile";
import { useSessionLogout } from "../../../../hooks/user/useSessionLogout";

import Alert from "../../../../components/alerts/Alert";
import Button from "../../../../components/buttons/Button";
import Spinner from "../../../../components/loaders/spinner/Spinner";
import images from "../../../../constants/images";
import { useHandleResponse } from "../../../../hooks/utils/useHandleResponse";

export default function Session({ session, active }) {
  const { handleResponse } = useHandleResponse();
  const { formatDate } = useFormatDate();
  const { readProfile } = useReadProfile();
  const { sessionLogout, isPending } = useSessionLogout();

  const { _id } = session;
  const { osDetails, creationTime } = session.session;

  const handleLogout = async () => {
    const res = await sessionLogout(_id, active);
    handleResponse(res);
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
              src={images.tablet}
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
              <Alert
                message={
                  <>
                    <i
                      style={{ fontSize: "1.4rem" }}
                      className="fa-solid fa-user-check"
                    ></i>{" "}
                    <span>Active Now</span>
                  </>
                }
                type={"INFO"}
                style={{
                  padding: "0rem 0.8rem",
                  borderRadius: "4px",
                  fontSize: "1.6rem",
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
          <Button
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
