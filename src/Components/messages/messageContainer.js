import styles from "./messageContainer.module.css";

import { useState, useEffect } from "react";
import { useMessageContext } from "../../hooks/useMessageContext";

import Successful from "./successful";
import Error from "./error";

export default function MessageContainer() {
  const { error, success, dispatch } = useMessageContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (error || success) {
      setMounted(true);
      setTimeout(() => {
        setMounted(false);
      }, 2000);
    }

    return () => {
      if (mounted) {
        dispatch({ type: "RESET" });
      }
    };
  }, [error, success, mounted, dispatch]);

  return mounted ? (
    <div className={styles["mainContainer"]}>
      <div className={`${styles["messageContainer"]} ${styles["overlay"]}`}>
        {error && <Error error={error} />}
        {success && <Successful successful={success} />}
      </div>
    </div>
  ) : null;
}
