import styles from "./Profilesection.module.css";
import { useState, useEffect } from "react";

const Editpost = (props) => {
  const [postData, setPostData] = useState({});
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

  const backClickHandler = () => {
    props.backBtn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const postId = props.postId;
    const url = "http://localhost:3030/post/getpostdata";
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectOptions = props.postCategory.map((data) => (
    <option value={data._id} key={data._id}>
      {data.name}
    </option>
  ));

  return (
    <div className={styles["profile-main"]}>
      <img
        className={styles["back-btn"]}
        width="40"
        height="40"
        src="https://img.icons8.com/cotton/64/circled-left-2.png"
        alt="circled-left-2"
        onClick={backClickHandler}
      />
      <h3>Edit Blog</h3>
      <form action="" method="post">
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
            <textarea
              value={inputData.content || postData.content}
              onChange={inputHandler}
              name="content"
            >
              {inputData.content || postData.content}
            </textarea>
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
              <input onChange={imageHandler} name="image" type="file"></input>
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
  );
};

export default Editpost;
