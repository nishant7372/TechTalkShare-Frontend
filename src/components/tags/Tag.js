import styles from "./Tag.module.css";

export default function Tag({ tag, color, tagStyles }) {
  return (
    <div className={`${styles["tag"]} ${styles[color]}`} style={tagStyles}>
      {tag.value}
    </div>
  );
}
