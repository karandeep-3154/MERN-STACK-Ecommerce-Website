import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Components/User/Dashboard";
import UserRoute from "./Routes/UserRoute.js";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import AdminDashboard from './Pages/Admin/AdminDashboard.js';
import AdminRoute from './Routes/AdminRoute.js';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element = {<AdminRoute/>}>
          <Route path = 'admin' element = {<AdminDashboard/>}/>
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
