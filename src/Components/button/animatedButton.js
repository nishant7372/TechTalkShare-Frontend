import { Link } from "react-router-dom";
import styles from "./animatedButton.module.css";

// icon -> font Awesome icon
// link -> route link
// content -> Button content or an html element
// buttonStyle -> apply your own styles to button (fontSize, padding, etc.)
// type ->  className
// action -> function to be performed

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
