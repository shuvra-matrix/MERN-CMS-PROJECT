import styles from "./Blog.module.css";
import Bloges from "./Bloges/Bloges";
import Featurespost from "./Featurespost/Featurespost";

const Blog = () => {
  return (
    <div className={styles["blog-main"]}>
      <Bloges />
      <Featurespost />
    </div>
  );
};

export default Blog;
