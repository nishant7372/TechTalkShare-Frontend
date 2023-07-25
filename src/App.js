import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import useOnRefresh from "./hooks/useOnRefresh";
import { useSocketConnection } from "./hooks/socket/socketConnection";

import LogIn from "./pages/login/LogIn";
import Chats from "./pages/chat-page/Chats";
import SignUp from "./pages/signup/SignUp";
import NotFound from "./pages/error/NotFound";
import Settings from "./pages/settings/Settings";
import ServerError from "./pages/error/ServerError";
import Scrape from "./pages/article/download/Scrape";
import NavBar from "./components/navbar/Navbar";
import Sharings from "./pages/article/view-owner/Sharings";
import Downloads from "./pages/article/download/Downloads";
import Articles from "./pages/article/view-owner/Articles";
import CreateArticle from "./pages/article/create/CreateArticle";
import UpdateArticle from "./pages/article/update/UpdateArticle";
import MessageContainer from "./components/alerts/AlertContainer";
import Loading from "./components/loaders/loading/Loading";
import SharedPreview from "./pages/article/view-shared/SharedPreview";
import ArticlePreview from "./pages/article/view-owner/ArticlePreview";
import SharedArticles from "./pages/article/view-shared/SharedArticles";
import UpdateSharedArticle from "./pages/article/update/UpdateSharedArticle";

import { useSelector } from "react-redux";

function App() {
  useSocketConnection();
  useOnRefresh();

  const { user, authIsReady, serverSideError } = useSelector(
    (store) => store.auth
  );
  const { alert } = useSelector((store) => store.alert);

  return (
    <div className="App">
      {alert && <MessageContainer />}
      {!authIsReady && <Loading action="mainRead" />}
      {authIsReady && !serverSideError && (
        <Router>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                !user ? <Navigate to="/login" /> : <Navigate to="/articles" />
              }
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LogIn />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
              path="/settings"
              element={user ? <Settings /> : <Navigate to="/login" />}
            />
            <Route
              path="/articles/create"
              element={!user ? <Navigate to="/login" /> : <CreateArticle />}
            />
            <Route
              path="/download"
              element={!user ? <Navigate to="/login" /> : <Scrape />}
            />
            <Route
              path="/chat/*"
              element={!user ? <Navigate to="/login" /> : <Chats />}
            />
            <Route
              path="/downloads"
              element={!user ? <Navigate to="/login" /> : <Downloads />}
            />
            <Route
              path="/articles"
              element={!user ? <Navigate to="/login" /> : <Articles />}
            />
            <Route
              path="/sharings/:id"
              element={!user ? <Navigate to="/login" /> : <Sharings />}
            />
            <Route
              path="/shared"
              element={!user ? <Navigate to="/login" /> : <SharedArticles />}
            />
            <Route
              path="/shared/:id"
              element={!user ? <Navigate to="/login" /> : <SharedPreview />}
            />
            <Route
              path="/articles/:id"
              element={!user ? <Navigate to="/login" /> : <ArticlePreview />}
            />
            <Route
              path="/articles/update/:id"
              element={!user ? <Navigate to="/login" /> : <UpdateArticle />}
            />
            <Route
              path="/shared/update/:id"
              element={
                !user ? <Navigate to="/login" /> : <UpdateSharedArticle />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      )}
      {authIsReady && serverSideError && <ServerError />}
    </div>
  );
}

export default App;
