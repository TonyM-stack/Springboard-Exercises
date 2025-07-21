import styles from "./PlanetsPage.module.css";
import { useEffect, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import Loading from "../components/Loading";
import Button from "../components/Button"; 
import { useSpacecrafts } from "../context/SpacecraftContext";

export default function PlanetsPage() {
    const { 
        spacecrafts, 
        loading,
        planets,
        error,
        sendSpacecraftToPlanet: dispatchSpacecraft,
        
    } = useSpacecrafts();

    const [dispatching, setDispatching] = useState(null);

    if (loading) return <Loading />; 
    if (error) return <p className={styles.error}>{error}</p>;

//  useEffect(() => {
//     async function fetchData() {
        
//       const [planetRes, craftRes] = await Promise.all([
//         SpaceTravelApi.getPlanets(),
//         SpaceTravelApi.getSpacecrafts(),
//       ]);
//       console.log("🌍 planets:", planetRes.data);
//       console.log("🚀 spacecrafts:", craftRes.data);
//       if (!planetRes.isError && !craftRes.isError) {
//         setPlanets(planetRes.data);
//         setSpacecrafts(craftRes.data);
//       }
//       setLoading(false);
//     }
//     fetchData();
//   }, []);

//     async function handleDispatch(spacecraftId, targetPlanetId) {
//     setDispatching(spacecraftId);
//     const response = await SpaceTravelApi.sendSpacecraftToPlanet({ spacecraftId, targetPlanetId });
//     if (!response.isError) {
//       const refreshedCrafts = await SpaceTravelApi.getSpacecrafts();
//       if (!refreshedCrafts.isError) setSpacecrafts(refreshedCrafts.data);
//     }
//     setDispatching(null);
//   }

//   if (loading) return <Loading />;

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
                disbled={dispatching === s.id}
                onClick={async () => {
                    setDispatching(s.id,)
                await dispatchSpacecraft(s.id, planet.id);
                setDispatching(null);
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


