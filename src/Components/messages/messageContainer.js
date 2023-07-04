import styles from "./messageContainer.module.css";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../features/alertSlice";
import { CSSTransition } from "react-transition-group";

import Successful from "./successful";
import Error from "./error";

export default function MessageContainer() {
  const { error, success } = useSelector((store) => store.alert);
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);

  const nodeRef = useRef(null);

  useEffect(() => {
    if (error || success) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [error, success]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMessage(false);
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
      in={showMessage}
      timeout={300}
      nodeRef={nodeRef}
      classNames="movedown"
      unmountOnExit
      onExited={afterExit}
    >
      <div className={`${styles["messageContainer"]}`} ref={nodeRef}>
        {error && (
          <Error
            error={error}
            style={{
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
            }}
          />
        )}
        {success && (
          <Successful
            successful={success}
            style={{
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
            }}
          />
        )}
        <div
          className={styles["closeButton"]}
          onClick={() => setShowMessage(false)}
        >
          x
        </div>
      </div>
    </CSSTransition>
  );
}
