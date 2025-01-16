import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WorkSessionComponent from './components/WorkSessionComponent'
import EmployeeSelection from './components/EmployeeSelection'
import LoginComponent from './components/LoginComponent'
import AdminUIComponent from './components/AdminUIComponent'
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element = {<LoginComponent/>}></Route>
        <Route path='/admin' element={<AdminUIComponent />} />
        <Route path='/erfassung/arbeitszeiten' element={<ProtectedRoute element={<EmployeeSelection />} isAdmin={false} />} />
        <Route path='/work-session/:employeeName' element={<ProtectedRoute element={<WorkSessionComponent />} isAdmin={false} />} />
 


      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
