import { useState } from "react";
import "./App.css";
import Blog from "./components/Blogsection/Blog";
import Header from "./components/Header/Header";

function App() {
  const [isSidebar, setSidebar] = useState(false);

  const sideBarController = (value) => {
    setSidebar(value);
  };

  return (
    <div className="App">
      <Header isSidebar={sideBarController} />
      {isSidebar && <Blog />}
    </div>
  );
}

export default App;
