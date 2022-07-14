import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoogleLoginPage from "./pages/GoogleLoginPage/GoogleLoginPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MakePlaylistPage from "./pages/MakePlayListPage/MakePlaylistPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/create" element={<MakePlaylistPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
