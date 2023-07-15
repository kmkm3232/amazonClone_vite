import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './component/nav-bar'
import FrontPage from './component/front-page'

function App() {
  

  return (
    <>
      <NavBar/>
        <Routes>
          <Route path='/' Component={FrontPage} />
        </Routes>
    </>
  )
}

export default App
