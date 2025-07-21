
import styles from "./SpacecraftsPage.module.css";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import SpacecraftCard from "../pages/SpacecraftCard";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { useSpacecrafts } from "../context/SpacecraftContext";


export default function SpacecraftsPage() {
    const { 
      spacecrafts,
       setSpacecrafts,
        loading,
         error,
         destroySpacecraft,
         clearError
         } = useSpacecrafts(); // Using the context to access spacecrafts

         useEffect(() => {
          clearError();
         }, []);
    
    console.log("SpacecraftsPage rendering with spacecrafts:", spacecrafts); // Debug log
    // const [spacecraftsList, setSpacecraftsList] = useState([]); // State to hold the list of spacecrafts

     console.log("loading status:", loading); // Debug log to check loading status
      if (loading) return <Loading />; // Show loading spinner while fetching data
 

return (
  <div className={styles.container}>
    <h1 className={styles.heading}>
      Spacecrafts: Engineering the Future of Space Travel
    </h1>

    {error && <div className={styles.error}>{error}</div>}

    <p className={styles.section}>
      Welcome to the Spacecrafts page, where we explore the cutting-edge
      technology and engineering marvels that make space travel possible.
      From advanced propulsion systems to life-support technologies, discover
      how humanity is pushing the boundaries of exploration.
    </p>

    <Button to="/build" variant="buildButton">
      Build Your Spacecraft
    </Button>

    {spacecrafts.length === 0 ? (
      <p>No spacecrafts yet. Please build one!</p>
    ) : (
      <ul className={styles.list}>
        {spacecrafts.map((ship) => {
          console.log("🚀 pictureUrl for", ship.name, "=", ship.pictureUrl);
          return (
            <li key={ship.id} className={styles.listItem}>
              <div className={styles.imageWrapper}>
                <img
                  src={ship.pictureUrl}
                  alt={ship.name}
                  className={styles.shipImage}
                />
              </div>
              <div className={styles.detailWrapper}>
                <h2 className={styles.shipName}>
                  <Link to={`/spacecrafts/${ship.id}`} className={styles.link}>
                  {ship.name}
                   </Link>
                  </h2>
                <p className={styles.capacity}>
                  Capacity: {ship.capacity}
                </p>
                <p className={styles.description}>{ship.description}</p>
                <Button
                  onClick={() => {
                    console.log("Destroy button clicked for", ship.id);
                    destroySpacecraft(ship.id);
                  }}
                  variant="destroyButton"
                >
                  Destroy
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    )}
  </div>
);
}