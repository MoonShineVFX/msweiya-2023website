import React, { useContext }  from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from "../Components/Auth";
import DashboardPageLayout from '../Layouts/DashboardPageLayout';
const useAuth=()=>{
  const user = useContext(AuthContext);
  console.log(user.currentUser)
  if(user.currentUser){
    return true
  } else {
    return false
  }
}

const  ProtectedRoutes=(props:any) =>{

  const auth=useAuth()

  return auth?  (<DashboardPageLayout><Outlet/></DashboardPageLayout>) : <Navigate to="/"/>
}

export default ProtectedRoutes;