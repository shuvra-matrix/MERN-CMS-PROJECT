import { Fragment, useState } from "react";
import styles from "./Header.module.css";
import BlogCategory from "./BlogCategory/BlogCategory";
import Sidebar from "./Sidebar/Sidebar";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [isDropdown, setDropdown] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const dropDownHandler = () => {
    setDropdown((pre) => !pre);
  };

  const menuShowHandler = () => {
    setIsShow((pre) => !pre);
    props.isSidebar(!isShow);
  };

  const logoutHandler = () => {
    props.logout();
  };

  return (
    <Fragment>
      <div className={styles["main-header"]}>
        <div className={styles["header"]}>
          <div className={styles["header-one"]}>
            <Link to="/">
              <h2 className={styles["webname"]}>
                Blog<span>Sp</span>ot
              </h2>
            </Link>

            <div className={styles["blog-nav"]}>
              <h3>Blogs</h3>
              <img
                onClick={dropDownHandler}
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
            {props.isLogin && (
              <Link to="/profile">
                <img
                  className={styles["profile"]}
                  src="https://img.icons8.com/stickers/100/name-skin-type-2.png"
                  alt="name-skin-type-2"
                />
              </Link>
            )}

            <div className={styles["search"]}>
              <input type="text" placeholder="Search...."></input>
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/search--v1.png"
                alt="search--v1"
              />
            </div>
            {!props.isLogin ? (
              <Link to="/login">
                <button className={styles["login"]} type="button">
                  Login
                </button>
              </Link>
            ) : (
              <Link to="/">
                <button
                  onClick={logoutHandler}
                  className={styles["logout"]}
                  type="button"
                >
                  Logout
                </button>
              </Link>
            )}
          </div>
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
      {isShow && (
        <Sidebar
          menuShow={menuShowHandler}
          isLogin={props.isLogin}
          logout={props.logout}
        />
      )}
    </Fragment>
  );
};

export default Header;
