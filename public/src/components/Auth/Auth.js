import { Fragment, useState } from "react";
import Login from "./Login/Login";
import Signup from "./Singup/Signup";
import ForgotPassEmail from "./FogotPassword/ForgotPasswordEmail";

const Auth = () => {
  const [authRoutes, setAuthRoutes] = useState("login");

  const authRoutesHandler = (value) => {
    console.log(value);
    setAuthRoutes(value);
  };

  console.log(authRoutes);

  return (
    <Fragment>
      {authRoutes === "login" ? <Login authRoutes={authRoutesHandler} /> : ""}
      {authRoutes === "signup" ? <Signup /> : ""}
      {authRoutes === "forgotpass" ? <ForgotPassEmail /> : ""}
    </Fragment>
  );
};

export default Auth;
