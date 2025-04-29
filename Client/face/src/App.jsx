import { Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import MainPage from "./Pages/MainPage"
import { Usercontextprovoider } from "./ContextApi/UserContex"
import ExelPage from "./Pages/ExelPage"
import Face from "./Components/Face"
import ProtectedRoute from "./Components/ProtectedRoute"
// import F_img from "./Pages/F_img"
import ProfPage from "./Pages/ProfPage"
import StudentAttendancepage from "./Pages/StudentAttendancepage"
import Profile from "./Pages/Profile"
import Dashboard from "./Pages/Dashboard"
import Createbatch from "./Pages/Createbatch"
import DevicePage from "./Pages/DevicePage"
// import Tes from "./Pages/Tes"
// import Tes from "./Pages/Tes"


function App() {
  
  return (
    <>
    <Usercontextprovoider>
        <ProtectedRoute>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/auth" element={<LoginPage/>}/>
        <Route path="/main" element={<MainPage/>}/>
        <Route path="/face" element={<Face/>}/>
        
        <Route path="/Exel" element={<ExelPage/>}/>

        {/* <Route path="/image" element={<F_img/>}/> */}
        <Route path="/teacher" element={<ProfPage/>}/>
        <Route path="/student" element={<StudentAttendancepage/>}/>
        <Route path="/profile" element ={<Profile/>}/>
        <Route path="/createdb" element={<Createbatch/>}/>
        <Route path="/device/:email/:password" element={<DevicePage/>}/>
       </Routes>
        </ProtectedRoute>
    </Usercontextprovoider>
    </>
  )
}

export default App
