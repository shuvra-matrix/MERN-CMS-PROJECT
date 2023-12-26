import { useEffect, useState } from "react";
import "./App.css";
import Blog from "./components/Blogsection/Blog";
import Header from "./components/Header/Header";
import Singlepost from "./components/Singlepost/Singlepost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Singup/Signup";
import ForgotPassEmail from "./components/Auth/FogotPassword/ForgotPasswordEmail";

function App() {
  const [isSidebar, setSidebar] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const sideBarController = (value) => {
    setSidebar(value);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const url = "http://localhost:3030/auth/verifytoken";

      fetch(url, {
        method: "post",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            setIsLogin(false);
            localStorage.clear("isLogin");
          }

          return response.json();
        })
        .then((data) => {
          if (data.message === "valid auth") {
            setIsLogin(true);
          } else {
            setIsLogin(false);
            localStorage.clear("isLogin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const isUserLogin = localStorage.getItem("isLogin") === "yes";

    if (isUserLogin) {
      console.log(isUserLogin);
      checkLoginStatus();
    }
  }, []);

  const logoutHandler = () => {
    setIsLogin(false);
    localStorage.clear("isLogin");
    localStorage.clear("token");
    localStorage.clear("userId");
    localStorage.clear("expirationTime");
  };

  const loginHandler = (value) => {
    setIsLogin(value);
  };

  return (
    <BrowserRouter>
      <Header
        isSidebar={sideBarController}
        isLogin={isLogin}
        logout={logoutHandler}
      />
      <Routes>
        <Route
          path="/login"
          element={!isLogin ? <Login isLogin={loginHandler} /> : <Blog />}
        />
        <Route path="/signup" element={!isLogin ? <Signup /> : <Blog />} />
        <Route
          path="/forgotpassword"
          element={!isLogin ? <ForgotPassEmail /> : <Blog />}
        />
        {!isSidebar && <Route path="/" Component={Blog} />}
        {!isSidebar && <Route path="/post" Component={Singlepost} />}
        {isLogin && !isSidebar && <Route path="/profile" Component={Profile} />}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
