import { Link } from "react-router-dom";
import styles from "./Featurespost.module.css";
import { useEffect, useState } from "react";

const Featurespost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3030/public/getfeaturespost";

    fetch(url, { method: "GET" })
      .then((response) => {
        console.log(response);
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

  console.log(posts);

  return (
    <div className={styles["featues-main"]}>
      <p className={styles["title"]}>Featured Posts</p>
      {posts.map((post) => (
        <Link
          to={`/post?title=${post.title}&id=${post.postId}`}
          key={post.postId}
        >
          <div className={styles["posts"]}>
            <p className={styles["topic-name"]}>{post.title}</p>
            <div className={styles["namesection"]}>
              <p> {post.user.name}</p>
              <p>{post.date}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Featurespost;
