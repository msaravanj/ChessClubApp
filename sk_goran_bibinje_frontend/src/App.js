import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import PageNotFound from "./pages/PageNotFound";
import AboutUs from "./pages/AboutUs";
import LoginPage from "./pages/LoginPage";
import ChessSchool from "./pages/ChessSchool";
import ContactPage from "./pages/ContactPage";
import Leagues from "./pages/Leagues";
import Home from "./pages/Home";

function App() {
  return (
    <div className={classes.app}>
      <main>
        <Routes>
          <Route path="/" exact element={<WelcomePage />}></Route>
          <Route path="/home" exact element={<Home />}></Route>
          <Route path="/about" exact element={<AboutUs />}></Route>
          <Route path="/login" exact element={<LoginPage />}></Route>
          <Route path="/school" exact element={<ChessSchool />}></Route>
          <Route path="/leagues" exact element={<Leagues />}></Route>
          <Route path="/contact" exact element={<ContactPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
