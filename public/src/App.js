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
  const [postCategory, setPostCategory] = useState([]);

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

  useEffect(() => {
    const url = "http://localhost:3030/profile/getcategory";
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("server error");
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPostCategory(data.postCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Header
        isSidebar={sideBarController}
        isLogin={isLogin}
        logout={logoutHandler}
        postCategory={postCategory}
      />
      <Routes>
        <Route
          path="/login"
          element={!isLogin ? <Login isLogin={loginHandler} /> : <Blog />}
        />
        <Route path="/signup" element={!isLogin ? <Signup /> : <Blog />} />
        {!isSidebar && (
          <Route
            path="/profile"
            element={
              isLogin ? <Profile postCategory={postCategory} /> : <Blog />
            }
          />
        )}
        <Route
          path="/forgotpassword"
          element={!isLogin ? <ForgotPassEmail /> : <Blog />}
        />
        {!isSidebar && <Route path="/" Component={Blog} />}
        {!isSidebar && <Route path="/post" Component={Singlepost} />}
        {/* {isLogin && !isSidebar && <Route path="/profile" Component={Profile} />} */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
