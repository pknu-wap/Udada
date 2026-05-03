import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Postdetail from "./pages/Postdetail";

function App() {
  return (
    <BrowserRouter>

      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<Postdetail />} />
        </Routes>
      </div>

      <Routes>
        {/* 인트로 페이지 */}
        <Route path="/" element={<Intro />} />

        {/* 홈 페이지 (Navbar 포함) */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />
          
          {/*상세페이지*/}
        <Route 
          path="/post/:id" 
          element={
             <>
                 <Navbar />
                 <Postdetail />
              </>
         } 
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;