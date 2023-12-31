import styles from "./Allposts.module.css";
import { Fragment, useEffect, useState } from "react";
import Editpost from "./Editpost";
import LoaderBig from "../../../Loader/LoaderBig";
import back from "../../../../media/icons8-back-64.png";
import froward from "../../../../media/icons8-forward-64.png";

const Allpost = (props) => {
  const [isEdit, setisEdit] = useState(false);
  const [postId, setPostId] = useState("");
  const [post, setPost] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const editHandler = (e) => {
    e.preventDefault();
    setisEdit((pre) => !pre);
    const post_Id = e.target[0].value;
    setPostId(post_Id);
  };

  const deleteHandler = (e) => {
    console.log(e);
    e.preventDefault();
    const post_Id = e.target[0].value;
    const token = localStorage.getItem("token");
    const url = "http://localhost:3030/post/postdelete";

    fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        postId: post_Id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("server error");
        }

        return response.json();
      })
      .then((data) => {
        setPost(data.postData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const backClickHandler = (value) => {
    setisEdit(value);
    setLoader(true);
    const token = localStorage.getItem("token");
    const url = "http://localhost:3030/post/getpost";
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("post not found");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data.postData);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  useEffect(() => {
    setLoader(true);
    const token = localStorage.getItem("token");
    const url = "http://localhost:3030/post/getpost?page=" + currentPage;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("post not found");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data.postData);
        setTotalPage(data.totalPage);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, [currentPage]);

  const nextButtonHandler = () => {
    if (currentPage < totalPage) {
      setCurrentPage((pre) => pre + 1);
    }
  };
  const preBuutonHandler = () => {
    if (currentPage > 1) {
      setCurrentPage((pre) => pre - 1);
    }
  };

  return (
    <Fragment>
      {isLoader && (
        <div className={styles["loader"]}>
          <LoaderBig />
        </div>
      )}
      {!isLoader && !isEdit && (
        <Fragment>
          <div className={styles["allpost-main"]}>
            {post.map((data) => (
              <div className={styles["allpost-sub"]} key={data.postId}>
                <img
                  className={styles["blog-image"]}
                  src={data.imageUrl}
                  alt="images dssd"
                ></img>
                <p>{data.desc}</p>
                <div className={styles["action"]}>
                  <form method="post" onSubmit={(e) => editHandler(e)}>
                    <input
                      type="hidden"
                      name="postId"
                      value={data.postId}
                    ></input>
                    <button className={styles["edit"]} type="submit">
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/ios/50/create-new.png"
                        alt="create-new"
                      />
                    </button>
                  </form>
                  <form method="post" onSubmit={deleteHandler}>
                    <input
                      type="hidden"
                      name="postId"
                      value={data.postId}
                    ></input>
                    <button className={styles["delete"]} type="submit">
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/ios-glyphs/60/filled-trash.png"
                        alt="filled-trash"
                      />
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
          <div className={styles["pagination"]}>
            {currentPage > 1 ? (
              <button onClick={preBuutonHandler} type="button">
                <img src={back} alt="back-btn"></img>
              </button>
            ) : (
              <button onClick={preBuutonHandler} type="button" disabled>
                <img src={back} alt="back-btn"></img>
              </button>
            )}
            {currentPage < totalPage ? (
              <button onClick={nextButtonHandler} type="button">
                <img src={froward} alt="froward-btn"></img>
              </button>
            ) : (
              <button onClick={nextButtonHandler} type="button" disabled>
                <img src={froward} alt="froward-btn"></img>
              </button>
            )}
          </div>
        </Fragment>
      )}

      {isEdit && (
        <Editpost
          postCategory={props.postCategory}
          postId={postId}
          backBtn={backClickHandler}
        />
      )}
    </Fragment>
  );
};

export default Allpost;
