import TextEditor from "./TextEditor";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" exact element={<RedirectToNewDocument />} />
        <Route path="/document/:id" element={<TextEditor />} />
      </Routes>
    </HashRouter>
  );
}

function RedirectToNewDocument() {
  return <Navigate to={`/document/${uuidV4()}`} />;
}

export default App;
