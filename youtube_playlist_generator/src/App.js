import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import MakePlaylistPage from "./pages/MakePlayListPage/MakePlaylistPage";
import { worker } from "./mocks/worker";
if (process.env.NODE_ENV === "development") {
  worker.start();
}

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
