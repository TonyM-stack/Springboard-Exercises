import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { SpacecraftProvider } from './context/SpacecraftContext'
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById("root"))
        .render(
	    <React.StrictMode>
		   <ErrorBoundary>
		     <SpacecraftProvider>
				<BrowserRouter>	
                    <App />
                </BrowserRouter>
			  </SpacecraftProvider>
			</ErrorBoundary>
	     </React.StrictMode>
		
        );
