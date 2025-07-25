import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";
// import { SpacecraftProvider } from "./context/SpacecraftContext";
import "./App.module.css";
import React from "react";

function App() {
  return (
    <>
      <NavBar />
      <AppRoutes />
    </>
  );
}

export default App;


