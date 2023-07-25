import styles from "./Settings.module.css";

import { useEffect, useState } from "react";

import Option from "./views/option/Option";
import Setting from "./views/setting/Setting";

import PersonalInfo from "./views/main/PersonalInfo";
import Avatar from "./views/main/Avatar";

import Security from "./views/main/Security";
import YourDevices from "./views/main/YourDevices";
import DeleteAccount from "./views/main/DeleteAccount";

export default function Settings() {
  const [setting, setSetting] = useState(1);
  const [option, setOption] = useState(1);

  useEffect(() => {
    setOption(1);
  }, [setting]);

  return (
    <div className={styles["main-container"]}>
      <div className={styles["settingsBox"]}>
        <div className={styles["settings-bar"]}>
          <div className={styles["left"]}>
            ⚙️<span className={styles["text"]}> Settings</span>
          </div>
          <div className={styles["right"]}>
            <Setting
              active={setting === 1}
              setting={"Profile"}
              settingNo={1}
              setSetting={setSetting}
            />
            <Setting
              active={setting === 2}
              setting={"Accounts"}
              settingNo={2}
              setSetting={setSetting}
            />
          </div>
        </div>

        {setting === 1 && (
          <div className={styles["settings"]}>
            <div className={styles["options"]}>
              <div className={styles["sub-container"]}>
                <Option
                  emoji="💁"
                  option="Avatar"
                  OptionNo={1}
                  setOption={setOption}
                  active={option === 1}
                />
                <Option
                  emoji="📖"
                  option="Personal Info"
                  OptionNo={2}
                  setOption={setOption}
                  active={option === 2}
                />
              </div>
            </div>

            <div className={styles["main"]}>
              {option === 1 && <Avatar />}
              {option === 2 && <PersonalInfo />}
            </div>
          </div>
        )}

        {setting === 2 && (
          <div className={styles["settings"]}>
            <div className={styles["options"]}>
              <div className={styles["sub-container"]}>
                <Option
                  emoji="🔒"
                  option="Security"
                  OptionNo={1}
                  setOption={setOption}
                  active={option === 1}
                />
                <Option
                  emoji="🖥️"
                  option="Your Devices"
                  OptionNo={2}
                  setOption={setOption}
                  active={option === 2}
                />
                <Option
                  emoji="🗑️"
                  option="Delete Account"
                  OptionNo={3}
                  setOption={setOption}
                  active={option === 3}
                />
              </div>
            </div>

            <div className={styles["main"]}>
              {option === 1 && <Security />}
              {option === 2 && <YourDevices />}
              {option === 3 && <DeleteAccount />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
