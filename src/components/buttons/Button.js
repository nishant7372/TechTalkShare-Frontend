import styles from "./Button.module.css";

import { Link } from "react-router-dom";

// icon -> font Awesome icon
// link -> route link
// content -> Button content or an html element
// buttonStyle -> apply your own styles to button (fontSize, padding, etc.)
// type ->  className
// action -> function to be performed
// formAction -> when button is a form button, type is reset or submit
// disabled -> button is disabled or not
export default function Button({
  icon,
  link,
  content,
  buttonStyle,
  type,
  action,
  formAction,
  divType,
  disabled,
  tabIndex,
}) {
  return link ? (
    <Link
      className={`${styles["simpleButton"]} ${styles[type]}`}
      style={buttonStyle}
      to={link}
      onClick={disabled ? null : action}
      type={formAction}
    >
      {icon ? icon : ""}
      {content}
    </Link>
  ) : divType ? (
    <div
      className={`${styles["simpleButton"]} ${styles[type]}`}
      style={buttonStyle}
      onClick={disabled ? null : action}
      type={formAction}
      tabIndex={tabIndex}
    >
      {icon ? icon : ""}
      {content}
    </div>
  ) : (
    <button
      className={`${styles["simpleButton"]} ${styles[type]}`}
      style={buttonStyle}
      onClick={action}
      type={formAction}
      disabled={disabled}
    >
      {icon ? icon : ""}
      {content}
    </button>
  );
}
