import styles from "./Profilesection.module.css";
import { useState } from "react";

const WritePostSection = (props) => {
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

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const url = "http://localhost:3030/post/addpost";

    const fromData = new FormData();
    fromData.append("title", inputData.title);
    fromData.append("category", inputData.category);
    fromData.append("content", inputData.content);
    fromData.append("desc", inputData.desc);
    fromData.append("image", inputData.image);
    fromData.append("imageSource", inputData.imgSource);
    fromData.append("status", inputData.status);
    fromData.append("tag", inputData.tag);
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
      method: "POST",
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
        console.data(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectOptions = props.postCategory.map((data) => (
    <option value={data._id} key={data._id}>
      {data.name}
    </option>
  ));

  return (
    <div className={styles["profile-main"]}>
      <h3>Write New Blog</h3>
      <form action="" method="post" onSubmit={onSubmitHandler}>
        <div className={styles["profile-sub"]}>
          <div className={styles["section"]}>
            <label htmlFor="">Title</label>
            <input
              onChange={inputHandler}
              name="title"
              type="text"
              placeholder="Blog Title"
              value={inputData.title}
            ></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Short Description</label>
            <input
              onChange={inputHandler}
              name="desc"
              type="text"
              value={inputData.desc}
            ></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Content</label>
            <textarea
              value={inputData.content}
              onChange={inputHandler}
              name="content"
            >
              {inputData.content}
            </textarea>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Category</label>
            <select
              value={inputData.category}
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
                {inputData.image.name || "Select Image File"}
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
              value={inputData.imgSource}
              onChange={inputHandler}
              name="imgSource"
              type="text"
            ></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Tag</label>
            <input
              value={inputData.tag}
              onChange={inputHandler}
              name="tag"
              type="text"
            ></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Status</label>
            <select
              value={inputData.status}
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
          <button type="submit">Post Blog</button>
        </div>
      </form>
    </div>
  );
};

export default WritePostSection;
