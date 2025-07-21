import styles from "./Button.module.css";
import { Link } from "react-router-dom";

function Button({ type = "button", onClick, children, variant = "primary", to }) {
  const className = `${styles.button} ${styles[variant]}`;

    if (to) {
     return (
            <Link to={to} className={className}>
                {children}
            </Link>
      );
    }
    
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;