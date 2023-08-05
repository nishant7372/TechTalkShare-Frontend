import styles from "./AlertContainer.module.css";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../features/alertSlice";
import { CSSTransition } from "react-transition-group";

import Alert from "./Alert";

export default function AlertContainer() {
  const dispatch = useDispatch();
  const { alert } = useSelector((store) => store.alert);
  const [showAlert, setShowAlert] = useState(false);

  const nodeRef = useRef(null);

  useEffect(() => {
    if (alert) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [alert]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const afterExit = () => {
    dispatch(reset());
  };

  return (
    <CSSTransition
      in={showAlert}
      timeout={300}
      nodeRef={nodeRef}
      classNames="movedown"
      unmountOnExit
      onExited={afterExit}
    >
      <div className={`${styles["AlertContainer"]}`} ref={nodeRef}>
        <Alert
          message={
            <>
              <i
                className={`fa-solid fa-circle-${
                  alert.type === "ERROR" ? `exclamation` : `check`
                }`}
              ></i>
              <span
                dangerouslySetInnerHTML={{
                  __html: alert.message,
                }}
              />
            </>
          }
          type={alert.type}
          style={{
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
          }}
        />
        <div
          className={styles["closeButton"]}
          onClick={() => setShowAlert(false)}
        >
          x
        </div>
      </div>
    </CSSTransition>
  );
}
