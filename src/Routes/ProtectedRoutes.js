import React, { useContext }  from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from "../Front/PlayAuthContext";
import DashboardPageLayout from '../Layouts/DashboardPageLayout';
import PublicPageLayout from '../Layouts/PublicPageLayout'


const  ProtectedRoutes=() =>{
  const { state } = useContext(AuthContext);
  if (!state.isLoggedIn) {
    return <Navigate to="/login" />;
  }


  return (
    <PublicPageLayout>
      <Outlet/>
    </PublicPageLayout>
  ) 
}

export default ProtectedRoutes;