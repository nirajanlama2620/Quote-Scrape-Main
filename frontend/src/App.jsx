import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet />
    </>
  )
}
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
          {path:"/", element: <Home/>},
          {path:"/login", element: <Login/>},
          {path:"/signup", element: <Signup/>},
    ],
  },
]);

  export default function App(){
  return <RouterProvider router={router}/>;
}