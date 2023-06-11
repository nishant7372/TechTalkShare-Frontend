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

  function hash(string) {
    let number = 0;

    for (let i = 0; i < string.length; i++) {
      const charCode = string.charCodeAt(i);
      const charNumber = charCode - 96; // Assuming lowercase letters (a = 1, b = 2, ...)
      number = number * 26 + charNumber;
    }

    return (number * number) % 8;
  }

  return (
    <div
      title={name}
      className={`${styles["userNameLogo"]} ${
        styles[colors[hash(name.toLowerCase())]]
      }`}
      style={logoStyle}
    >
      {getFirstLetters(name)}
    </div>
  );
}
