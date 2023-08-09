import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import RouteProtection from "./pages/auth/routeProtection";
import routes from "./routes";
import LoginPage from "./pages/auth/sign-in";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/sign-in"} />,
  },
  {
    path: "/dashboard",
    element: (
      <RouteProtection>
        <Dashboard />
      </RouteProtection>
    ),
    children: [
      ...routes.map((route) => {
        return {
          path: route.path,
          element: <RouteProtection> {route.element} </RouteProtection>,
        };
      }),
    ],
  },
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to={"/sign-in"} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
