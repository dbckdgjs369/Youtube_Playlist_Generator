import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
// import MakePlaylistPage from "./pages/MakePlayListPage/MakePlaylistPage";

import GeneratePlayListPage from "./pages/MakePlayListPage/GeneratePlayListPage";
// import { worker } from "./mocks/server";
import "./styles/reset.css";

// if (process.env.NODE_ENV === "development") {
//   worker.start();
// }

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/create" element={<MakePlaylistPage />} /> */}
          <Route path="/create" element={<GeneratePlayListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
