import React,{useEffect,useContext,useState} from 'react'
import { Navigate,Outlet} from 'react-router-dom';
import { AuthContext } from "../Front/PlayAuthContext";
import {getUserByPhone} from '../Helper/getfunction'
import { RecoilRoot } from 'recoil';
function HomeLayout() {
  const { state } = useContext(AuthContext);
  const phone = window.localStorage.getItem('phone')
  
  const [userData , setUserData] = useState(null)


  useEffect(()=>{
    getUserByPhone(phone,function(res){
      setUserData(res)
    })
  },[])


  if (!state.isLoggedIn) {
    return <Navigate to="/login" />;
  }


  return (
    <React.Fragment>
      <RecoilRoot>
        <Outlet context={{userData}} />
      </RecoilRoot>

    </React.Fragment>
  )
}

export default HomeLayout