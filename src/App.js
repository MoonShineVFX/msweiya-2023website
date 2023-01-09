import React, { useEffect } from "react";
import { BrowserRouter , Routes, Route} from 'react-router-dom';
// import ProtectedRoutes from './Routes/ProtectedRoutes'
import PublicRoutes from "./Routes/PublicRoutes";
import { AuthProvider } from "./Auth";
import Login from "./Front/Login";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="login" element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
