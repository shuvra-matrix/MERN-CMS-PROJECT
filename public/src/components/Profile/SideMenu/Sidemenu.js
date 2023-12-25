import { useState } from "react";
import styles from "./Sidemenu.module.css";

const Sidemenu = (propes) => {
  const [activeOption, setActiveOption] = useState("option1");

  const activeOptionHandler = (value) => {
    setActiveOption(value);
  };

  const optionsHandler = (value) => {
    propes.optionHandel(value);
  };

  return (
    <div className={styles["sidemenu-main"]}>
      <img
        className={styles["avatar"]}
        src="https://img.icons8.com/color/48/circled-user-male-skin-type-5--v1.png"
        alt="avatar"
      ></img>
      <h2 className={styles["name"]}>Shuvra Chakrabarty</h2>

      <div
        className={`${styles["options"]} ${
          activeOption === "option1" ? styles["active"] : ""
        }`}
        onClick={() => {
          activeOptionHandler("option1");
          optionsHandler("profile");
        }}
      >
        <p>Profile</p>{" "}
        <span>
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios/50/user-male-circle--v1.png"
            alt="user-male-circle--v1"
          />
        </span>
      </div>

      <div
        className={`${styles["options"]} ${
          activeOption === "option2" ? styles["active"] : ""
        }`}
        onClick={() => {
          activeOptionHandler("option2");
          optionsHandler("security");
        }}
      >
        <p>Security</p>{" "}
        <span>
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios/50/password--v1.png"
            alt="password--v1"
          />
        </span>
      </div>
      <div
        className={`${styles["options"]} ${
          activeOption === "option3" ? styles["active"] : ""
        }`}
        onClick={() => {
          activeOptionHandler("option3");
          optionsHandler("writepost");
        }}
      >
        <p>Write Post</p>{" "}
        <span>
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios/50/edit-row.png"
            alt="edit-row"
          />
        </span>
      </div>
      <div
        className={`${styles["options"]} ${
          activeOption === "option4" ? styles["active"] : ""
        }`}
        onClick={() => {
          activeOptionHandler("option4");
          optionsHandler("allpost");
        }}
      >
        <p>Posts</p>{" "}
        <span>
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios/50/blog.png"
            alt="blog"
          />
        </span>
      </div>
    </div>
  );
};

export default Sidemenu;
