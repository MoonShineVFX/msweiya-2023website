import React, { useContext } from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from "../Auth";
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

  const auth=useAuth()

  return auth?<Navigate to="/admin"/>: <Outlet/>
}

export default PublicRoutes;