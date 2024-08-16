// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import NotFound from "./components/error/NotFound.jsx";
// import { fetchWalletAddress } from "./database/supabase.js";
// import MayamangPobre from "./routes/MayamangPobre.jsx";

// const Main = () => {
//   const [router, setRouter] = useState(null);

//   useEffect(() => {
//     const initRouter = async () => {
//       const walletAddress = await fetchWalletAddress();

//       if (walletAddress) {
//         const router = createBrowserRouter([
//           {
//             path: `/${walletAddress}`,
//             element: <App />,
//             errorElement: <NotFound />,
//           },
//           {
//             path: `/MayamangPobre`,
//             element: <MayamangPobre />,
//             errorElement: <NotFound />,
//           },
//           {
//             path: `/`,
//             element: <NotFound />,
//           },
//         ]);

//         setRouter(router);
//       }
//     };

//     initRouter();
//   }, []);

//   if (!router) return null;

//   return <RouterProvider router={router} />;
// };

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Main />
//   </React.StrictMode>
// );
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/error/NotFound.jsx";
import { fetchWalletAddress } from "./database/supabase.js";
import MayamangPobre from "./routes/MayamangPobre.jsx";
import Login from "./authentication/Login.jsx";

const Main = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await fetchWalletAddress();
      setWalletAddress(address);
    };

    // Check if the user is already authenticated
    const savedAuthState = localStorage.getItem("isAuthenticated");
    if (savedAuthState === "true") {
      setIsAuthenticated(true);
    }

    fetchAddress();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Save the auth state in localStorage
  };

  const router = createBrowserRouter([
    {
      path: `/`,
      element: <NotFound />,
      errorElement: <NotFound />,
    },
    {
      path: `/${walletAddress}`,
      element: <App />,
      errorElement: <NotFound />,
    },
    {
      path: `/mayamangpobre`,
      element: isAuthenticated ? (
        <MayamangPobre />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      ),
      errorElement: <NotFound />,
    },
  ]);

  if (!walletAddress) return null;

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
