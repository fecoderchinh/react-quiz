import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Quiz } from './pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Quiz />}/>
      <Route path="/result" element={<Quiz />}/>
    </Routes>
  )
}

export default App
