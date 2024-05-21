import "./LeftPanel.css";
import { NavLink } from "react-router-dom";
import styles from "./LeftPanel.module.css";
import { Link } from "react-router-dom";
import images from "../../constants/images";

const Tile = ({ link, icon, label }) => {
  return (
    <NavLink to={link}>
      <i className={icon}></i>
      <span>{label}</span>
    </NavLink>
  );
};

export default function LeftPanel() {
  const tiles = [
    { link: "/store", icon: "fa-solid fa-briefcase", label: "My Store" },
    { link: "/articles", icon: "fa-solid fa-file-pdf", label: "My Articles" },
    {
      link: "/shared",
      icon: "fa-solid fa-share-from-square",
      label: "Shared with Me",
    },
    {
      link: "/download",
      icon: "fa-solid fa-cloud-arrow-down",
      label: "Download",
    },
    {
      link: "/downloads",
      icon: "fa-solid fa-clock-rotate-left",
      label: "Download History",
    },
    { link: "/chat", icon: "fa-brands fa-rocketchat", label: "Conversation" },
  ];

  return (
    <div className={styles["section1"]}>
      <div className={styles["section1-subContainer"]}>
        <Link to="/" className={styles["appName"]}>
          <img
            className={styles["appNameLogo"]}
            src={images.devstoreLogo}
            alt="logo"
          />
        </Link>

        <div className={styles["link"]}>
          {tiles.map(({ link, icon, label }, index) => (
            <Tile link={link} icon={icon} label={label} key={index} />
          ))}
          <div className={styles["seperator"]}></div>
        </div>
        <div
          className={styles["logout-btn"]}
          tabIndex={0}
          //   onClick={isPending ? null : handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
