import { Routes, Route } from "react-router-dom";
import MockAPI from "./mockman";

export default function URLRoutes() {
  
    return (
      <Routes>
        {/* MockMan */}
        <Route path="/mockman" element={<MockAPI />} />
  </Routes>
    )
}