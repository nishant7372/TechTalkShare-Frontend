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
import Chats from "./pages/chat/Chats";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import NotFound from "./pages/error/NotFound";
import NavBar from "./components/navbar/Navbar";
import Create from "./pages/article/create/Create";
import Update from "./pages/article/update/Update";
import Settings from "./pages/settings/Settings";
import ServerError from "./pages/error/ServerError";
import Scrape from "./pages/article/download/scrape/Scrape";
import Sharings from "./pages/article/view-owner/sharings/Sharings";
import Downloads from "./pages/article/download/downloads/Downloads";
import Articles from "./pages/article/view-owner/articles/Articles";
import MessageContainer from "./components/alerts/AlertContainer";
import Loading from "./components/loaders/loading/Loading";
import SharedPreview from "./pages/article/view-shared/sharedPreview/SharedPreview";
import ArticlePreview from "./pages/article/view-owner/articlePreview/ArticlePreview";
import SharedArticles from "./pages/article/view-shared/sharedArticles/SharedArticles";
import UpdateShared from "./pages/article/update/UpdateShared";

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
              path="/login"
              element={user ? <Navigate to="/" /> : <LogIn />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
              path="/"
              element={!user ? <Navigate to="/login" /> : <Home />}
            />
            <Route
              path="/home"
              element={!user ? <Navigate to="/login" /> : <Home />}
            />
            <Route
              path="/articles"
              element={!user ? <Navigate to="/login" /> : <Articles />}
            />
            <Route
              path="/articles/:id"
              element={!user ? <Navigate to="/login" /> : <ArticlePreview />}
            />
            <Route
              path="/articles/create"
              element={!user ? <Navigate to="/login" /> : <Create />}
            />
            <Route
              path="/articles/update/:id"
              element={!user ? <Navigate to="/login" /> : <Update />}
            />
            <Route
              path="/articles/sharings/:id"
              element={!user ? <Navigate to="/login" /> : <Sharings />}
            />
            <Route
              path="/settings"
              element={!user ? <Navigate to="/login" /> : <Settings />}
            />
            <Route
              path="/download"
              element={!user ? <Navigate to="/login" /> : <Scrape />}
            />
            <Route
              path="/downloads"
              element={!user ? <Navigate to="/login" /> : <Downloads />}
            />
            <Route
              path="/chat/*"
              element={!user ? <Navigate to="/login" /> : <Chats />}
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
              path="/shared/update/:id"
              element={!user ? <Navigate to="/login" /> : <UpdateShared />}
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
