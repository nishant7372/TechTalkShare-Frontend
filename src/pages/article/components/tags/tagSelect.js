import styles from "./tagSelect.module.css";

import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import options from "./options";

export default function TagSelect({ tags, setTags, search }) {
  const animatedComponents = makeAnimated();

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "pink" : "#ffffff00", // set the desired background color here
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "pink" : "#333333", // set the desired background color here
      color: "#ffffff80", // set the desired text color here
      ":hover": {
        backgroundColor: "#ffffff20",
        whiteSpace: "nowrap",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      maxHeight: "4.1rem",
      overflow: "auto",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#333333", // set the desired background color here
      //   maxHeight: "10rem", // set the maximum height here
      overflow: "auto",
      "z-index": search ? 2 : 7,
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: "white",
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: "orangered",
      color: "white",
    }),
  };

  const handleSelectChange = (selectedOptions) => {
    if (search && selectedOptions.length > 1) {
      return;
    }
    if (!search && selectedOptions.length > 10) {
      return;
    }
    setTags(selectedOptions);
  };

  return (
    <CreatableSelect
      closeMenuOnSelect={false}
      components={animatedComponents}
      maxMenuHeight={"20rem"}
      menuPlacement="auto"
      placeholder="Select Tags..."
      options={options}
      isMulti={true}
      isSearchable={true}
      makeAnimated
      styles={customStyles}
      className={styles["react-select-container"]}
      onChange={handleSelectChange}
      value={tags}
      required
    />
  );
}
