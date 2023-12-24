import { Link } from "react-router-dom";
import styles from "./Featurespost.module.css";

const Featurespost = () => {
  return (
    <div className={styles["featues-main"]}>
      <p className={styles["title"]}>Featured Posts</p>
      <Link to="/post">
        <div className={styles["posts"]}>
          <p className={styles["topic-name"]}>
            The Top Types of AI-Generated Content in Marketing [New Data,
            Examples & Tips]
          </p>
          <div className={styles["namesection"]}>
            <p>Shuvra Chakrabarty</p>
            <p>11/7/23</p>
          </div>
        </div>
      </Link>
      <a href="/">
        <div className={styles["posts"]}>
          <p className={styles["topic-name"]}>
            The Top Types of AI-Generated Content in Marketing [New Data,
            Examples & Tips]
          </p>
          <div className={styles["namesection"]}>
            <p>Shuvra Chakrabarty</p>
            <p>11/7/23</p>
          </div>
        </div>
      </a>
      <a href="/">
        <div className={styles["posts"]}>
          <p className={styles["topic-name"]}>
            The Top Types of AI-Generated Content in Marketing [New Data,
            Examples & Tips]
          </p>
          <div className={styles["namesection"]}>
            <p>Shuvra Chakrabarty</p>
            <p>11/7/23</p>
          </div>
        </div>
      </a>
      <a href="/">
        <div className={styles["posts"]}>
          <p className={styles["topic-name"]}>
            The Top Types of AI-Generated Content in Marketing [New Data,
            Examples & Tips]
          </p>
          <div className={styles["namesection"]}>
            <p>Shuvra Chakrabarty</p>
            <p>11/7/23</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Featurespost;
