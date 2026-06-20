import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '../components/ProtectedRoutes';
import Services from '../pages/Services';
import AddWidgetModal from '../components/AddWidgetModal';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/services' element={<Services />} />
          <Route path='/addwidgetmodal' element={<AddWidgetModal />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;