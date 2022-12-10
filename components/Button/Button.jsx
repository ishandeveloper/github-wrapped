// Stylesheets
import Image from "next/image";
import styles from "./Button.module.scss";

const Button = ({
  startIcon = null,
  endIcon = null,
  label,
  onClick,
  ...props
}) => {
  return (
    <button className={styles.button} onClick={onClick} {...props}>
      {startIcon !== null && (
        <Image
          src={startIcon}
          className={styles.logo}
          alt="Button Icon"
          width={26}
          height={26}
        />
      )}

      <div className={styles.text}>{label}</div>

      {endIcon !== null && (
        <Image
          src={endIcon}
          className={styles.logo}
          alt="Button Icon"
          width={26}
          height={26}
        />
      )}
    </button>
  );
};

export default Button;
