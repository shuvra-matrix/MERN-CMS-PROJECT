import styles from "./Blog.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import arrow from "../../media/icons8-right-64.png";

const Blog = () => {
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
        setPosts(data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={styles["blog-main"]}>
      <div className={styles["wide-post"]}>
        <div className={styles["img"]}>
          <Link to={`/post?title=${posts[0]?.title}&id=${posts[0]?.postId}`}>
            <img
              className={styles["img-img"]}
              src={posts[0]?.image}
              alt="post img"
            ></img>
            <div className={styles["arrow-main"]}>
              <img className={styles["arrow"]} src={arrow} alt="arrow"></img>
            </div>
          </Link>
        </div>

        <div className={styles["wide-text-section"]}>
          <p className={styles["cat-name"]}>
            {posts[0]?.category.name.split(" ")[0]}
          </p>
          <h2 className={styles["titie"]}>{posts[0]?.title}</h2>
          <p className={styles["desc"]}>{posts[0]?.desc}</p>
          <div className={styles["name-date"]}>
            <p className={styles["name"]}>{posts[0]?.user.name}</p>
            <p className={styles["date"]}>{posts[0]?.date}</p>
          </div>
        </div>
      </div>

      <div className={styles["small-post"]}>
        {posts.map((data) => (
          <div className={styles["posts"]}>
            <Link to={`/post?title=${data?.title}&id=${data?.postId}`}>
              <img
                className={styles["small-img"]}
                src={data?.image}
                alt="img"
              ></img>
              <div className={styles["arrow-main-snd"]}>
                <img
                  className={styles["arrow-snd"]}
                  src={arrow}
                  alt="arrow"
                ></img>
              </div>
            </Link>
            <p className={styles["cat"]}>{data?.category.name.split(" ")[0]}</p>
            <h3 className={styles["title-two"]}>{data?.title}</h3>
            <p className={styles["desc-two"]}>{data?.desc}</p>
            <div
              className={`${styles["name-date"]} ${styles["name-date-snd"]}`}
            >
              <p className={styles["name"]}>{data?.user.name}</p>
              <p className={styles["date"]}>{data?.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
