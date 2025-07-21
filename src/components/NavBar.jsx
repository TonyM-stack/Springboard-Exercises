import { NavLink } from "react-router-dom";    
import styles from "./NavBar.module.css";          

// Navigation bar component
function NavBar() {
    return (
        <nav className={styles.navBar}>
            <NavLink to="/" 
            end
            className={({ isActive }) => 
                // console.log("Home link isActive:", isActive); // Debug log
              `${styles.link} ${styles.navButton}${isActive ? ` ${styles.active}`: ""}`
          }
              >
                Home
                </NavLink>

            <NavLink
              to="/spacecrafts"
              className={({ isActive }) =>
                  `${styles.link} ${styles.navButton} ${isActive ? `${styles.active}` : ""}`
       }
         >
             Spacecrafts
         </NavLink>

         <NavLink
            to="/planets"
            className={({ isActive }) =>
                `${styles.link} ${styles.navButton} ${isActive ? `${styles.active}` : ""}`
        }
       >
        Planets
        </NavLink>

        </nav>
    );
    }

    export default NavBar;