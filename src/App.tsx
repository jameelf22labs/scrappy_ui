import { BrowserRouter, Route, Routes } from "react-router";
import { Events, Jobs } from "./src/page";
import Navbar from "./src/layouts/navbar/Navbar";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/event" element={<Events />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
