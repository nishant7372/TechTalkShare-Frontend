import styles from "./toggleButton.module.css";

export default function ToggleButton({ on, setOn, buttonStyle }) {
  const toggle = () => setOn((o) => !o);
  return (
    <div
      className={`${styles["btn"]} ${styles[on ? "on" : "off"]}`}
      style={buttonStyle}
      onClick={toggle}
    >
      <span className={styles["pin"]} />
    </div>
  );
}
