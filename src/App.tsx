import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/Form Page/formpage";
import DataPage from "./pages/Data Page/datapage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/data-page" element={<DataPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
