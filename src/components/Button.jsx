import styles from "./Button.module.css";
import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

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

Button.propTypes = {
  /** If provided, renders an <a> instead of <button> */
  to: PropTypes.string,
  /** click handler (ignored if `to` is set) */
  onClick: PropTypes.func,
  /** native button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** styling variant key */
  variant: PropTypes.string,
  /** disabled flag */
  disabled: PropTypes.bool,
  /** button contents */
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  to: null,
  onClick: null,
  type: 'button',
  variant: 'default',
  disabled: false,
};

export default Button;