import { Navigate } from "react-router-dom";

/* --------- Blog ---------*/
import Blog from "../pages/Blog/Blog";
import ViewBlog from "../pages/Blog/ViewBlog";
import EditBlog from "../pages/Blog/EditBlog";
import Profile from "../pages/Auth/Profile";

const { id, username, email, } = JSON.parse(localStorage.getItem('user')) || "";

const protectedRoutes = [
    { path: `*`, element: <Navigate to="/blog" replace /> },

    /* --------- Blog ---------*/
    { path: `/blog`, element: <Blog id={id} name={username} /> },
    { path: `/viewBlog/:id`, element: <ViewBlog /> },
    { path: `/editBlog/:id`, element: <EditBlog /> },


    /* --------- Profile ---------*/
    { path: `/myProfile`, element: <Profile name={username} email={email} /> },

]

export default protectedRoutes 
