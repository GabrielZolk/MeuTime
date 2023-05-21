import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import CountrySelection from "../pages/CountrySelection";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/country",
        element: <CountrySelection />,
    }
]);

export default router;