import { Routes, Route, Navigate} from "react-router-dom";
import HomePage from "../pages/HomePage";
import SpacecraftsPage from "../pages/SpacecraftsPage";
import BuildPage from "../pages/BuildPage";
import PlanetsPage from "../pages/PlanetsPage";
import { SpacecraftProvider, useSpacecrafts } from "../context/SpacecraftContext";
import Loading from "../components/Loading";
import SpacecraftCard from "../pages/SpacecraftCard";

function AppRoutes() {
    const { loading } = useSpacecrafts();

    if (loading) {
        return <Loading />;
    }

  return (
    <Routes>
          <Route path="/" element={<HomePage />} />
          {/* HomePage is the default route */}

        <Route path="/spacecrafts" 
          element={<SpacecraftsPage />}/> 

          <Route path="/build" 
          element={<BuildPage />} 
          /> 
          <Route path="/planets" element={<PlanetsPage />} /> 
    
            {/* Redirect any unknown routes to HomePage */} 
          <Route path="*" element={<Navigate to="/" replace />} />

          <Route path="/spacecrafts/:id"
            element={<SpacecraftCard />}
          />
     </Routes>
  );
}

export default AppRoutes;