import { createContext, useContext, useState, useEffect} from "react";
import SpaceTravelApi from "../services/SpaceTravelApi"; 
// import { use } from "react";
import {SpaceTravelMockApi} from "../services/SpaceTravelMockApi"; 

// Context for managing planets and spacecraft data
export const SpacecraftContext = createContext();

export function SpacecraftProvider({ children }) {
   // ---------- Data State ----------
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [planets, setPlanets] = useState([]);  
  // ---------- Loading State ----------
  const [loading, setLoading] = useState(true);

  // ---------- Error State ----------
  const [error,setError] = useState(null);
  
 // on mount: seed DB and load data
  useEffect(() => {
    SpaceTravelMockApi.resetMockDb()
    fetchAll();
  }, []);

  async function fetchAll() {
    console.log("fetchAll start")
    setError(null);
    setLoading(true);

    try {
      // console.log("📡 fetching planets & crafts…") 
      // fetch planets & spacecrafts in parallel
      const [planetRes, craftRes] = await Promise.all([
        SpaceTravelApi.getPlanets(),
        SpaceTravelApi.getSpacecrafts(),
      ]);

      if (planetRes.isError || craftRes.isError) {
        throw new Error("Fetch failed");
      }
      //  console.log("✅ got data", planetRes, craftRes)
      // NOW inside the try block, update both pieces of state
      // setPlanets(planetRes.data);
      // setSpacecrafts(craftRes.data);
      setPlanets(planetRes.data  ?? []);
      setSpacecrafts(craftRes.data ?? []);

    } catch (err) {
      console.error("Error loading data:", err);
      setError(err.message);
    } finally {
       console.log("🏁 fetchAll done – clearing loading")
      setLoading(false);
    }
  }

  // Expect a single object with { spacecraftId, targetPlanetId }
async function sendSpacecraftToPlanet({spacecraftId, targetPlanetId}) {
    // 🚀 DEBUG: log exactly what the context is passing in
  console.log(  "⚙️ Context calling sendSpacecraftToPlanet with:",   { spacecraftId, targetPlanetId });
  setError(null);
  setLoading(true); 
  try { 
    const res = await SpaceTravelApi.sendSpacecraftToPlanet({
       spacecraftId,
       targetPlanetId
  });

  if (res.isError) {
    setError(res.data?.message ?? "Failed to send spacecraft");
    
  } else if (!res.data) {
    setError("No data returned from the mock API.");
    
  } else { 
       const { planets: updatedPlanets, spacecrafts: updatedCrafts } = res.data;
       setPlanets(updatedPlanets);
       setSpacecrafts(updatedCrafts);
      }
  } catch (err) {
    console.error("Error sending spacecraft:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  } 
}


    // 2) destroy helper exposed in context
  async function destroySpacecraft(id) {
    console.log("context.destroySpacecraft()",id);
    setError(null);
    setLoading(true);
    try { 
    const res = await SpaceTravelApi.destroySpacecraftById({ id });
    console.log("API response", res);

    if (res.isError) {
      // surface the mock’s error message
      setError(res.data?.message ?? "Failed to destroy spacecraft");
      
    } else if (!res.data) {
      setError("No data returned from the mock API.");
    } else { 
        const { planets: updatedPlanets, spacecrafts: updatedCrafts } = res.data;
        setPlanets(updatedPlanets);
        setSpacecrafts(updatedCrafts);
      }
    } catch (err) {
      console.error("Error in destroySpacecraft:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  return (
    <SpacecraftContext.Provider 
       value={{ 
           planets,
           setSpacecrafts,
           spacecrafts,
           loading,
           error,
           fetchAll, 
           destroySpacecraft,
           sendSpacecraftToPlanet,
           clearError,
         }}
           >
      {children}
    </SpacecraftContext.Provider>
  );
}

export function useSpacecrafts() {
  return useContext(SpacecraftContext);
}