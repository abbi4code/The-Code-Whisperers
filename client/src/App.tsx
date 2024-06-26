
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blogs from './pages/Blogs'
import Home from './pages/Home'

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    
      
    </>
  )
}

export default App
