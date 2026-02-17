import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Market from "./pages/Market";
import Movie from "./pages/Movie";
import Shop from "./pages/Shop";
import Users from "./pages/Users";
import Facts from "./pages/Facts";
import "./App.css";

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={`app-shell ${isHomePage ? "theme-home" : "theme-dark"}`}>
      <Navbar />
      <main className="page-wrap">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/users" element={<Users />} />
          <Route path="/market" element={<Market />} />
          <Route path="/facts" element={<Facts />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
