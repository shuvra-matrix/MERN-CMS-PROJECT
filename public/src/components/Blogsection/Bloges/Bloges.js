import styles from "./Bloges.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Bloges = () => {
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
    <div className={styles["blog-mian"]}>
      {posts.map((post) => (
        <Link
          to={`/post?title=${post.title}&id=${post.postId}`}
          key={post.postId}
        >
          <div className={styles["bloges"]}>
            <img src={post.image} alt="imges sd"></img>

            <h1 className={styles["title"]}>{post.title}</h1>
            <p className={styles["desc"]}>{post.desc.slice(0, 250)}</p>
            <p className={styles["name"]}>
              {post.user.name} <span>{post.date}</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Bloges;
