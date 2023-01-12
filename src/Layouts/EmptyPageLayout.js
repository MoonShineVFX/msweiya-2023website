import React,{useEffect,useContext} from 'react'
import { Navigate,Outlet} from 'react-router-dom';
import { AuthContext } from "../Front/PlayAuthContext";


function EmptyPageLayout() {
  const { state } = useContext(AuthContext);





  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

export default EmptyPageLayout