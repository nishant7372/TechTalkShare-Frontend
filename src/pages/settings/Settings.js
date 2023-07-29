import styles from "./Settings.module.css";
import { useEffect, useState } from "react";
import PersonalInfo from "./personalInfo/PersonalInfo";
import Avatar from "./avatar/Avatar";
import Security from "./security/Security";
import YourDevices from "./yourDevices/YourDevices";
import DeleteAccount from "./deleteAccount/DeleteAccount";

const Option = ({ emoji, option, optionNo, setOption, active }) => (
  <div
    className={`${styles.option} ${active ? styles.active : ""}`}
    onClick={() => setOption(optionNo)}
  >
    <span className={styles.emoji} role="img" aria-label={option}>
      {emoji}{" "}
    </span>
    <span className={styles.text}>{option}</span>
  </div>
);

const Setting = ({ setting, settingNo, setSetting, active }) => (
  <div
    className={`${styles.setting} ${active ? styles.active : ""}`}
    onClick={() => setSetting(settingNo)}
  >
    <span className={styles.text}>{setting}</span>
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
    <div className={styles["main-container"]}>
      <div className={styles.settingsBox}>
        <div className={styles["settings-bar"]}>
          <div className={styles.left}>
            <span role="img" aria-label="Settings">
              ⚙️
            </span>
            <span className={styles.text}> Settings</span>
          </div>
          <div className={styles.right}>
            {settingsData &&
              settingsData.map((settingData, index) => (
                <Setting
                  key={index}
                  active={setting === index}
                  setting={settingData.name}
                  settingNo={index}
                  setSetting={setSetting}
                />
              ))}
          </div>
        </div>
        <div className={styles.settings}>
          <div className={styles.options}>
            <div className={styles["sub-container"]}>
              {settingsData &&
                settingsData[setting].options.map((optionObj, index) => (
                  <Option
                    key={index}
                    emoji={optionObj.emoji}
                    option={optionObj.name}
                    optionNo={index}
                    setOption={setOption}
                    active={option === index}
                  />
                ))}
            </div>
          </div>
          <div className={styles.main}>
            {settingsData && settingsData[setting].options[option].component}
          </div>
        </div>
      </div>
    </div>
  );
}
