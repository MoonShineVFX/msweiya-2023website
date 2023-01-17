import React,{useEffect,useContext,useState} from 'react'
import { Navigate,Outlet} from 'react-router-dom';
import { AuthContext } from "../Front/PlayAuthContext";
import {getUserByPhone} from '../Helper/getfunction'
import { RecoilRoot } from 'recoil';
import DashboardPageLayout from './DashboardPageLayout';
function BankLayout() {
  const { state } = useContext(AuthContext);
  const phone = window.localStorage.getItem('phone')
  const permission = window.localStorage.getItem('permission')
  const [userData , setUserData] = useState(null)


  useEffect(()=>{
    getUserByPhone(phone,function(res){
      setUserData(res)
    })
  },[])


  if (!state.isLoggedIn || permission !== 'adminer') {
    return <Navigate to="/login" />;
  }


  return (
    <React.Fragment>
      <RecoilRoot>
        <DashboardPageLayout><Outlet context={{userData}} /></DashboardPageLayout> 
      </RecoilRoot>

    </React.Fragment>
  )
}

export default BankLayout