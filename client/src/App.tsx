import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { TextEditor } from "./components/TextEditor"
import { LandingPage } from "./components/LandingPage"
// import { v4 as uuidV4 } from "uuid"

function App() {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/documents/:id" element={ <TextEditor/> }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
