import TextEditor from "./TextEditor";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<RedirectToNewDocument />} />
        <Route path="/document/:id" element={<TextEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

function RedirectToNewDocument() {
  return <Navigate to={`/document/${uuidV4()}`} />;
}

export default App;
