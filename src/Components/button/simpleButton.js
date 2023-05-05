import styles from "./simpleButton.module.css";

import { Link } from "react-router-dom";

// icon -> font Awesome icon
// link -> route link
// content -> Button content or an html element
// buttonStyle -> apply your own styles to button (fontSize, padding, etc.)
// type ->  className
// action -> function to be performed
// formAction -> when button is a form button, type is reset or submit
// divType -> container is div or not
export default function SimpleButton({
  icon,
  link,
  content,
  buttonStyle,
  type,
  action,
  formAction,
  divType,
}) {
  return (
    <>
      {!divType && !link && (
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
      {!divType && link && (
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
      {divType && (
        <div
          className={`${styles["simpleButton"]} ${styles[type]}`}
          style={buttonStyle}
          onClick={action}
          type={formAction}
        >
          {icon ? icon : ""}
          {content}
        </div>
      )}
    </>
  );
}
