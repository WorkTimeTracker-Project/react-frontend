import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WorkSessionComponent from './components/WorkSessionComponent'
import EmployeeSelection from './components/EmployeeSelection'
import LoginComponent from './components/LoginComponent'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element = {<LoginComponent/>}></Route>
        <Route path = '/erfassung/arbeitszeiten' element={<EmployeeSelection/>}></Route>
        <Route path = '/work-session/:employeeName' element={<WorkSessionComponent/>}></Route>


      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
