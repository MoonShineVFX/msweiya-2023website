import React,{useEffect,useContext} from 'react'
import { Navigate,Outlet} from 'react-router-dom';
import { AuthContext } from "../Front/PlayAuthContext";


function HomeLayout() {
  const { state } = useContext(AuthContext);
  if (!state.isLoggedIn) {
    return <Navigate to="/login" />;
  }




  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

export default HomeLayout