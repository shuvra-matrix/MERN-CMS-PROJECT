import styles from "./Message.module.css";
import cross from "../../media/cross.png";

const Message = (props) => {
  const onCrossClick = () => {
    props.cross(false);
  };

  return (
    <div
      className={props.type === "message" ? styles["message"] : styles["error"]}
    >
      <div onClick={onCrossClick} className={styles["cross"]}>
        <img src={cross} alt="cross"></img>
      </div>
      <p>{props.message}</p>
    </div>
  );
};

export default Message;
