import styles from "./yourDevices.module.css";

import { useEffect, useMemo } from "react";

import { useReadProfile } from "../../../../hooks/user/useReadProfile";
import { useLogoutAllOther } from "../../../../hooks/user/useLogoutAllOther";

import { useDispatch, useSelector } from "react-redux";
import { setError, setSuccess } from "../../../../features/alertSlice";

import Session from "../sessions/session";
import SimpleButton from "../../../../Components/button/simpleButton";
import Spinner from "../../../../Components/loading-spinners/spinner/spinner";
import Loading from "../../../../Components/loading-spinners/loading/loading";

export default function CurrentSessions() {
  const dispatch = useDispatch();

  const { user, currentSessionId } = useSelector((store) => store.auth);
  const { sessions } = user;

  const { readProfile } = useReadProfile();
  const { logoutAllOther, isPending } = useLogoutAllOther();

  const handleLogOutAllOther = async () => {
    const res = await logoutAllOther();
    if (res.ok) {
      dispatch(setSuccess(res.ok));
    } else if (res.error) {
      dispatch(setError(res.error));
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
