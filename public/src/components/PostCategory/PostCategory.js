import styles from "./PostCategory.module.css";
import React, { useRef, useState } from "react";
import back from "../../media/icons8-back-64.png";
import frow from "../../media/icons8-forward-64.png";

const PostCategory = (propes) => {
  const catMainRef = useRef(null);
  const activeCat = localStorage.getItem("activeCat") || "All";
  const [activeCategory, setActiveCategory] = useState(activeCat);
  const backRef = useRef(null);
  const forwardRef = useRef(null);

  const handleCategoryClick = (category, catId) => {
    setActiveCategory(category);
    localStorage.setItem("activeCat", category);
    propes.categoryHandler(catId);
    const categoryIndex = propes.postCategory.findIndex(
      (data) => data.name === category
    );
    const categoryWidth =
      catMainRef.current.scrollWidth / propes.postCategory.length;

    const scrollPosition = categoryIndex * categoryWidth - 60;
    catMainRef.current.scrollLeft = scrollPosition;
  };

  const scrollCategories = (direction) => {
    const scrollAmount = 150;
    const catMain = catMainRef.current;

    if (catMain) {
      if (direction === "forward") {
        catMain.scrollLeft += scrollAmount;
      } else if (direction === "backward") {
        catMain.scrollLeft -= scrollAmount;
      }
    }
  };

  return (
    <div className={styles["div-main"]}>
      <div onClick={() => scrollCategories("backward")} ref={backRef}>
        <button className={styles["back"]} type="button">
          <img width="40" height="40" src={back} alt="back" />
        </button>
      </div>
      <div className={styles["cat-main"]} ref={catMainRef}>
        <div
          className={`${styles["category"]} ${
            activeCategory === "All" ? styles.active : ""
          }`}
          onClick={() => handleCategoryClick("All", "All")}
        >
          <button className={styles["cat-btn"]} type="button">
            All
          </button>
        </div>
        {propes.postCategory.map((data) => (
          <div
            key={data.name}
            className={`${styles["category"]} ${
              activeCategory === data.name ? styles.active : ""
            }`}
            onClick={() => handleCategoryClick(data.name, data._id)}
          >
            <button className={styles["cat-btn"]} type="button">
              {data.name}
            </button>
          </div>
        ))}
      </div>
      <div onClick={() => scrollCategories("forward")} ref={forwardRef}>
        <button type="button" className={styles["forward"]}>
          <img width="40" height="40" src={frow} alt="forward--v1" />
        </button>
      </div>
    </div>
  );
};

export default PostCategory;
