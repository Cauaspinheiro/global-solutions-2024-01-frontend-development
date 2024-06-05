import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "./pages/Landing/LandingPage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
