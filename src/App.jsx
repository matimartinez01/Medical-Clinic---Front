import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import SingIn from './pages/SingIn'
import SingUp from './pages/SingUp'
import Prueba2 from './pages/Prueba2'
import Prueba from './pages/Prueba'
import SelectAppointment from './pages/SelectAppointment'
import Specialties from './components/Specialties'



function App() {


  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SingIn />} />
        <Route path="/register" element={<SingUp />} />
        {/* <Route path="/prueba2" element={<Prueba2 />} /> */}
        {/* <Route path="/prueba3" element={<Prueba />} /> */}
        
        
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
          <Route path="/prueba" element={<SelectAppointment />} />
          {/* <Route path="cards" element={<CardsWithAuth />} />
          <Route path="loans" element={<LoansWithAuth />} />
          <Route path="accounts/:id" element={<AccountDetailWithAuth />} />
          <Route path="transactions" element={<TransactionsWithAuth />} />
          <Route path="*" element={<NotFoundError />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
