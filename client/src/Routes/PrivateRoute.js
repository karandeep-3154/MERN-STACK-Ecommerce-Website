import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth";
import { Outlet } from "react-router-dom";

export default function PrivateRoute(){

    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useContext(AuthContext);


    return ok ? <Outlet/> : 'spinner'

}