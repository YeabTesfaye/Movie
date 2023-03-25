
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Auth from "./components/Auth";
import Admin from "./components/Admin";
import Home from "./components/Home";
function App() {
  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
