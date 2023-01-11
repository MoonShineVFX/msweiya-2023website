import React, { useEffect } from "react";
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import ProtectedRoutes from './Routes/ProtectedRoutes'
import PublicRoutes from "./Routes/PublicRoutes";
import { AuthProvider } from "./Front/PlayAuthContext";
import Login from "./Front/Login";
import Home from "./Front/Home";
import AdminHome from './Back/Home'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<PublicRoutes />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="admin"  element={ <ProtectedRoutes/>}>
              <Route  path="" element={<AdminHome/>} />
            </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
