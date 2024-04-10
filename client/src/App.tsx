import "./App.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { TextEditor } from "./components/TextEditor"
import { v4 as uuidV4 } from "uuid"

function App() {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} replace />} />
          <Route path="/documents/:id" element={ <TextEditor/> }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
