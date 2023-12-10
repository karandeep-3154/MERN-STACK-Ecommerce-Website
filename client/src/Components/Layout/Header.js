import { React, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import toast from 'react-hot-toast'

const Header = () => {
  const [Auth, setAuth] = useContext(AuthContext);

  const handleLogout = () => {

    if(Auth && Auth.user){

    setAuth({
      ...Auth,
      user:null,
      token:""
    })
    localStorage.removeItem('Auth');
    toast.success('Logged Out Successfully');

  }

  else{
    toast.success('Already Logged Out');
  }
  }

  return (
    // <>
    //   <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //     <div className="container-fluid">
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarTogglerDemo01"
    //         aria-controls="navbarTogglerDemo01"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon" />
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    //         <Link to="/" className="navbar-brand">
    //           🛒 Ecommerce App
    //         </Link>
    //         <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    //           <li className="nav-item">
    //             <NavLink to="/" className="nav-link ">
    //               Home
    //             </NavLink>
    //           </li>
    //           <li className="nav-item">
    //             <NavLink to="/category" className="nav-link">
    //               Category
    //             </NavLink>
    //           </li>
    //           {Auth.user ? (
    //             <>
    //               <li className="nav-item">
    //                 <NavLink to="/register" className="nav-link">
    //                   Register
    //                 </NavLink>
    //               </li>

    //               <li className="nav-item">
    //                 <NavLink to="/login" className="nav-link">
    //                   Login
    //                 </NavLink>
    //               </li>

    //               <li className="nav-item dropdown">
    //                 <NavLink
    //                   className="nav-link dropdown-toggle"
    //                   href="#"
    //                   role="button"
    //                   data-bs-toggle="dropdown"
    //                   aria-expanded="false"
    //                 >
    //                   {Auth?.user?.name}
    //                 </NavLink>
    //                 <ul className="dropdown-menu">
    //                   <li>
    //                     <NavLink className="dropdown-item" to="/dashboard">
    //                       Dashboard
    //                     </NavLink>
    //                   </li>
    //                   <li>
    //                     <NavLink
    //                       onClick={handleLogout}
    //                       to="/login"
    //                       className="dropdown-item"
    //                     >
    //                       Logout
    //                     </NavLink>
    //                   </li>
    //                 </ul>
    //               </li>
    //             </>
    //           ) : (
    //             <></>
    //           )}

    //           <li className="nav-item">
    //             <NavLink to="/cart" className="nav-link">
    //               Cart (0)
    //             </NavLink>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </>
    <>
      <nav className="dark navbar navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand text-white">
              🛒 Ecommerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item text-white">
                <NavLink to="/" className="text-white nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="text-white nav-link ">
                  Category
                </NavLink>
              </li>
              {!Auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link text-white ">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="text-white nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle text-white "
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {Auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            Auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item text-white "
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item text-white "
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link text-white ">
                  Cart (0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
