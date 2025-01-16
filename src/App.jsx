import './App.css'
import ListWorkSession from './components/ListWorkSession'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WorkSessionComponent from './components/WorkSessionComponent'
import EmployeeSelection from './components/EmployeeSelection'
import LoginComponent from './components/LoginComponent'
import AdminUIComponent from './components/AdminUIComponent'
import AddEmployee from './components/AddEmployee'
import DeleteEmployee from './components/DeleteEmployee'
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element = {<LoginComponent/>}></Route>
        <Route path='/admin' element={<AdminUIComponent />} />
        <Route path='/admin-dashboard' element={<ProtectedRoute element={<ListWorkSession />} isAdmin={true} />} />
        <Route path='/employee/add' element={<ProtectedRoute element={<AddEmployee />} isAdmin={true} />} />
        <Route path='/employee/delete' element={<ProtectedRoute element={<DeleteEmployee />} isAdmin={true} />} />

        <Route path='/erfassung/arbeitszeiten' element={<ProtectedRoute element={<EmployeeSelection />} isAdmin={false} />} />
        <Route path='/work-session/:employeeName' element={<ProtectedRoute element={<WorkSessionComponent />} isAdmin={false} />} />
 


      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
