import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles["category-main"]}>
      <div className={styles["profile"]}>
        <p>Shuvra Chakrabarty</p>
        <a href="/">
          <img
            width="60"
            height="60"
            src="https://img.icons8.com/papercut/60/user-female-circle.png"
            alt="user-female-circle"
          />
        </a>
      </div>
      <div className={styles["search"]}>
        <input type="text"></input>
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/ios/50/search--v1.png"
          alt="search--v1"
        />
      </div>
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
      <div className={styles["auth"]}>
        <a href="/">
          <button className={styles["login"]} type="button">
            Login
          </button>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
