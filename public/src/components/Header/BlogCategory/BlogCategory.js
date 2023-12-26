import { Link } from "react-router-dom";
import styles from "./BlogCategory.module.css";

const BlogCategory = (props) => {
  const category = props.postCategory.map((data) => (
    <Link to={`/category?catId=${data._id}`} key={data._id}>
      <div className={styles["sub-category"]}>
        <img width="48" height="48" src={data.icon} alt="motherboard" />
        <div className={styles["titles"]}>
          <h2>{data.name}</h2>
          <p>{data.desc}</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <div className={styles["category-main"]}>
      <div className={styles["category-sub"]}>
        <h2>Bloges</h2>
        <div className={styles["category"]}>{category}</div>
      </div>
    </div>
  );
};

export default BlogCategory;
