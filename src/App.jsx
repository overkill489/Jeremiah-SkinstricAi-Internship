import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Introduction from "./pages/Introduction";
import Location from "./pages/Location";
import ImageSelection from "./pages/ImageSelection";
import AnalysisLoading from "./pages/AnalysisLoading";
import Analysis from "./pages/Analysis";
import Demographics from "./pages/Demographics";



export default function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/location" element={<Location />} />
          <Route path="/image-selection" element={<ImageSelection />} />
          <Route path="/analysis-loading" element={<AnalysisLoading />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/demographics" element={<Demographics />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
