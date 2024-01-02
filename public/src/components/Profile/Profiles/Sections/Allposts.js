import styles from "./Allposts.module.css";
import { Fragment, useEffect, useState } from "react";
import Editpost from "./Editpost";
import LoaderBig from "../../../Loader/LoaderBig";
import back from "../../../../media/icons8-back-64.png";
import froward from "../../../../media/icons8-forward-64.png";
import edit from "../../../../media/icons8-edit-48.png";
import deletes from "../../../../media/icons8-delete-50.png";
import ok from "../../../../media/icons8-right-ok.png";
import cross from "../../../../media/icons8-cross-64.png";
import { Link } from "react-router-dom";
import Message from "../../../Message/Message";

const apiUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3030";

const Allpost = (props) => {
  const [isEdit, setisEdit] = useState(false);
  const [postId, setPostId] = useState("");
  const [post, setPost] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isDeletePrompt, setDeletePrompt] = useState(false);
  const [deletePromptPostId, setDeletePromptPostId] = useState(null);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMesssage] = useState(false);
  const [messageType, setMessageType] = useState("");

  const editHandler = (e) => {
    e.preventDefault();
    setisEdit((pre) => !pre);
    const post_Id = e.target[0].value;
    setPostId(post_Id);
  };

  const deletePromptHandler = (postId) => {
    setDeletePrompt(true);
    setDeletePromptPostId(postId);
  };

  const closeDeletePrompt = () => {
    setDeletePrompt(false);
    setDeletePromptPostId(null);
  };
  const crossHandler = (value) => {
    setIsMesssage(value);
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    setDeletePrompt(false);
    const post_Id = e.target[0].value;
    const token = localStorage.getItem("token");
    const url = apiUrl + "/post/postdelete?page=" + currentPage;

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
        setCurrentPage(1);
        setIsMesssage(true);
        setMessageType("message");
        setMessage("Delete Success!");
      })
      .catch((err) => {
        console.log(err);
        setIsMesssage(true);
        setMessageType("error");
        setMessage("Delete failed!");
      });
  };

  const backClickHandler = (value) => {
    setisEdit(value);
    setLoader(true);
    const token = localStorage.getItem("token");
    const url = apiUrl + "/post/getpost?page=" + currentPage;
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
    const url = apiUrl + "/post/getpost?page=" + currentPage;
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

      {!isLoader && !isEdit && post.length > 0 && (
        <Fragment>
          {isMessage && (
            <div className={styles["message"]}>
              <Message
                type={messageType}
                message={message}
                cross={crossHandler}
              />
            </div>
          )}
          <div className={styles["allpost-main"]}>
            {post.map((data) => (
              <div className={styles["allpost-sub"]} key={data.postId}>
                <Link to={`/post?title=${data?.title}&id=${data?.postId}`}>
                  <img
                    className={styles["blog-image"]}
                    src={data.imageUrl}
                    alt="images dssd"
                  ></img>
                </Link>
                <p>{data.desc}</p>
                <div className={styles["action"]}>
                  <form method="post" onSubmit={(e) => editHandler(e)}>
                    <input
                      type="hidden"
                      name="postId"
                      value={data.postId}
                    ></input>
                    <button className={styles["edit"]} type="submit">
                      <img width="20" height="20" src={edit} alt="create-new" />
                    </button>
                  </form>
                  {!isDeletePrompt && (
                    <form
                      method="post"
                      onSubmit={() => deletePromptHandler(data.postId)}
                    >
                      <button className={styles["delete"]} type="submit">
                        <img
                          width="20"
                          height="20"
                          src={deletes}
                          alt="filled-trash"
                        />
                      </button>
                    </form>
                  )}
                  {isDeletePrompt && deletePromptPostId === data.postId && (
                    <div className={styles["delete-prompt"]}>
                      <p className={styles["prompt-delete-message"]}>Sure?</p>
                      <form method="post" onSubmit={deleteHandler}>
                        <input
                          type="hidden"
                          name="postId"
                          value={data.postId}
                        ></input>
                        <button className={styles["delete-ok"]} type="submit">
                          <img
                            width="20"
                            height="20"
                            src={ok}
                            alt="filled-trash"
                          />
                        </button>
                      </form>
                      <button
                        className={styles["delete-cancel"]}
                        onClick={closeDeletePrompt}
                        type="submit"
                      >
                        <img
                          width="20"
                          height="20"
                          src={cross}
                          alt="filled-trash"
                        />
                      </button>
                    </div>
                  )}
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

      {post.length === 0 && (
        <p className={styles["no-post"]}>No posts available !</p>
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
