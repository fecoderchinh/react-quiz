import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { PageResults } from './pages'
import PageQuiz from './pages/PageQuiz'
import { store } from './rtk/store'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<PageQuiz />} />
        <Route path="/result" element={<PageResults />} />
      </Routes>
    </Provider>
  )
}

export default App
