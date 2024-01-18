import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import "./App.css";
import Blog from "./components/Blogsection/Blog";
import Header from "./components/Header/Header";
import Singlepost from "./components/Singlepost/Singlepost";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ForgotPassEmail from "./components/Auth/ForgotPasswordEmail";
import ResetPass from "./components/Auth/ResetPassword";
import Message from "./components/Message/Message";

const apiUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3030";

const App = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postCategory, setPostCategory] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [isMessage, setIsMesssage] = useState(false);

  const [pages, setPages] = useState({
    totalItem: 0,
    totalPage: 0,
    currentPage: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const categoryHandler = () => {
    setSearchData("");
    setCurrentPage(1);
  };

  const searchDataHandler = (value) => {
    setSearchData(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const url = apiUrl + "/auth/verifytoken";

    fetch(url, {
      method: "post",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("auth failed");
        }

        return response.json();
      })
      .then((data) => {
        setSearchData("");
        if (data.message === "valid auth") {
          setIsLogin(true);
          localStorage.setItem("isLogin", "yes");
        } else {
          setIsLogin(false);
          localStorage.removeItem("isLogin");
        }
      })
      .catch((err) => {
        setIsLogin(false);
        localStorage.removeItem("isLogin");

        console.log(err);
      });
  }, []);

  const logoutHandler = (type = "") => {
    const url = apiUrl + "/auth/logout";

    fetch(url, { method: "GET", credentials: "include" })
      .then((response) => {
        localStorage.clear("isLogin");
        localStorage.clear("option");
        localStorage.clear("optionValue");
        localStorage.clear("activeCat");
        setIsLogin(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(type);
    if (type === "session") {
      setIsMesssage(true);
    }
  };

  const loginHandler = (value) => {
    setIsLogin(value);
  };

  useEffect(() => {
    const url = apiUrl + "/profile/getcategory";
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
        setPostCategory(data.postCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoader(true);
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const queryParams = new URLSearchParams(location.search);
    let cat = queryParams.get("catId");
    if (!cat) {
      cat = "All";
    }

    const url =
      apiUrl +
      "/public/getpost?page=" +
      currentPage +
      "&catId=" +
      cat +
      "&search=" +
      searchData +
      "&timeZone=" +
      userTimezone;

    fetch(url, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          const error = new Error("server error");
          throw error;
        }
        return response.json();
      })
      .then((data) => {
        setLoader(false);
        setPages({
          totalItem: data.totalItem,
          totalPage: data.totalPage,
          currentPage: Number(data.currentPage),
        });
        setPosts(data.posts);
      })
      .catch((err) => {
        console.log(err);
        setPosts([]);
        setLoader(false);
      });
  }, [currentPage, searchData, location.search]);

  useEffect(() => {
    localStorage.removeItem("activeCat");
  }, []);

  const currentPageHandler = (value) => {
    setCurrentPage(value);
  };

  const crossHandler = (value) => {
    setIsMesssage(value);
  };

  return (
    <Fragment>
      {isMessage && (
        <div className="session-message">
          <Message
            type="error"
            message="Your login session has expired."
            cross={crossHandler}
          />
        </div>
      )}
      <Header isLogin={isLogin} logout={logoutHandler} />
      <Routes>
        <Route
          path="/login"
          element={
            !isLogin ? (
              <Login isLogin={loginHandler} />
            ) : (
              <Blog
                posts={posts}
                pages={pages}
                currentPageHandler={currentPageHandler}
                isLoader={isLoader}
                postCategory={postCategory}
                categoryHandler={categoryHandler}
                searchDataHandler={searchDataHandler}
              />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isLogin ? (
              <Signup />
            ) : (
              <Blog
                posts={posts}
                pages={pages}
                currentPageHandler={currentPageHandler}
                isLoader={isLoader}
                postCategory={postCategory}
                categoryHandler={categoryHandler}
                searchDataHandler={searchDataHandler}
              />
            )
          }
        />

        <Route
          path="/forgotpassword"
          element={
            !isLogin ? (
              <ForgotPassEmail />
            ) : (
              <Blog
                posts={posts}
                pages={pages}
                currentPageHandler={currentPageHandler}
                isLoader={isLoader}
                postCategory={postCategory}
                categoryHandler={categoryHandler}
                searchDataHandler={searchDataHandler}
              />
            )
          }
        />
        <Route
          path="/"
          element={
            <Blog
              posts={posts}
              pages={pages}
              currentPageHandler={currentPageHandler}
              isLoader={isLoader}
              postCategory={postCategory}
              categoryHandler={categoryHandler}
              searchDataHandler={searchDataHandler}
            />
          }
        />
        <Route path="/post" element={<Singlepost />} />

        <Route
          path="/profile"
          element={
            isLogin ? (
              <Profile postCategory={postCategory} logout={logoutHandler} />
            ) : (
              <Blog
                posts={posts}
                pages={pages}
                currentPageHandler={currentPageHandler}
                isLoader={isLoader}
                postCategory={postCategory}
                categoryHandler={categoryHandler}
                searchDataHandler={searchDataHandler}
              />
            )
          }
        />
        <Route
          path="/resetpassword"
          element={
            !isLogin ? (
              <ResetPass />
            ) : (
              <Blog
                posts={posts}
                pages={pages}
                currentPageHandler={currentPageHandler}
                isLoader={isLoader}
                postCategory={postCategory}
                categoryHandler={categoryHandler}
                searchDataHandler={searchDataHandler}
              />
            )
          }
        />
      </Routes>
      <Footer />
    </Fragment>
  );
};

export default App;
