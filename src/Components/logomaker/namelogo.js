import styles from "./namelogo.module.css";
import { useLogoMaker } from "../../hooks/utils/useLogoMaker";

export default function NameLogo({ logoStyle, name }) {
  const { getFirstLetters } = useLogoMaker();
  const colors = [
    "skyblue",
    "orange",
    "blue",
    "red",
    "orangered",
    "magenta",
    "voilet",
    "green",
  ];
  return (
    <div
      title={name}
      className={`${styles["userNameLogo"]} ${
        styles[colors[Math.floor(Math.random() * 8)]]
      }`}
      style={logoStyle}
    >
      {getFirstLetters(name)}
    </div>
  );
}
