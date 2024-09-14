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
import Profile from "./components/admin/Profile.jsx";
import Notification from "./components/admin/Notification.jsx";

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

  // Reusable function for authenticated routes
  const authRoute = (Component) => {
    return isAuthenticated ? (
      <Component />
    ) : (
      <Login onLoginSuccess={handleLoginSuccess} />
    );
  };

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
      element: authRoute(Dashboard),
      errorElement: <NotFound />,
    },
    {
      path: `/events-management`,
      element: authRoute(EventManagement),
      errorElement: <NotFound />,
    },
    {
      path: `/member-organization`,
      element: authRoute(MemberOrganization),
      errorElement: <NotFound />,
    },
    {
      path: `/event-statistics`,
      element: authRoute(EventStatistics),
      errorElement: <NotFound />,
    },
    {
      path: `/profile`,
      element: authRoute(Profile),
      errorElement: <NotFound />,
    },
    {
      path: `/notification`,
      element: authRoute(Notification),
      errorElement: <NotFound />,
    },
    {
      path: `/adminonly`,
      element: authRoute(Dashboard),
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
