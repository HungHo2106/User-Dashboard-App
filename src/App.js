import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Users } from "./pages/Users";
import { Photos } from "./pages/Photos";
import { UsersDetail } from "./pages/UsersDetail";

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Users />,
    },
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/photos",
      element: <Photos />,
    },
    {
      path: "/users/:id",
      element: <UsersDetail />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
