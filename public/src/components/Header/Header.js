import { Fragment, useState } from "react";
import styles from "./Header.module.css";
import BlogCategory from "./BlogCategory/BlogCategory";
import Sidebar from "./Sidebar/Sidebar";

const Header = () => {
  const [isDropdown, setDropdown] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const dropDownHandler = () => {
    setDropdown((pre) => !pre);
  };

  const menuShowHandler = () => {
    setIsShow((pre) => !pre);
  };

  return (
    <Fragment>
      <div className={styles["main-header"]}>
        <div className={styles["header"]}>
          <div className={styles["header-one"]}>
            <h2 className={styles["webname"]}>
              Blog<span>Sp</span>ot
            </h2>
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
            <a href="/">
              <button className={styles["writing"]} type="button">
                START WRITING
              </button>
            </a>

            <a href="/">
              <img
                className={styles["profile"]}
                src="https://img.icons8.com/papercut/60/user-female-circle.png"
                alt="user-female-circle"
              />
            </a>

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
          <a href="/">
            <button className={styles["writing-nd"]} type="button">
              START WRITING
            </button>
          </a>
          <div className={styles["menu"]} onClick={menuShowHandler}>
            <img
              width="50"
              height="50"
              src={
                isShow
                  ? "https://img.icons8.com/ios-filled/50/delete-sign--v1.png"
                  : "https://img.icons8.com/ios-filled/50/menu--v6.png"
              }
              alt="menu--v6"
            />
          </div>
        </div>
      </div>
      {isDropdown && <BlogCategory />}
      {isShow && <Sidebar />}
    </Fragment>
  );
};

export default Header;
