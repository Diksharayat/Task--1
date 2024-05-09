import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import Dashboard from "./pages/Authentication/Dashboard";
import Otp from "./pages/Authentication/Otp";
import CustomAppBar from "./Components/AppBar/appbar";
import Blogs from "./Components/Blogs/Blogs";
import Contact from "./Components/Contact/Contact";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <>
              {/* <CustomAppBar> */}
              <CustomAppBar />
              <Dashboard />
            </>
          }
        />

        <Route
          path="/blogs"
          element={
            <>
              {/* <CustomAppBar> */}
              <CustomAppBar />
              <Blogs />
            </>
          }
        />

        <Route
          path="/Contact"
          element={
            <>
              {/* <CustomAppBar> */}
              <CustomAppBar />
              <Contact />
            </>
          }
        />

        <Route path="/otp" element={<Otp />} />
      </Route>
    </>
  )
);

export default router;
