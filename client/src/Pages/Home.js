import React, { useContext } from "react";
import Layout from "../Components/Layout/Layout";
import { AuthContext } from "../context/auth";
const Home = () => {
  const [auth, setAuth] = useContext(AuthContext)
  return (
    <Layout>
      <h1>Home page</h1>
<pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default Home;
