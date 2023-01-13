import React,{useEffect,useContext,useState} from 'react'
import { Navigate,Outlet} from 'react-router-dom';
import { AuthContext } from "../Front/PlayAuthContext";
import {getUserByPhone} from '../Helper/getfunction'

function HomeLayout() {
  const { state } = useContext(AuthContext);
  const phone = window.localStorage.getItem('phone')
  const [userData , setUserData] = useState(null)


  useEffect(()=>{
    getUserByPhone(phone,function(res){
      console.log(res)
      setUserData(res)
    })
  },[])


  if (!state.isLoggedIn) {
    return <Navigate to="/login" />;
  }


  return (
    <React.Fragment>
      <Outlet context={{userData}} />
    </React.Fragment>
  )
}

export default HomeLayout