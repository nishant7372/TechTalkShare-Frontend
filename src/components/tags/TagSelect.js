import styles from "./TagSelect.module.css";

import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import options from "./Options";
import { useDispatch } from "react-redux";

export default function TagSelect({ tags, setTags, search, small }) {
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();

  const customStylesSm = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "pink" : "rgba(0,0,0,0)", // set the desired background color here
      border: "none",
      cursor: "pointer",
      height: "3rem",
      minHeight: "3rem",
      maxHeight: "3rem",
      width: "11.5rem",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#555" : "#333333", // set the desired background color here
      color: "#ffffff80", // set the desired text color here
      ":hover": {
        backgroundColor: "#ffffff20",
        whiteSpace: "nowrap",
        cursor: "pointer",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0rem 0.8rem",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
      width: "7rem",
      padding: "0",
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
    singleValue: (provided, state) => ({
      ...provided,
      color: "white",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
  };

  const customStylesLg = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "pink" : "#ffffff00", // set the desired background color here
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#333333" : "#333333", // set the desired background color here
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
    if (search) {
      if (selectedOptions.length > 1) {
        return;
      }
      dispatch(setTags({ currPageNo: 0, tag: selectedOptions }));
    } else {
      if (!search && selectedOptions.length > 10) {
        return;
      }
      setTags(selectedOptions);
    }
  };

  return (
    <CreatableSelect
      closeMenuOnSelect={false}
      components={animatedComponents}
      maxMenuHeight={"20rem"}
      menuPlacement="auto"
      placeholder={small ? "🏷️ Select Tag" : "🏷️ Select Tags..."}
      options={options}
      isMulti={small ? false : true}
      isSearchable={true}
      makeAnimated
      styles={small ? customStylesSm : customStylesLg}
      className={
        styles[
          small ? "react-select-container-sm" : "react-select-container-lg"
        ]
      }
      onChange={handleSelectChange}
      value={tags}
      required
    />
  );
}
