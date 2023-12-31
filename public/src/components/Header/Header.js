import { Fragment, useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [isActive, setIsActive] = useState("blog");

  const logoutHandler = () => {
    props.logout();
  };

  const homePageHandler = (value) => {
    props.homePageHandler(value);
  };

  return (
    <Fragment>
      <div className={styles["main-header"]}>
        <div className={styles["logo"]}>
          <Link to="/">
            <h1
              onClick={() => {
                setIsActive("blog");
                homePageHandler(true);
              }}
            >
              Blog<span>Sp</span>ot
            </h1>
          </Link>
        </div>
        <div className={styles["navlink"]}>
          <Link to="/">
            <p
              onClick={() => {
                setIsActive("blog");
                homePageHandler(true);
              }}
              className={isActive === "blog" ? styles["active"] : ""}
            >
              Blog
            </p>
          </Link>
          {props.isLogin && (
            <Link to="/profile">
              <p
                onClick={() => {
                  setIsActive("profile");
                  homePageHandler(false);
                }}
                className={isActive === "profile" ? styles["active"] : ""}
              >
                Profile
              </p>
            </Link>
          )}
          <Link href="">
            <p
              onClick={() => {
                setIsActive("aboutus");
              }}
              className={isActive === "aboutus" ? styles["active"] : ""}
            >
              About us
            </p>
          </Link>
        </div>
        <div className={styles["auth-btn"]}>
          {!props.isLogin ? (
            <Link to="login">
              <button className={styles["login-btn"]}>Login</button>
            </Link>
          ) : (
            <button onClick={logoutHandler} className={styles["logout-btn"]}>
              Logout
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
