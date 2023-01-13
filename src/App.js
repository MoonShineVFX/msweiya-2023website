import React, { useEffect } from "react";
import { HashRouter,BrowserRouter , Routes, Route} from 'react-router-dom';
import ProtectedRoutes from './Routes/ProtectedRoutes'
import PublicRoutes from "./Routes/PublicRoutes";
import EmptyPageLayout from "./Layouts/EmptyPageLayout";
import { AuthProvider } from "./Front/PlayAuthContext";
import HomeLayout from "./Layouts/HomeLayout";
import Login from "./Front/Login";
import Home from "./Front/Home";
import WatchGame from "./Front/WatchGame";
import WatchChart from "./Front/WatchChart";
import AdminHome from './Back/Home'

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
            
            
            <Route path="" element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/watchgame/:gameuid" element={<WatchGame />} />
              <Route path="/watchchart/:gameuid" element={<WatchChart />} />
              
            </Route>
            <Route path="login"  element={ <PublicRoutes/>}>
              <Route path="" element={<Login />} />
            </Route>
            
            
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
