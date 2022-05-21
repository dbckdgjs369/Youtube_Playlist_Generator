import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoogleLoginPage from "./pages/GoogleLoginPage/GoogleLoginPage";
import MakePlaylistPage from "./pages/MakePlayListPage/MakePlaylistPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MakePlaylistPage />} />
          <Route path="/auth" element={<GoogleLoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
