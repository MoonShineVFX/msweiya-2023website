import React, { useContext } from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from "../Front/PlayAuthContext";
import Login from '../Front/Login';
import PublicPageLayout from '../Layouts/PublicPageLayout';
function PublicRoutes() {
  const { state } = useContext(AuthContext);
  if (state.isLoggedIn) {
    return <Navigate to="/" />;
  }




  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

export default PublicRoutes;