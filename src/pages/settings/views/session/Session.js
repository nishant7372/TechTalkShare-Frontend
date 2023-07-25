import styles from "./Session.module.css";

import { useFormatDate } from "../../../../hooks/utils/useFormatDate";
import { useReadProfile } from "../../../../hooks/user/useReadProfile";
import { useSessionLogout } from "../../../../hooks/user/useSessionLogout";

import { useDispatch } from "react-redux";
import { setSuccess, setError } from "../../../../features/alertSlice";

import Alert from "../../../../components/alerts/Alert";
import Button from "../../../../components/button/Button";
import Spinner from "../../../../components/loaders/spinner/Spinner";

export default function Session({ session, active }) {
  const dispatch = useDispatch();

  const { formatDate } = useFormatDate();
  const { readProfile } = useReadProfile();
  const { sessionLogout, isPending } = useSessionLogout();

  const { _id } = session;
  const { osDetails, creationTime } = session.session;

  const handleLogout = async () => {
    const res = await sessionLogout(_id, active);
    if (res.ok) {
      dispatch(setSuccess(res.ok));
    } else if (res.error) {
      dispatch(setError(res.error));
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