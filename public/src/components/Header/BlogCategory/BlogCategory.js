import styles from "./BlogCategory.module.css";

const BlogCategory = () => {
  return (
    <div className={styles["category-main"]}>
      <div className={styles["category-sub"]}>
        <h2>Bloges</h2>
        <div className={styles["category"]}>
          <div className={styles["sub-category"]}>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/motherboard.png"
              alt="motherboard"
            />
            <div className={styles["titles"]}>
              <h2>Technology</h2>
              <p>
                Stay on the cutting edge with the latest in tech trends,
                gadgets, and innovations.
              </p>
            </div>
          </div>
          <div className={styles["sub-category"]}>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/motherboard.png"
              alt="motherboard"
            />
            <div className={styles["titles"]}>
              <h2>Technology</h2>
              <p>
                Stay on the cutting edge with the latest in tech trends,
                gadgets, and innovations.
              </p>
            </div>
          </div>
          <div className={styles["sub-category"]}>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/motherboard.png"
              alt="motherboard"
            />
            <div className={styles["titles"]}>
              <h2>Technology</h2>
              <p>
                Stay on the cutting edge with the latest in tech trends,
                gadgets, and innovations.
              </p>
            </div>
          </div>
          <div className={styles["sub-category"]}>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/motherboard.png"
              alt="motherboard"
            />
            <div className={styles["titles"]}>
              <h2>Technology</h2>
              <p>
                Stay on the cutting edge with the latest in tech trends,
                gadgets, and innovations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCategory;
