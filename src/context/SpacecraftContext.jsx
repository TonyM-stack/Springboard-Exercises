import { createContext, useContext, useState, useEffect} from "react";
import SpaceTravelApi from "../services/SpaceTravelApi"; 
import SpaceTravelMockApi from "../services/SpaceTravelMockApi";  

export const SpacecraftContext = createContext();

export function SpacecraftProvider({ children }) {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [planets, setPlanets] = useState([]);  

    // function clearError() {
    //     setError(null);
    // }
 useEffect(() => {
  SpaceTravelMockApi.resetMockDb();

  async function fetchAll() {
    setError(null);
    setLoading(true);

    // optional: simulate 1s delay before the fetch
    await new Promise(r => setTimeout(r, 1000));

    try {
      // fetch planets & spacecrafts in parallel
      const [planetRes, craftRes] = await Promise.all([
        SpaceTravelApi.getPlanets(),
        SpaceTravelApi.getSpacecrafts(),
      ]);

      if (planetRes.isError || craftRes.isError) {
        throw new Error("Fetch failed");
      }

      // NOW inside the try block, update both pieces of state
      setPlanets(planetRes.data);
      setSpacecrafts(craftRes.data);

    } catch (err) {
      console.error("Error loading data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchAll();
}, []);


async function sendSpacecraftToPlanet(spacecraftId, targetPlanetId) {
  setError(null);
  // 1) tell the mock to move the ship and update populations
  const res = await SpaceTravelApi.sendSpacecraftToPlanet({ spacecraftId, targetPlanetId });
  if (res.isError) {
    setError(res.data.message);
    return;
  }

  // 2) now re-fetch **both** lists in parallel
  try {
    const [planetRes, craftRes] = await Promise.all([
      SpaceTravelApi.getPlanets(),
      SpaceTravelApi.getSpacecrafts(),
    ]);
    if (!planetRes.isError)   setPlanets(planetRes.data);
    if (!craftRes.isError)     setSpacecrafts(craftRes.data);
  } catch {
    setError("Failed to refresh after dispatch");
  }
}


    // 2) destroy helper exposed in context
  async function destroySpacecraft(id) {
    console.log("context.destroySpacecraft()",id);
    setError(null);
    // call the mock API
    const response = await SpaceTravelApi.destroySpacecraftById({ id });
    console.log("API response", response);

    if (response.isError) {
      // surface the mock’s error message
      setError(response.data.message);
      return;
    }

     try {
      const [planetRes, craftRes] = await Promise.all([
        SpaceTravelApi.getPlanets(),
        SpaceTravelApi.getSpacecrafts(),
      ]);
      if (!planetRes.isError)   setPlanets(planetRes.data);
      if (!craftRes.isError)     setSpacecrafts(craftRes.data);
    } catch {
      setError("Failed to refresh after delete");
    }
  }

  function clearError() {
    setError(null);
  }

  return (
    <SpacecraftContext.Provider value={{ 
        planets,
        setSpacecrafts,
        spacecrafts,
          loading,
           error,
           destroySpacecraft,
           sendSpacecraftToPlanet,
           clearError
         }}
           >
      {children}
    </SpacecraftContext.Provider>
  );
}

export function useSpacecrafts() {
  return useContext(SpacecraftContext);
}