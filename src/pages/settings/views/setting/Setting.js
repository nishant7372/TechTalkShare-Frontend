import styles from "./Setting.module.css";

export default function Setting({ setting, settingNo, setSetting, active }) {
  const handleSetting = (settingNo) => {
    setSetting(settingNo);
  };
  return (
    <div
      className={`${styles["setting"]} ${styles[active ? "active" : ""]}`}
      onClick={() => handleSetting(settingNo)}
    >
      <span className={styles["text"]}>{setting}</span>
    </div>
  );
}
