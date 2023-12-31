import LoaderBig from "../Loader/LoaderBig";
import styles from "./Singlepost.module.css";

import { Fragment, useEffect, useState } from "react";
import DOMPurify from "dompurify";

const Singlepost = () => {
  const [postsData, setPostData] = useState({
    post: { post: { user: {} } },
    createDate: "",
    updateDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    let title = params.get("title");
    let id = params.get("id");
    console.log(title, id);
    const url = "http://localhost:3030/public/getsinglepost";
    if (title && id) {
      fetch(url, {
        method: "post",
        body: JSON.stringify({
          title: title,
          postId: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("no post available");
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            setPostData(data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, []);

  const sanitizedContent = DOMPurify.sanitize(postsData.post.post.content);

  return (
    <Fragment>
      {isLoading && (
        <div className={styles["loader"]}>
          <LoaderBig />
        </div>
      )}
      {!isLoading && (
        <div className={styles["post-main"]}>
          <div className={styles["post-sub"]}>
            <div className={styles["title-section"]}>
              <div className={styles["title"]}>
                <h1>{postsData.post.post.title}</h1>
                <p className={styles["desc"]}>{postsData.post.post.desc}</p>
                <p className={styles["name"]}>
                  Written by: <span> {postsData.post.post.user.name}</span>
                </p>
                <div className={styles["date"]}>
                  <p>Published: {postsData.post.createDate}</p>
                  {postsData.post.updateDate && (
                    <p>Updated: {postsData.post.updateDate}</p>
                  )}
                  <div className={styles["views"]}>
                    <img
                      width="20"
                      height="20"
                      src="https://img.icons8.com/ios/50/visible--v1.png"
                      alt="visible--v1"
                    />
                    <p> {postsData.post.post.views}</p>
                  </div>
                </div>
              </div>
              <div className={styles["image-section"]}>
                <img
                  width="500px"
                  height="400px"
                  src={postsData.post.post.image}
                  alt={postsData.post.post.imageName}
                ></img>
                <p>{postsData.post.post.imgSource}</p>
              </div>
            </div>
          </div>
          <div
            className={styles["text-section"]}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></div>
        </div>
      )}
    </Fragment>
  );
};

export default Singlepost;
