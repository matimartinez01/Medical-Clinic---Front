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




function App() {

  const user = useSelector(store => store.authReducer.user)

    const dispatch = useDispatch()

    const { current, login } = authActions

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


  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SingIn />} />
        <Route path="/register" element={<SingUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ineccu" element={<Neurology />} />
        <Route path="*" element={<NotFoundError />} />


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

          <Route path="specialties" element={<Specialties/>} />
          <Route path="/appointment" element={<SelectAppointment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
