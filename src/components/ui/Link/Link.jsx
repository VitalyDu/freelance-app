import { Link } from "react-router-dom";
import styles from "./Link.module.css";

export const LinkComponent = ({ to, children }) => {
  return (
    <Link to={to} className={styles.link}>
      {children}
    </Link>
  );
};
