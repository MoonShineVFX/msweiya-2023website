import React, { useContext } from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from "../Front/PlayAuthContext";
import Login from '../Front/Login';
import PublicPageLayout from '../Layouts/PublicPageLayout';
const useAuth=()=>{
  const user = useContext(AuthContext);
  console.log(user.currentUser)
  if(user.currentUser ){
    return true
  } else {
    return false
  }
}

const  PublicRoutes=() =>{
  const { state } = useContext(AuthContext);
  if (!state.isLoggedIn) 
    return <Login />;
  else
    return <PublicPageLayout><Outlet/></PublicPageLayout>  

}

export default PublicRoutes;