import { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(
  (
    {
      type,
      placeholder,
      setState,
      value,
      name,
      required,
      autoFous,
      inputStyle,
    },
    ref
  ) => {
    return (
      <input
        className={styles["input"]}
        type={type}
        placeholder={placeholder}
        onChange={setState}
        value={value}
        name={name}
        required={required}
        autoFocus={autoFous}
        style={inputStyle}
        ref={ref}
      />
    );
  }
);

export default Input;
