import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { PageResults } from './pages'
import PageQuiz from './pages/PageQuiz'
import { REACT_BASE, REACT_RESULT } from './rtk/constants'
import { store } from './rtk/store'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path={REACT_BASE} element={<PageQuiz />} />
        <Route path={REACT_RESULT} element={<PageResults />} />
      </Routes>
    </Provider>
  )
}

export default App
