import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import Analytics from "./pages/Analytics";
import CompareModels from "./pages/CompareModels";
import History from "./pages/History";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/compare" element={<CompareModels />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;