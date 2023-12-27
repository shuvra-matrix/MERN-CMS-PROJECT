import { Link } from "react-router-dom";
import styles from "./Featurespost.module.css";
import { useEffect, useState } from "react";

const Featurespost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3030/public/getpost";

    fetch(url, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          const error = new Error("server error");
          throw error;
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(posts);

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
    </div>
  );
};

export default Featurespost;
