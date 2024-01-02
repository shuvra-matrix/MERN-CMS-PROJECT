import LoaderBig from "../../../Loader/LoaderBig";
import LoaderSmall from "../../../Loader/LoaderSmall";
import Message from "../../../Message/Message";
import styles from "./Profilesection.module.css";
import { useState, useEffect, Fragment, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const tinyApiKey = process.env.REACT_APP_TINY_API_KEY;
const apiUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3030";

const Editpost = (props) => {
  const editorRef = useRef(null);
  const [postData, setPostData] = useState({});
  const [isSmallLaoder, setSmallLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMesssage] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [isLoader, setLoader] = useState(false);
  const [inputData, setInputHandler] = useState({
    title: "",
    desc: "",
    content: "",
    category: "",
    imgSource: "",
    tag: "",
    status: "",
    image: "",
  });
  const inputHandler = (e) => {
    const { name, value } = e.target;

    setInputHandler((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const imageHandler = (e) => {
    const { name, files } = e.target;

    setInputHandler((pre) => {
      return { ...pre, [name]: files[0] };
    });
  };

  const crossHandler = (value) => {
    setIsMesssage(value);
  };

  const backClickHandler = () => {
    props.backBtn(false);
  };

  useEffect(() => {
    setLoader(true);
    const token = localStorage.getItem("token");
    const postId = props.postId;
    const url = apiUrl + "/post/getpostdata";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("post not found");
        }
        return response.json();
      })
      .then((data) => {
        setPostData(data.postData);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setIsMesssage(true);
        setMessageType("error");
        setMessage("Server Error!");
        setLoader(false);
      });
  }, [props.postId]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let content;

    if (editorRef.current) {
      content = editorRef.current.getContent();
    } else {
      throw new Error("tiny editor error");
    }

    setSmallLoader(true);
    const url = apiUrl + "/post/editpostdata";

    const fromData = new FormData();
    fromData.append("title", inputData.title || postData.title);
    fromData.append("category", inputData.category || postData.category);
    fromData.append("content", content);
    fromData.append("desc", inputData.desc || postData.desc);
    fromData.append("image", inputData.image || "oldimage");
    fromData.append("imageSource", inputData.imgSource || postData.imgSource);
    fromData.append("status", inputData.status || postData.status);
    fromData.append("tag", inputData.tag || postData.tag);
    fromData.append("postId", props.postId);
    const token = localStorage.getItem("token");

    setInputHandler({
      title: "",
      desc: "",
      content: "",
      category: "",
      imgSource: "",
      tag: "",
      status: "",
      image: "",
    });

    fetch(url, {
      method: "put",
      body: fromData,
      headers: {
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
        setPostData(data.postData);
        setSmallLoader(false);
        setIsMesssage(true);
        setMessage("Update Success!");
        setMessageType("message");
      })
      .catch((err) => {
        console.log(err);
        setSmallLoader(false);
        setIsMesssage(true);
        setMessageType("error");
        setMessage("Upload Failed.");
      });
  };

  const selectOptions = props.postCategory.map((data) => (
    <option value={data._id} key={data._id}>
      {data.name}
    </option>
  ));

  return (
    <Fragment>
      {isLoader && (
        <div className={styles["loader"]}>
          <LoaderBig />
        </div>
      )}
      {!isLoader && (
        <div className={styles["profile-main"]}>
          <img
            className={styles["back-btn"]}
            width="40"
            height="40"
            src="https://img.icons8.com/cotton/64/circled-left-2.png"
            alt="circled-left-2"
            onClick={backClickHandler}
          />
          {isSmallLaoder && (
            <div className={styles["small-loader"]}>
              <LoaderSmall />
            </div>
          )}
          {isMessage && (
            <Message
              type={messageType}
              message={message}
              cross={crossHandler}
            />
          )}
          <h3>Edit Blog</h3>
          <form action="" method="post" onSubmit={onSubmitHandler}>
            <div className={styles["profile-sub"]}>
              <div className={styles["section"]}>
                <label htmlFor="">Title</label>
                <input
                  onChange={inputHandler}
                  name="title"
                  type="text"
                  value={inputData.title || postData.title}
                ></input>
              </div>
              <div className={styles["section"]}>
                <label htmlFor="">Short Description</label>
                <input
                  onChange={inputHandler}
                  name="desc"
                  type="text"
                  value={inputData.desc || postData.desc}
                ></input>
              </div>
              <div className={styles["section"]}>
                <label htmlFor="">Content</label>
                <Editor
                  apiKey={tinyApiKey}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={postData.content}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>
              <div className={styles["section"]}>
                <label htmlFor="">Category</label>
                <select
                  value={inputData.category || postData.category}
                  onChange={inputHandler}
                  name="category"
                  required
                >
                  <option value="">Select Category</option>
                  {selectOptions}
                </select>
              </div>
              <div className={styles["section"]}>
                <label htmlFor="">Image</label>
                <div className={styles["image"]}>
                  <p className={styles["image-file-name"]}>
                    {inputData.image.name || postData.imageName}
                  </p>
                  <input
                    onChange={imageHandler}
                    name="image"
                    type="file"
                  ></input>
                  <img
                    width="64"
                    height="64"
                    src="https://img.icons8.com/pastel-glyph/64/image--v2.png"
                    alt="file"
                  />
                </div>
              </div>
              <div className={styles["section"]}>
                <label htmlFor="">Image source</label>
                <input
                  value={inputData.imgSource || postData.imgSource}
                  onChange={inputHandler}
                  name="imgSource"
                  type="text"
                ></input>
              </div>
              <div className={styles["section"]}>
                <label htmlFor="">Tag</label>
                <input
                  value={inputData.tag || postData.tag}
                  onChange={inputHandler}
                  name="tag"
                  type="text"
                ></input>
              </div>
              <div className={styles["section"]}>
                <label htmlFor="">Status</label>
                <select
                  value={inputData.status || postData.status}
                  onChange={inputHandler}
                  name="status"
                >
                  <option value="">Select Status</option>
                  <option value="publish">Publish</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            <div className={styles["button"]}>
              <button type="submit">Update Blog</button>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Editpost;
