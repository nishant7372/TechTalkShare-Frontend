import styles from "./messageContainer.module.css";

import { useState, useEffect } from "react";
import { useMessageContext } from "../../hooks/context/useMessageContext";

import Successful from "./successful";
import Error from "./error";

export default function MessageContainer() {
  const { error, success, dispatch } = useMessageContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (error || success) {
      setMounted(true);
      timeoutId = setTimeout(() => {
        setMounted(false);
      }, 2000);
    }

    return () => {
      if (mounted) {
        clearInterval(timeoutId);
        dispatch({ type: "RESET" });
      }
    };
  }, [error, success, mounted, dispatch]);

  return mounted ? (
    <div className={`${styles["messageContainer"]}`}>
      {error && <Error error={error} />}
      {success && <Successful successful={success} />}
    </div>
  ) : null;
}
