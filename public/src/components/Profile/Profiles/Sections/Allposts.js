import styles from "./Allposts.module.css";
import one from "../../../../media/one.png";
import { Fragment, useState } from "react";
import Editpost from "./Editpost";

const Allpost = () => {
  const [isEdit, setisEdit] = useState(false);
  const [postId, setPostId] = useState(null);

  const editHandler = (e) => {
    e.preventDefault();
    setisEdit((pre) => !pre);
    const postId = e.target[0].value;
    setPostId(postId);
  };

  const backClickHandler = (value) => {
    setisEdit(value);
  };

  return (
    <Fragment>
      {!isEdit && (
        <div className={styles["allpost-main"]}>
          <div className={styles["allpost-sub"]}>
            <img
              className={styles["blog-image"]}
              src={one}
              alt="images dssd"
            ></img>
            <p>this is is post jksks kjskkksjjs ks.....</p>
            <div className={styles["action"]}>
              <form method="post" onSubmit={(e) => editHandler(e)}>
                <input type="hidden" value="dsadad"></input>
                <button className={styles["edit"]} type="submit">
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/ios/50/create-new.png"
                    alt="create-new"
                  />
                </button>
              </form>
              <form method="post">
                <input type="hidden" value="edit"></input>
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
          <div className={styles["allpost-sub"]}>
            <img
              className={styles["blog-image"]}
              src={one}
              alt="images dssd"
            ></img>
            <p>this is is post jksks kjskkksjjs ks.....</p>
            <div className={styles["action"]}>
              <form method="post" onSubmit={(e) => editHandler(e)}>
                <input type="hidden" value="dsadad"></input>
                <button className={styles["edit"]} type="submit">
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/ios/50/create-new.png"
                    alt="create-new"
                  />
                </button>
              </form>
              <form method="post">
                <input type="hidden" value="edit"></input>
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
          <div className={styles["allpost-sub"]}>
            <img
              className={styles["blog-image"]}
              src={one}
              alt="images dssd"
            ></img>
            <p>this is is post jksks kjskkksjjs ks.....</p>
            <div className={styles["action"]}>
              <form method="post" onSubmit={(e) => editHandler(e)}>
                <input type="hidden" value="dsadad"></input>
                <button className={styles["edit"]} type="submit">
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/ios/50/create-new.png"
                    alt="create-new"
                  />
                </button>
              </form>
              <form method="post">
                <input type="hidden" value="edit"></input>
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
          <div className={styles["allpost-sub"]}>
            <img
              className={styles["blog-image"]}
              src={one}
              alt="images dssd"
            ></img>
            <p>this is is post jksks kjskkksjjs ks.....</p>
            <div className={styles["action"]}>
              <form method="post" onSubmit={(e) => editHandler(e)}>
                <input type="hidden" value="dsadad"></input>
                <button className={styles["edit"]} type="submit">
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/ios/50/create-new.png"
                    alt="create-new"
                  />
                </button>
              </form>
              <form method="post">
                <input type="hidden" value="edit"></input>
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
        </div>
      )}

      {isEdit && <Editpost postId={postId} backBtn={backClickHandler} />}
    </Fragment>
  );
};

export default Allpost;
