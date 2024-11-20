import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import PageNotFound from "./pages/PageNotFound";
import AboutUs from "./pages/AboutUs";
import LoginPage from "./pages/LoginPage";
import ChessSchool from "./pages/ChessSchool";
import ContactPage from "./pages/ContactPage";
import Leagues from "./pages/Leagues";
import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import ArticlePage from "./pages/ArticlePage";
import { logoutAction } from "./pages/Logout";
import { tokenLoader } from "./util/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "school",
        element: <ChessSchool />,
      },
      {
        path: "leagues",
        element: <Leagues />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "articles/:articleId",
        element: <ArticlePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
