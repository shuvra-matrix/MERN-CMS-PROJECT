import { useState } from "react";
import "./App.css";
import Blog from "./components/Blogsection/Blog";
import Header from "./components/Header/Header";
import Singlepost from "./components/Singlepost/Singlepost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile";

function App() {
  const [isSidebar, setSidebar] = useState(false);

  const sideBarController = (value) => {
    setSidebar(value);
  };

  return (
    <BrowserRouter>
      <Header isSidebar={sideBarController} />
      <Routes>
        {!isSidebar && <Route path="/" Component={Blog} />}
        {!isSidebar && <Route path="/post" Component={Singlepost} />}
        {!isSidebar && <Route path="/profile" Component={Profile} />}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
