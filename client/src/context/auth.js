import { createContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();//variable which is shared among diff components

const AuthProvider = ({children}) => {
  const [Auth, setAuth] = useState({
    user: null,
    token: "",
  });
  //default axios
  axios.defaults.headers.common["Authorization"] = Auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...Auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    // eslint-disable-next-line
  }, []); //not writing Auth in Dependency Array still its working as Auth is state of this component only and when it gets changed in any other component using auth as contextapi, useeffect works

  return (
    <AuthContext.Provider value={[Auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthProvider, AuthContext}