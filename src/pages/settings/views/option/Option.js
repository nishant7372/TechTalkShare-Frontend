import styles from "./Option.module.css";

export default function Option({ emoji, option, OptionNo, setOption, active }) {
  const handleOption = (OptionNo) => {
    setOption(OptionNo);
  };
  return (
    <div
      className={`${styles["option"]} ${styles[active ? "active" : ""]}`}
      onClick={() => handleOption(OptionNo)}
    >
      <span className={styles["emoji"]}>{emoji} </span>
      <span className={styles["text"]}>{option}</span>
    </div>
  );
}
