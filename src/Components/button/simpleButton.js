import styles from "./simpleButton.module.css";

import { Link } from "react-router-dom";

export default function SimpleButton({
  icon,
  link,
  content,
  buttonStyle,
  type,
  action,
  formAction,
}) {
  return (
    <>
      {!link && (
        <button
          className={`${styles["simpleButton"]} ${styles[type]}`}
          style={buttonStyle}
          onClick={action}
          type={formAction}
        >
          {icon ? icon : ""}
          {content}
        </button>
      )}
      {link && (
        <Link
          className={`${styles["simpleButton"]} ${styles[type]}`}
          style={buttonStyle}
          to={link}
          onClick={action}
          type={formAction}
        >
          {icon ? icon : ""}
          {content}
        </Link>
      )}
    </>
  );
}
