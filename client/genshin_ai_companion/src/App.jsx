import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CharactersPage from "./pages/CharactersPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import MyBuildsPage from "./pages/MyBuildsPage";
import PublicBuildsPage from "./pages/PublicBuildsPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:name" element={<CharacterDetailPage />} />
        <Route path="/public-builds" element={<PublicBuildsPage />} />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/builds"
          element={
            <ProtectedRoute>
              <MyBuildsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
