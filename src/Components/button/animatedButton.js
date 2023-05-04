import { Link } from "react-router-dom";
import styles from "./animatedButton.module.css";

export default function AnimatedButton({
  icon,
  link,
  content,
  buttonStyle,
  type,
  action,
}) {
  return (
    <>
      {!link && (
        <div
          className={`${styles["animatedButton"]} ${styles[type]}`}
          style={buttonStyle}
          onClick={action}
        >
          {icon ? icon : ""}
          {content}
        </div>
      )}
      {link && (
        <Link
          className={`${styles["animatedButton"]} ${styles[type]}`}
          style={buttonStyle}
          to={link}
          onClick={action}
        >
          {icon ? icon : ""}
          {content}
        </Link>
      )}
    </>
  );
}
