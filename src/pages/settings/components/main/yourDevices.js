import styles from "./yourDevices.module.css";

import { useEffect, useMemo } from "react";

import { useAuthContext } from "../../../../hooks/context/useAuthContext";
import { useLogoutAllOther } from "../../../../hooks/user/useLogoutAllOther";
import { useReadProfile } from "../../../../hooks/user/useReadProfile";
import { useMessageContext } from "../../../../hooks/context/useMessageContext";

import Spinner from "../../../../Components/loading-spinners/spinner/spinner";
import Session from "../sessions/session";
import SimpleButton from "../../../../Components/button/simpleButton";
import Loading from "../../../../Components/loading-spinners/loading/loading";

export default function CurrentSessions() {
  const { user, currentSessionId } = useAuthContext();
  const { logoutAllOther, isPending } = useLogoutAllOther();
  const { readProfile } = useReadProfile();

  const { sessions } = user;
  const { dispatch: messageDispatch } = useMessageContext();

  const handleLogOutAllOther = async () => {
    const res = await logoutAllOther();
    if (res.ok) {
      messageDispatch({ type: "SUCCESS", payload: res.ok });
    }
    if (res.error) {
      messageDispatch({ type: "ERROR", payload: res.error });
    }
    await readProfile();
  };

  const activeSession = useMemo(() => {
    return sessions.find(
      (session) => currentSessionId === session._id.toString()
    );
  }, [sessions, currentSessionId]);

  const otherSessions = useMemo(() => {
    return sessions.filter(
      (session) => currentSessionId !== session._id.toString()
    );
  }, [sessions, currentSessionId]);

  useEffect(() => {
    const fetch = async () => {
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
            {isPending ? (
              <div className={styles["disabled"]}>
                <Spinner />
                <span>Logging Out...</span>
              </div>
            ) : (
              <SimpleButton
                icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}
                content=" &nbsp;Logout All Other Sessions"
                buttonStyle={{
                  fontSize: "1.8rem",
                  padding: "0.3rem 0.8rem",
                  ...(sessions.length === 1 && { cursor: "not-allowed" }),
                  ...(sessions.length === 1 && { backgroundColor: "#555" }),
                }}
                disabled={sessions.length === 1}
                type="logOutButton"
                action={handleLogOutAllOther}
              />
            )}
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
