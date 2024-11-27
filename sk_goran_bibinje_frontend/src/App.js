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
import AdminPage from "./pages/admin/AdminPage";
import { logoutAction } from "./pages/Logout";
import { tokenLoader } from "./util/Auth";
import ClubInfoManagement from "./pages/admin/ClubInfoManagement";
import ArticlesManagement from "./pages/admin/ArticlesManagement";
import ArticleEditPage from "./pages/admin/ArticleEditPage";
import CreateArticle from "./pages/admin/CreateArticle";
import PlayersPage from "./pages/admin/PlayersPage";
import CreatePlayer from "./pages/admin/CreatePlayer";
import PlayerEditPage from "./pages/admin/PlayerEditPage";
import LeaguesManagement from "./pages/admin/LeaguesManagement";
import CreateLeague from "./pages/admin/CreateLeague";
import LeagueEditPage from "./pages/admin/LeagueEditPage";

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
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/admin/manageClubInfo",
        element: <ClubInfoManagement />,
      },
      {
        path: "/admin/manageArticles",
        element: <ArticlesManagement />,
      },
      {
        path: "/admin/manageArticles/:articleId",
        element: <ArticleEditPage />,
      },
      {
        path: "/admin/manageArticles/new",
        element: <CreateArticle />,
      },
      {
        path: "/admin/managePlayers",
        element: <PlayersPage />,
      },
      {
        path: "/admin/managePlayers/new",
        element: <CreatePlayer />,
      },
      {
        path: "/admin/managePlayers/:playerId",
        element: <PlayerEditPage />,
      },
      {
        path: "/admin/manageLeagues",
        element: <LeaguesManagement />,
      },
      {
        path: "/admin/manageLeagues/new",
        element: <CreateLeague />,
      },
      {
        path: "/admin/manageLeagues/:leagueId",
        element: <LeagueEditPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
