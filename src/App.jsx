import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import { SpacecraftProvider } from "./context/SpacecraftContext";
import "./App.module.css";
import React from "react";

function App() {
  return (
    <SpacecraftProvider>
      <NavBar />
      <AppRoutes />
    </SpacecraftProvider>
  );
}

export default App;


// import { useEffect, useState } from "react";
// import SpaceTravelApi from "./services/SpaceTravelApi";

// // import axios from "axios";
// // Importing necessary libraries and components
// import HomePage from "./pages/HomePage";
// import SpacecraftsPage from "./pages/SpacecraftsPage";
// import NavBar from "./components/NavBar";
// import BuildPage from "./pages/BuildPage";
// // import PlanetsPage from "./pages/PlanetsPage";

// import React from "react";  
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import styles from "./App.module.css";

// // Main application component
// function App() {
//   const [spacecraftsList, setSpacecraftsList] = useState([]); // State to hold the list of spacecrafts
//   const [loading, setLoading] = useState(true); // State to manage loading status

//    // Fetch spacecrafts data from the API
//   useEffect(() => {
//     fetchSpacecrafts(); // Call the function to fetch spacecrafts
//   }, []); // Empty dependency array means this effect runs once after the initial render

//   async function fetchSpacecrafts() {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
//         const response = await SpaceTravelApi.getSpacecrafts(); // Using the API to get spacecrafts
//         console.log("Fetched spacecrafts:", response); // Debug log to see the fetched data
//         console.log("loading is:", loading); // Debug log to check loading status
//         if (response.isError) {
//             throw new Error("Failed to fetch spacecrafts");
//             }
//         setSpacecraftsList(response.data); // Updating the state with the fetched data
//       } catch (error) {
//         console.error("Error loading spacecrafts:", error);  // Log any errors during the fetch 
//       } finally {
//         setLoading(false); // Ensure loading is set to false even if there's an error
//       }
//     }


// async function handleDestroy(id) {
//   await SpaceTravelApi.destroySpacecraftById({id});
//   console.log(`Spacecraft with ID ${id} destroyed`); // Debug log to confirm destruction
  
//   await refreshSpacecrafts(); // Call the function to refresh spacecrafts
//   console.log("Spacecrafts list refreshed after destruction"); // Debug log to confirm refresh
// }

// async function refreshSpacecrafts() {
//   const response = await SpaceTravelApi.getSpacecrafts();
//   if (response.isError) {
//     console.error("Failed to fetch spacecrafts");
//     return;
//   }
//   setSpacecraftsList(response.data);
// }


//   return (
//     <BrowserRouter>
//         <NavBar/>    {/*NavBar appears on every page */}

//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           {/* HomePage is the default route */}

//         <Route path="/spacecrafts" 
//           element={
//             loading ? (
//               <div className={styles.fullScreenLoader}>
//                 <span className={styles.gear}>⚙️</span>
//                 <p>Loading...</p>
//               </div>
//             ) : (
//             <SpacecraftsPage // SpacecraftsPage receives props
//               spacecrafts={spacecraftsList}  // spacecraftsList and handleDestroy are passed down to SpacecraftsPage 
//               onDestroy={handleDestroy}
//               />
//             )} 
//          /> 

//           <Route path="/build" 
//           element={<BuildPage refreshSpacecrafts={fetchSpacecrafts} />} 
//           /> 

//           {/* <Route path="/planets" element={<PlanetsPage />} />  */}
//         </Routes>
      
//     </BrowserRouter>
//   );
// }

// export default App;