import styles from "./SearchSection.module.css";

const SearchSection = (props) => {
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
        <input type="text" name="search" placeholder="Search"></input>
        <img
          width="64"
          height="64"
          src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/external-search-alignment-and-tools-kiranshastry-gradient-kiranshastry.png"
          alt="external-search-alignment-and-tools-kiranshastry-gradient-kiranshastry"
        />
      </div>
    </div>
  );
};

export default SearchSection;
