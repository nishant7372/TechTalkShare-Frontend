import styles from "./yourDevices.module.css";

import { useEffect, useState, useMemo } from "react";

import { useAuthContext } from "../../../../hooks/context/useAuthContext";
import { useLogoutAllOther } from "../../../../hooks/user/useLogoutAllOther";
import { useGetCurrentSession } from "../../../../hooks/user/useGetCurrentSession";
import { useReadProfile } from "../../../../hooks/user/useReadProfile";

import Spinner from "../../../../Components/loading-spinners/spinner/spinner";
import Session from "../sessions/session";
import Error from "../../../../Components/messages/error";
import Successful from "../../../../Components/messages/successful";
import SimpleButton from "../../../../Components/button/simpleButton";
import Loading from "../../../../Components/loading-spinners/loading/loading";

export default function CurrentSessions() {
  const { user, currentSessionID } = useAuthContext();
  const { logoutAllOther, error, isPending } = useLogoutAllOther();
  const { readProfile } = useReadProfile();

  const { sessions } = user;

  const [renderMsg, setRenderMsg] = useState(false);

  const handleLogOutAllOther = async () => {
    await logoutAllOther();
    await readProfile();
    setRenderMsg(true);
    setTimeout(() => {
      setRenderMsg(false);
    }, 3000);
  };

  const activeSession = useMemo(() => {
    return sessions.find(
      (session) => currentSessionID === session._id.toString()
    );
  }, [sessions, currentSessionID]);

  const otherSessions = useMemo(() => {
    return sessions.filter(
      (session) => currentSessionID !== session._id.toString()
    );
  }, [sessions, currentSessionID]);

  const { getCurrentSession } = useGetCurrentSession();

  useEffect(() => {
    const fetch = async () => {
      await getCurrentSession(); // will only get session ID when null (on component first mount)
      await readProfile(); // to get new logged in sessions (without refresh)
    };
    fetch();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles["session-Box"]}>
      {activeSession && sessions ? (
        <>
          <div className={"heading"}>Your Devices</div>
          <p className={"description"}>
            You’re signed in on these devices. There might be multiple activity
            sessions from the same device.
          </p>
          <ul className={styles["sessionContainer"]}>
            <Session session={activeSession} active={true} />
            <div className="seperator"></div>
            {[...otherSessions].reverse().map((session) => (
              <Session
                key={session._id.toString()}
                session={session}
                active={false}
              />
            ))}
          </ul>
          <div className="flex-col">
            {isPending && (
              <div className={styles["disabled"]}>
                <Spinner />
                <span>Logging Out...</span>
              </div>
            )}
            {!isPending && (
              <SimpleButton
                icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}
                content=" &nbsp;Logout All Other Sessions"
                buttonStyle={{
                  fontSize: "1.8rem",
                  padding: "0.3rem 0.8rem",
                }}
                type="logOutButton"
                action={handleLogOutAllOther}
              />
            )}
            <div style={{ alignSelf: "flex-start" }}>
              {renderMsg && error && <Error error={error} />}
              {renderMsg && !error && !isPending && (
                <Successful successful={"Logout successful"} />
              )}
            </div>
            <p className={"warning"}>
              This will end {sessions.length - 1} of your other active sessions.
              It won't affect your current session.
            </p>
          </div>
        </>
      ) : (
        <Loading action="session-loading" />
      )}
    </div>
  );
}
