import styles from "./Tag.module.css";

export default function Tag({ tag, color }) {
  return <div className={`${styles["tag"]} ${styles[color]}`}>{tag.value}</div>;
}
