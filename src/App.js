import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import useOnRefresh from "./hooks/useOnRefresh";
import { useSocketConnection } from "./hooks/socket/socketConnection";

import Chats from "./pages/chat/Chats";
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
import NotFound from "./pages/error/NotFound";
import Settings from "./pages/settings/Settings";
import Create from "./pages/article/create/Create";
import Update from "./pages/article/update/Update";
import ServerError from "./pages/error/ServerError";
import Loading from "./components/loaders/loading/Loading";
import UpdateShared from "./pages/article/update/UpdateShared";
import MessageContainer from "./components/alerts/AlertContainer";
import Sharings from "./pages/article/view-owner/sharings/Sharings";
import Articles from "./pages/article/view-owner/articles/Articles";
import SharedPreview from "./pages/article/view-shared/sharedPreview/SharedPreview";
import ArticlePreview from "./pages/article/view-owner/articlePreview/ArticlePreview";
import SharedArticles from "./pages/article/view-shared/sharedArticles/SharedArticles";

import { useSelector } from "react-redux";
import Store from "./pages/store/Store";
import FolderContents from "./pages/folderContents/FolderContents";

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
              element={!user ? <Navigate to="/login" /> : <Store />}
            />
            <Route
              path="/home"
              element={!user ? <Navigate to="/login" /> : <Store />}
            />
            <Route
              path="/store"
              element={!user ? <Navigate to="/login" /> : <Store />}
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
            <Route
              path="/store/folder/:id"
              element={!user ? <Navigate to="/login" /> : <FolderContents />}
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
