import styles from "./PostCategory.module.css";
import React, { useEffect, useRef, useState } from "react";
import back from "../../media/icons8-back-64.png";
import frow from "../../media/icons8-forward-64.png";

const PostCategory = (propes) => {
  const catMainRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const backRef = useRef(null);
  const forwardRef = useRef(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
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
      <div
        className={styles["back"]}
        onClick={() => scrollCategories("backward")}
        ref={backRef}
      >
        <img width="40" height="40" src={back} alt="back" />
      </div>
      <div className={styles["cat-main"]} ref={catMainRef}>
        <div
          className={`${styles["category"]} ${
            activeCategory === "All" ? styles.active : ""
          }`}
          onClick={() => handleCategoryClick("All")}
        >
          <p>All</p>
        </div>
        {propes.postCategory.map((data) => (
          <div
            key={data.name}
            className={`${styles["category"]} ${
              activeCategory === data.name ? styles.active : ""
            }`}
            onClick={() => handleCategoryClick(data.name)}
          >
            <p>{data.name}</p>
          </div>
        ))}
      </div>
      <div
        className={styles["forward"]}
        onClick={() => scrollCategories("forward")}
        ref={forwardRef}
      >
        <img width="40" height="40" src={frow} alt="forward--v1" />
      </div>
    </div>
  );
};

export default PostCategory;
