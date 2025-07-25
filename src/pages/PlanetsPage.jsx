import styles from "./PlanetsPage.module.css";
import { useEffect, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import Loading from "../components/Loading";
import Button from "../components/Button"; 
import { useSpacecrafts } from "../context/SpacecraftContext";
import { useLocation } from "react-router-dom";

export default function PlanetsPage() {
    const location = useLocation();
   
    const { 
        spacecrafts, 
        loading, 
        planets,
        error,
        clearError,
        fetchAll, 
        sendSpacecraftToPlanet: dispatchSpacecraft,   
    } = useSpacecrafts();
     
     const [pageLoading, setPageLoading] = useState(true);
     const [dispatching, setDispatching] = useState(null); // Hook for dispatching state lifted above all returns

  //  on mount *and* any time the route changes,
  // clear any error and re‐fetch both planets & crafts
  useEffect(() => {
    clearError();
    setPageLoading(true); 

    fetchAll()
      .catch((e) => {
        console.error("fetchAll failed on route change:", e);
      })
      .finally(() => {
        setPageLoading(false);
            console.log("👉 pageLoading now false, planets:", planets);
           });

  }, [location.pathname]); // Re-fetch when the route changes

  if (pageLoading) {
    return <Loading />;   // ← now you really will see it
  }

  if (error)  { 
    return <p className="error">{error}</p>;
  }

  async function handleDispatch(sId, pId) {
    setDispatching(sId);
    await dispatchSpacecraft({ spacecraftId: sId, targetPlanetId: pId });
    setDispatching(null);
  }
   

   return (
    <div className={styles.container}>
      <h1 className={styles.heading}></h1>
        {planets.map(planet => (
        <div key={planet.id} className={styles.planetCard}>
           {/*  Left column: Planet details */}
            <div className={styles.summary }>
               <h2 className={styles.planetName}>{planet.name}</h2>
               <img src={planet.pictureUrl} alt={planet.name} width={150} />
                <p className={styles.pop}>Population: {planet.currentPopulation}</p>
            </div>
        

            {/* Right column: Details and dispatch section */}
          <div className={styles.detailWrapper}>
                {/*   Stationed Spacecrafts */}
                    <h3 className={styles.stationed}>Stationed Spacecrafts:</h3>
                     <ul className={styles.list}> 
                      {spacecrafts.filter(s => s.currentLocation === Number(planet.id))
                      .map((s)=> (
                        <li className={styles.listItem}key={s.id}>{s.name}
                        </li>
                    ))}   
                     </ul>
                
     
          <div className={styles.dispatchSection}> 
            <h4 className={styles.dispatchh4}>Dispatch spacecraft here:</h4>
             {spacecrafts
                 .filter(s => s.currentLocation !== (planet.id))
                  .map(s => (
              <Button
                key={s.id}
                variant="dispatchButton"
                disabled={dispatching === s.id}
                onClick={() => {
                  handleDispatch(s.id, planet.id);
                }}
              >
                {dispatching === s.id ? "Dispatching..." : `Send ${s.name}`}
              </Button>
            ))}
            </div> 
          </div>
        </div> 
        ))}
     </div>
        );
    }


