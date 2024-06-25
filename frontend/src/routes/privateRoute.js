import { Navigate } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

const privateRoutes = [
    { path: `*`, element: <Navigate to="/login" replace /> },
    { path: `/login`, element: <Login /> },
    { path: `/register`, element: <Register /> },


];

export default privateRoutes;