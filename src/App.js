import Navigation from './components/Navigation'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import Footer from './components/Footer'
import ErrorPage from './pages/ErrorPage'
import {Routes, Route, Navigate} from 'react-router-dom'
import {useContext} from 'react'
import { UserContext } from './context/UserContext';


function App() {
  const {state} = useContext(UserContext)

  return (
      <>
        <Navigation/>
        <Routes>
          <Route index path="/" element={!state.user ? <Login/> : <Navigate to='/dashboard'/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/dashboard" element={state.user ? <Dashboard/> : <Navigate to='/'/>}></Route>
          <Route path="/create" element={state.user ? <CreateTask/> : <Navigate to='/'/>}></Route>
          <Route path="/edit/:id" element={state.user ? <EditTask/> : <Navigate to='/'/>}></Route>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
        <Footer/>
      </>
  );
}

export default App;
