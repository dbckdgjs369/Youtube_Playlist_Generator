import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import GeneratePlayListPage from "./pages/MakePlayListPage/GeneratePlayListPage";
import "./styles/reset.css";

// import { worker } from "./mocks/server";

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
