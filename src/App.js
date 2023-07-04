import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import useOnRefresh from "./hooks/useOnRefresh";
import { useSocketConnection } from "./hooks/socket/socketConnection";

import Chat from "./pages/chat-page/chat";
import Home from "./pages/home-page/home";
import LogIn from "./pages/login-page/login";
import NotFound from "./pages/error/notFound";
import SignUp from "./pages/signup-page/signup";
import Settings from "./pages/settings/Settings";
import ServerError from "./pages/error/serverError";
import Scrape from "./pages/article/download/scrape";
import NavBar from "./Components/navigationbar/navbar";
import Articles from "./pages/article/view-owner/articles";
import CreateArticle from "./pages/article/create/createArticle";
import UpdateArticle from "./pages/article/update/updateArticle";
import Loading from "./Components/loading-spinners/loading/loading";
import SharedPreview from "./pages/article/view-shared/sharedPreview";
import MessageContainer from "./Components/messages/messageContainer";
import ArticlePreview from "./pages/article/view-owner/articlePreview";
import SharedArticles from "./pages/article/view-shared/sharedArticles";

import { useSelector } from "react-redux";

import Sharings from "./pages/article/view-owner/sharings";
import Downloads from "./pages/article/download/downloads";
import UpdateSharedArticle from "./pages/article/update/updateSharedArticle";

function App() {
  useSocketConnection();
  useOnRefresh();

  const { user, authIsReady, serverSideError } = useSelector(
    (store) => store.auth
  );
  const { success, error } = useSelector((store) => store.alert);

  return (
    <div className="App">
      {(success || error) && <MessageContainer />}
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
              element={!user ? <Navigate to="/login" /> : <Chat />}
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
