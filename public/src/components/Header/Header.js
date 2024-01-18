import { Fragment, useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import blogLogo from "../../media/bloglogo.png";
import { useLocation } from "react-router-dom";
import Message from "../Message/Message";

const Header = (props) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState("blog");

  useEffect(() => {
    location.pathname === "/profile"
      ? setIsActive("profile")
      : setIsActive("blog");
  }, [location]);

  const logoutHandler = () => {
    props.logout();
    setIsActive("blog");
  };

  return (
    <Fragment>
      <div className={styles["main-header"]}>
        {props.isMessage && (
          <div className={styles["session-message"]}>
            <Message
              type="error"
              message={props.message}
              cross={props.crossHandler}
            />
          </div>
        )}
        <div className={styles["logo"]}>
          <Link to="/">
            <img src={blogLogo} alt="logo"></img>
          </Link>
          <Link to="/">
            <h1>
              Blog<span>Sp</span>ot
            </h1>
          </Link>
        </div>
        <div className={styles["navlink"]}>
          <Link to="/">
            <p
              onClick={() => {
                setIsActive("blog");
                localStorage.setItem("headerActive", "blog");
              }}
              className={isActive === "blog" ? styles["active"] : ""}
            >
              Blog
            </p>
          </Link>
          {props.isLogin && (
            <Link to="/profile">
              <p className={isActive === "profile" ? styles["active"] : ""}>
                Profile
              </p>
            </Link>
          )}
          <a href="https://github.com/shuvra-matrix" target="_block">
            <p>About us</p>
          </a>
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
