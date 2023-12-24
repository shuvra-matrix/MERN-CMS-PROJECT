import { Fragment, useState } from "react";
import styles from "./Header.module.css";
import BlogCategory from "./BlogCategory/BlogCategory";

const Header = () => {
  const [isDropdown, setDropdown] = useState(false);

  const dropDownHandler = () => {
    setDropdown((pre) => !pre);
  };

  return (
    <Fragment>
      <div className={styles["main-header"]}>
        <div className={styles["header"]}>
          <div className={styles["header-one"]}>
            <h2>BlogSpot</h2>
            <div className={styles["blog-nav"]} onClick={dropDownHandler}>
              <h3>Blogs</h3>
              <img
                width="50"
                height="50"
                src={
                  isDropdown
                    ? "https://img.icons8.com/ios/50/collapse-arrow.png"
                    : "https://img.icons8.com/ios/50/expand-arrow--v1.png"
                }
                alt="expand-arrow--v2"
              />
            </div>
          </div>
          <div className={styles["header-two"]}>
            <div className={styles["search"]}>
              <input type="text"></input>
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/search--v1.png"
                alt="search--v1"
              />
            </div>
            <button className={styles["login"]} type="button">
              Login
            </button>
          </div>
        </div>
      </div>
      {isDropdown && <BlogCategory />}
    </Fragment>
  );
};

export default Header;
