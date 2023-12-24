import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <div className={styles["sub-footer"]}>
        <p className={styles["webname"]}>BlogSpot</p>
        <p className={styles["copyright"]}>
          Copyright &copy; 2023 Shuvra Chakrabarty
        </p>
      </div>
    </div>
  );
};

export default Footer;
