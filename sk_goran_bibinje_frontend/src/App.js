import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import PageNotFound from "./pages/PageNotFound";
import AboutUs from "./pages/AboutUs";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className={classes.app}>
      <main>
        <Routes>
          <Route path="/" exact element={<WelcomePage />}></Route>
          <Route path="/about" exact element={<AboutUs />}></Route>
          <Route path="/login" exact element={<LoginPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
