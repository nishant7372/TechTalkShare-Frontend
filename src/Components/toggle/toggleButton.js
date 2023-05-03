import styles from "./toggleButton.module.css";

export default function ToggleButton({ on, setOn }) {
  const toggle = () => setOn((o) => !o);
  return (
    <div
      className={`${styles["btn"]} ${styles[on ? "on" : "off"]}`}
      onClick={toggle}
    >
      <span className={styles["pin"]} />
    </div>
  );
}
