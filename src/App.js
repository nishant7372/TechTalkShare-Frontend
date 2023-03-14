import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home/home";
import LogIn from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import NavBar from "./Components/navbar/navbar";
import Settings from "./pages/settings/Settings";
import Articles from "./pages/article/view-owner/articles";
import CreateArticle from "./pages/article/create/createArticle";
import UpdateArticle from "./pages/article/update/updateArticle";
import ArticlePreview from "./pages/article/view-owner/articlePreview";
import MessageContainer from "./Components/messages/messageContainer";
import SharedArticles from "./pages/article/view-shared/sharedArticles";
import SharedPreview from "./pages/article/view-shared/sharedPreview";
import NotFound from "./pages/error/notFound";
import ServerError from "./pages/error/serverError";

import { useAuthContext } from "./hooks/context/useAuthContext";

function App() {
  const { user, authIsReady, serverError } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <NavBar />
          <MessageContainer />
          <Routes>
            <Route
              path="/"
              element={!user ? <Navigate to="/login" /> : <Home />}
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
              path="/articles"
              element={!user ? <Navigate to="/login" /> : <Articles />}
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      )}
      {serverError && <ServerError />}
    </div>
  );
}

export default App;
