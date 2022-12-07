import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import {Routes, Route} from 'react-router-dom'


function App() {

  return (
      <>
      <Navigation/>
      <Routes>
        <Route exact path="/" element={<Dashboard/>}></Route>
        <Route path="/create" element={<CreateTask/>}></Route>
        <Route path="/edit/:id" element={<EditTask/>}></Route>
      </Routes>
      </>
  );
}

export default App;
