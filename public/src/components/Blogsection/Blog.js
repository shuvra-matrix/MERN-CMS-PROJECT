import styles from "./Blog.module.css";
import { Link } from "react-router-dom";
import arrow from "../../media/icons8-right-64.png";
import { Fragment } from "react";
import Pagination from "../Pagination/Pagination";
import LoaderThree from "../Loader/LoaderThree";

const Blog = (props) => {
  let posts = props.posts;

  const isHomeHandler = () => {
    props.homePageHandler(false);
  };

  return (
    <Fragment>
      {!props.isLoader && posts.length > 0 && (
        <Fragment>
          <div className={styles["blog-main"]} key="7848hs8">
            <div className={styles["wide-post"]} onClick={isHomeHandler}>
              <div className={styles["img"]}>
                <Link
                  to={`/post?title=${posts[0]?.title}&id=${posts[0]?.postId}`}
                >
                  <img
                    className={styles["img-img"]}
                    src={posts[0]?.image}
                    alt="post img"
                  ></img>
                  <div className={styles["arrow-main"]}>
                    <img
                      className={styles["arrow"]}
                      src={arrow}
                      alt="arrow"
                    ></img>
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
              {posts.slice(1, posts.length).map((data) => (
                <div
                  className={styles["posts"]}
                  key={data?.postId}
                  onClick={isHomeHandler}
                >
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
                  <p className={styles["cat"]}>
                    {data?.category.name.split(" ")[0]}
                  </p>
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
          <Pagination
            pages={props.pages}
            currentPageHandler={props.currentPageHandler}
          />
        </Fragment>
      )}
      {!props.isLoader && posts.length < 1 && (
        <div className={styles["no-post"]}>
          <p>
            Sorry, no post available at the moment. Stay tuned for updates and
            exciting content soon!
          </p>
        </div>
      )}
      {props.isLoader && (
        <div className={styles["loader"]}>
          <LoaderThree />
        </div>
      )}
    </Fragment>
  );
};

export default Blog;
