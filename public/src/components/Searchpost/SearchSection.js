import styles from "./SearchSection.module.css";
import send from "../../media/icons8-send-48.png";
import search from "../../media/icons8-search-64.png";
import { useState } from "react";

const SearchSection = (props) => {
  const [inputData, setInputData] = useState("");

  const inputHandler = (e) => {
    setInputData(e.target.value);
  };

  const searchHandlder = (e) => {
    e.preventDefault();
    props.searchDataHandler(inputData);
    setInputData("");
  };

  return (
    <div className={styles["main-div"]}>
      <div className={styles["round-one"]}></div>
      <div className={styles["round-two"]}></div>
      <div className={styles["title"]}>
        <p>Blog</p>
        <div className={styles["strip-one"]}></div>
        <div className={styles["strip-two"]}></div>
        <div className={styles["strip-three"]}></div>
      </div>
      <div className={styles["search-div"]}>
        <form onSubmit={searchHandlder}>
          <input
            onChange={inputHandler}
            type="text"
            name="search"
            placeholder="Search"
            value={inputData}
            required
          ></input>
          <img
            className={styles["search"]}
            width="64"
            height="64"
            src={search}
            alt="external-search-alignment-and-tools-kiranshastry-gradient-kiranshastry"
          />
          <button className={styles["send"]}>
            <img
              className={styles["send-img"]}
              width="48"
              height="48"
              src={send}
              alt="send"
            ></img>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchSection;
