import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import CountrySelection from "../pages/CountrySelection";
import LeagueSelection from "../pages/LeagueSelection";
import SeasonSelection from "../pages/SeasonSelection";
import TeamSelection from "../pages/TeamSelection";
import TeamDetails from "../pages/TeamDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/country",
        element: <CountrySelection />,
    },
    {
        path: "/seasons",
        element: <SeasonSelection />,
    },
    {
        path: "/leagues",
        element: <LeagueSelection />,
    },
    {
        path: "/teams",
        element: <TeamSelection />,
    },
    {
        path: "/team",
        element: <TeamDetails />,
    }
]);

export default router;