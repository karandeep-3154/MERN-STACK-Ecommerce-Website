import React, { useState, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { useNavigate , useLocation} from "react-router-dom";
import toast from "react-hot-toast";
import "../../Styles/AuthStyles.css";
import { AuthContext } from "../../context/auth";

const Login = () => {
  const [Auth, setAuth] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
         setAuth({
          ...Auth,
          user:res.data.user,
          token:res.data.token
          } );
          localStorage.setItem("auth", JSON.stringify(res.data));
           navigate(location.state || "/");//If state has some url in it user will be redirected to it after login otherwise by default to HomePage

       
      } else {
        // console.log(res)
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } 
  };
  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          {/* <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-passsword");
              }}
            >
              Forgot Password
            </button>
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
          </div>
           */}
          <div className="mb-3 row">
            <div className="col-md-6  mt-3">
              <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button>
            </div>
            <div className="col-md-6 mt-3">
              <button type="submit" className="btn btn-primary w-100">
                LOGIN
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
