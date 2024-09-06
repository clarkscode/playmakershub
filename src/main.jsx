import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/error/NotFound.jsx";
import Login from "./authentication/Login.jsx";
import PlaymakersAdmin from "./routes/PlaymakersAdmin.jsx";

const Main = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
      const savedAuthState = localStorage.getItem("isAuthenticated");
      if (savedAuthState === "true") {
        setIsAuthenticated(true);
      }
      setLoading(false); 
    }, []);

    const handleLoginSuccess = () => {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    };

    if (loading) {
      return <div>Loading...</div>; 
    }

    const router = createBrowserRouter([
      {
        path: `/`,
        element: <App />,
        errorElement: <NotFound />,
      },
      {
        path: `/adminonly`,
        element: isAuthenticated ? (
          <PlaymakersAdmin />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        ),
        errorElement: <NotFound />,
      },
    ]);

    return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
