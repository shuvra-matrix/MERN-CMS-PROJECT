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
import restore from "../../../../media/icons8-restore-64.png";

const apiUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3030";

const Allpost = (props) => {
  const [isEdit, setisEdit] = useState(false);
  const [postId, setPostId] = useState("");
  const [post, setPost] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
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
    setDeletePromptPostId(postId);
  };

  const closeDeletePrompt = () => {
    setDeletePromptPostId(null);
  };
  const crossHandler = (value) => {
    setIsMesssage(value);
  };

  const deleteHandler = (e) => {
    e.preventDefault();

    const post_Id = e.target[0].value;

    const url =
      props.option === "allpost"
        ? apiUrl + "/post/postdelete?page=" + currentPage
        : apiUrl + "/post/reccyclePostdelete?page=" + currentPage;
    fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        postId: post_Id,
        status: props.postStatus,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.data === "invalid token") {
          props.logout("session");
        } else if (data?.error === "yes") {
          throw new Error("delete failed");
        } else {
          setPost(data.postData);
          setTotalPage(data.totalPage);
          setIsMesssage(true);
          setMessageType("message");
          setMessage("Delete Success!");
        }
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
    const url =
      apiUrl +
      "/post/getpost?page=" +
      currentPage +
      "&type=" +
      props.option +
      "&postStatus=" +
      props.postStatus;
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.data === "invalid token") {
          props.logout("session");
        } else if (data?.error === "yes") {
          setPost([]);
          throw new Error("data fetch failed");
        } else {
          setTotalPage(data.totalPage);
          setPost(data.postData);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  useEffect(() => {
    setLoader(true);
    setisEdit(false);
    const url =
      apiUrl +
      "/post/getpost?page=" +
      currentPage +
      "&type=" +
      props.option +
      "&postStatus=" +
      props.postStatus;
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.data === "invalid token") {
          props.logout("session");
        } else if (data?.error === "yes") {
          setPost([]);
          throw new Error("data fetch failed");
        } else {
          setPost(data.postData);
          setTotalPage(data.totalPage);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, [currentPage, props]);

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

  const restoreHandler = (e) => {
    e.preventDefault();
    const post_Id = e.target[0].value;

    const url = apiUrl + "/post/restorePost";

    fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        postId: post_Id,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.data === "invalid token") {
          props.logout("session");
        } else if (data?.error === "yes") {
          throw new Error("restore failed");
        } else {
          setPost(data.postData);
          setTotalPage(data.totalPage);
          setIsMesssage(true);
          setMessageType("message");
          setMessage("Restore Success!");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsMesssage(true);
        setMessageType("error");
        setMessage("Restore failed!");
      });
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
                {props.option === "allpost" ? (
                  <Link to={`/post?title=${data?.desc}&id=${data?.postId}`}>
                    <img
                      className={styles["blog-image"]}
                      src={data.imageUrl}
                      alt="images dssd"
                    ></img>
                  </Link>
                ) : (
                  <img
                    className={styles["blog-image"]}
                    src={data.imageUrl}
                    alt="images dssd"
                  ></img>
                )}

                <p>{data.desc}</p>
                <div className={styles["action"]}>
                  <form
                    method="post"
                    onSubmit={(e) =>
                      props.option === "allpost"
                        ? editHandler(e)
                        : restoreHandler(e)
                    }
                  >
                    <input
                      type="hidden"
                      name="postId"
                      value={data.postId}
                    ></input>
                    {props.option === "allpost" && (
                      <button className={styles["edit"]} type="submit">
                        <img
                          width="20"
                          height="20"
                          src={edit}
                          alt="create-new"
                        />
                      </button>
                    )}
                    {props.option === "recyclebin" && (
                      <button className={styles["restore"]} type="submit">
                        <img
                          width="20"
                          height="20"
                          src={restore}
                          alt="create-new"
                        />
                      </button>
                    )}
                  </form>
                  {deletePromptPostId !== data.postId && (
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
                  {deletePromptPostId === data.postId && (
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

      {!isLoader && post.length === 0 && props.postStatus === "publish" && (
        <p className={styles["no-post"]}>No published posts available !</p>
      )}
      {!isLoader && post.length === 0 && props.postStatus === "draft" && (
        <p className={styles["no-post"]}>No posts are available in Draft ! </p>
      )}
      {!isLoader && post.length === 0 && props.option === "recyclebin" && (
        <p className={styles["no-post"]}>Recycle Bin is empty !</p>
      )}

      {isEdit && (
        <Editpost
          postCategory={props.postCategory}
          postId={postId}
          backBtn={backClickHandler}
          logout={props.logout}
        />
      )}
    </Fragment>
  );
};

export default Allpost;
