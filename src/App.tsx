import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Quiz } from './pages'
import { store } from './rtk/store'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/result" element={<Quiz />} />
      </Routes>
    </Provider>
  )
}

export default App
