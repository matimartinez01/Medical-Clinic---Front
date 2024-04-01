import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import SingIn from './pages/SingIn'
import SingUp from './pages/SingUp'
import Prueba2 from './pages/Prueba2'
import Prueba from './pages/Prueba'
import SelectAppointment from './pages/SelectAppointment'
import Specialties from './components/Specialties'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import authActions from './redux/actions/auth.actions'
import NotFoundError from './pages/NotFoundError'
import Contact from './pages/Contact'
import Neurology from './pages/Neurology'
import AdminPanel from './pages/AdminPanel'
import { withAuth } from './hocs/whitAuth'
import { Navigate } from 'react-router-dom'
import { getRoleFromJWT } from './utils/UserRole'
import SingUpDoctor from './pages/SingUpDoctor'
import SingUpAdmin from './pages/SingUpAdmin'
import AppointmentAdmin from './pages/AppointmentAdmin'
import PatientAdmin from './pages/PatientAdmin'
import DoctorAdmin from './pages/DoctorAdmin'
import PatientDetail from './pages/PatientDetail'




function App() {

    const user = useSelector(store => store.authReducer.user)

    const dispatch = useDispatch()

    const { current, login } = authActions

    console.log(user)



    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!user.loggedIn && !!token) {
            axios.get('/api/patient/current', {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then(response => {
                    dispatch(current(response?.data))
                    dispatch(login(token))
                })
                .catch(error => console.log(error.response?.data))
        }
    }, [])


    const SelectAppointmentWithauth = withAuth(SelectAppointment)
    const SpecialtiesWithAuth = withAuth(Specialties)
    const AdminPanelWithAuth = withAuth(AdminPanel)

    const token = localStorage.getItem("token")
    const role = getRoleFromJWT(token)

    const isAdmin = role?.includes("ADMIN")
    const isUser = role?.includes("PATIENT")
    const isDoctor = role?.includes("DOCTOR")


    return (
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SingIn />} />
          <Route path="/register" element={<SingUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ineccu" element={<Neurology />} />
          <Route path="/admin" element={isAdmin ? <AdminPanelWithAuth /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFoundError />} />
          <Route path="/registerDoctor" element={<SingUpDoctor />} />
          <Route path="/registerAdmin" element={<SingUpAdmin />} />
          <Route path="/appointmentsAdmin" element={<AppointmentAdmin />} />
          <Route path="/patientsAdmin" element={<PatientAdmin />} />
          <Route path="/doctorsAdmin" element={<DoctorAdmin />} />
          <Route path="/patientDetail/:id" element={<PatientDetail/>} />


          {/* <Route path="/prueba" element={<Header />} /> */}
          {/* <Route path="/prueba2" element={<Prueba2 />} /> */}
          {/* <Route path="/avaiableLoans" element={<AvailableLoans />} />
          <Route path="*" element={<NotFoundError />} /> */}


          <Route
            path="/"
            element={
              <MainLayout>
                <Outlet />
              </MainLayout>
            }>

            <Route path='appointment' element={isUser ? <SelectAppointmentWithauth /> : <Navigate to="/login" />}/>
            <Route path='specialties' element={isUser ? <SpecialtiesWithAuth /> : <Navigate to="/login" />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    )
}

export default App
