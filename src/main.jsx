import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./PlayMakersHome/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/error/NotFound.jsx";
import Login from "./authentication/Login.jsx";
import LoginNonAdmin from "./authentication/LoginNonAdmin.jsx";
import Homepage from "./PlayMakersHome/Homepage.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import EventManagement from "./routes/EventManagement.jsx";
import MemberOrganization from "./routes/MemberOrganization.jsx";
import EventStatistics from "./routes/EventStatistics.jsx";

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: `/`,
      element: <App />,
      errorElement: <NotFound />,
    },
    {
      path: `/Login`,
      element: isAuthenticated ? (<Homepage /> ) : (
        <LoginNonAdmin onLoginSuccess={handleLoginSuccess} />
      ),
      errorElement: <NotFound />,
    },

    {
      path: `/homepage`,
      element: isAuthenticated ? (<Homepage /> ) : (
        <LoginNonAdmin onLoginSuccess={handleLoginSuccess} />
      ),
      errorElement: <NotFound />,
    },

    {
      path: `/dashboard`,
      element: isAuthenticated ? (
        <Dashboard />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      ),
      errorElement: <NotFound />,
    },
    {
      path: `/events-management`,
      element: isAuthenticated ? (
        <EventManagement />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      ),
      errorElement: <NotFound />,
    },
    {
      path: `/member-organization`,
      element: isAuthenticated ? (
        <MemberOrganization />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      ),
      errorElement: <NotFound />,
    },
    {
      path: `/event-statistics`,
      element: isAuthenticated ? (
        <EventStatistics />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      ),
      errorElement: <NotFound />,
    },

    {
      path: `/adminonly`,
      element: isAuthenticated ? (
        <Dashboard />
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
