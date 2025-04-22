import { useState } from 'react'
import './App.css'
import { Route,
  BrowserRouter,
  Routes} from 'react-router-dom'
import Layout  from './mainLayout/Layout'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Loginpage from './pages/Loginpage'
import Transferpage from './pages/Transferpage'
import EditProfile from './pages/EditProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index  element={<Loginpage/>}/>
          <Route path='home'  element={<Homepage/>}/>
          <Route path='signup'  element={<Signup/>}/>
          <Route path='login'  element={<Loginpage/>}/>
          <Route path='transfer'  element={<Transferpage/>}/>
          <Route path='edit-profile'  element={<EditProfile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
