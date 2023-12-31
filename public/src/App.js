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
import SearchSection from "./components/Searchpost/SearchSection";
import PostCategory from "./components/PostCategory/PostCategory";

function App() {
  const [isSidebar, setSidebar] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [postCategory, setPostCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("All");
  const [isLoader, setLoader] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [isHomepage, setIsHomePage] = useState(true);

  const [pages, setPages] = useState({
    totalItem: 0,
    totalPage: 0,
    currentPage: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const sideBarController = (value) => {
    setSidebar(value);
    setCurrentPage(1);
  };

  const categoryHandler = (value) => {
    setCategoryId(value);
    setSearchData("");
    setCurrentPage(1);
  };

  const searchDataHandler = (value) => {
    setSearchData(value);
    setCurrentPage(1);
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
          if (!response.ok) {
            setIsLogin(false);
            localStorage.clear("isLogin");
          }

          return response.json();
        })
        .then((data) => {
          setSearchData("");
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
        setPostCategory(data.postCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoader(true);
    const url =
      "http://localhost:3030/public/getpost?page=" +
      currentPage +
      "&catId=" +
      categoryId +
      "&search=" +
      searchData;

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
  }, [currentPage, categoryId, searchData]);

  const currentPageHandler = (value) => {
    setCurrentPage(value);
  };

  const homePageHandler = (value) => {
    setIsHomePage(value);
  };

  useEffect(() => {
    const handlePopstate = () => {
      const pathname = window.location.pathname;

      if (pathname === "/post" || pathname === "/profile") {
        setIsHomePage(false);
      } else {
        setIsHomePage(true);
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return (
    <BrowserRouter>
      <Header
        isSidebar={sideBarController}
        isLogin={isLogin}
        logout={logoutHandler}
        homePageHandler={homePageHandler}
      />

      {isHomepage && <SearchSection searchDataHandler={searchDataHandler} />}
      {isHomepage && (
        <PostCategory
          postCategory={postCategory}
          categoryHandler={categoryHandler}
        />
      )}

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
                homePageHandler={homePageHandler}
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
                homePageHandler={homePageHandler}
              />
            )
          }
        />
        {!isSidebar && (
          <Route
            path="/profile"
            element={
              isLogin ? (
                <Profile postCategory={postCategory} />
              ) : (
                <Blog
                  posts={posts}
                  pages={pages}
                  currentPageHandler={currentPageHandler}
                  isLoader={isLoader}
                  homePageHandler={homePageHandler}
                />
              )
            }
          />
        )}
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
                homePageHandler={homePageHandler}
              />
            )
          }
        />
        {!isSidebar && (
          <Route
            path="/"
            element={
              <Blog
                posts={posts}
                pages={pages}
                currentPageHandler={currentPageHandler}
                isLoader={isLoader}
                homePageHandler={homePageHandler}
              />
            }
          />
        )}
        {!isSidebar && <Route path="/post" element={<Singlepost />} />}
        {isLogin && !isSidebar && <Route path="/profile" Component={Profile} />}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
