import { BrowserRouter, Route, Routes } from "react-router";
import { Events, Jobs } from "./src/page";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/event" element={<Events />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
