import styles from "./Settings.module.css";
import { useEffect, useState } from "react";
import PersonalInfo from "./personalInfo/PersonalInfo";
import Avatar from "./avatar/Avatar";
import Security from "./security/Security";
import YourDevices from "./yourDevices/YourDevices";
import DeleteAccount from "./deleteAccount/DeleteAccount";

const Tile = ({ emoji, label, number, setActive, active }) => (
  <div
    className={`${styles.tile} ${active ? styles.active : ""}`}
    onClick={() => setActive(number)}
  >
    {emoji ? (
      <span className={styles.emoji} role="img" aria-label={label}>
        {emoji}{" "}
      </span>
    ) : null}
    <span className={styles.text}>{label}</span>
  </div>
);

export default function Settings() {
  const [setting, setSetting] = useState(0);
  const [option, setOption] = useState(0);

  useEffect(() => {
    setOption(0);
  }, [setting]);

  const settingsData = [
    {
      name: "Profile",
      options: [
        { name: "Avatar", emoji: "💁", component: <Avatar /> },
        { name: "Personal Info", emoji: "📖", component: <PersonalInfo /> },
      ],
    },
    {
      name: "Accounts",
      options: [
        { name: "Security", emoji: "🔒", component: <Security /> },
        { name: "Your Devices", emoji: "🖥️", component: <YourDevices /> },
        { name: "Delete Account", emoji: "🗑️", component: <DeleteAccount /> },
      ],
    },
  ];

  return (
    <div className={styles.box}>
      <div className={styles["main-container"]}>
        <div className={styles["settings-bar"]}>
          <div className={styles["left"]}>
            <span role="img" aria-label="Settings">
              ⚙️
            </span>
            <span className={styles.text}> Settings</span>
          </div>
          <div className={styles["right"]}>
            {settingsData?.map((settingData, index) => (
              <Tile
                key={index}
                active={setting === index}
                label={settingData.name}
                number={index}
                setActive={setSetting}
              />
            ))}
          </div>
        </div>

        <div className={styles["settings"]}>
          <div className={styles["options"]}>
            {settingsData[setting]?.options?.map((optionObj, index) => (
              <Tile
                key={index}
                emoji={optionObj.emoji}
                label={optionObj.name}
                number={index}
                setActive={setOption}
                active={option === index}
              />
            ))}
          </div>

          <div className={styles["main"]}>
            {settingsData[setting]?.options[option]?.component}
          </div>
        </div>
      </div>
    </div>
  );
}
