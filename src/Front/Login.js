import React ,{useState,useEffect,useContext}from "react";
import { Navigate } from "react-router-dom";
import { useSetState } from 'react-use';
import { AuthContext } from "./PlayAuthContext";
import { motion } from "framer-motion"
//helper

import {getAllUsers} from '../Helper/getfunction'
const initialState = {
  phone: '',
  username: ''
}
function Login() {
  const [usersData ,setUsersData] = useState()
  const [user , setUser] = useState({})
  const { state: ContextState, login } = useContext(AuthContext);
  const {
    isLoginPending,
    isLoggedIn,
    loginError
  } = ContextState;
  const [state, setState] = useSetState(initialState);


  const handleLogin =  async event =>{
    event.preventDefault()
    const [ phone] = event.target.elements
    console.log(phone.value)
    login(phone.value, user.name,user);
    setState({
      phone: '',

    });
 
  }
  const handleChange = (value) =>{
    console.log(/^\d{10}$/.test(value));
    if(/^\d{10}$/.test(value)){
      console.log(value)
      searchUserfromDatabase(value)
    }else {
      setUser({})
    }

  }
  const searchUserfromDatabase = (value)=>{
    var findLike = usersData.find(function(item, index, array){
      return item.phone === value;  
    });
    if(!findLike){
      setUser({});  
      return
    }
    setUser(findLike); 


  } 
  useEffect(()=>{
    getAllUsers((res)=>{
      setUsersData(res)
    })



  },[])


  return (
    <div className="login  ">
      <div
        className="h-[80vh] bg-no-repeat bg-cover bg-center absolute top-0 w-full -z-20"
        style={{backgroundImage : `url(${process.env.PUBLIC_URL+'/images/bg.png'})`}}></div>
      <div 
        className=' absolute h-[80vh] top-0 w-full -z-10' 
        style={{background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)`}}></div>

      <div className="  flex justify-center items-center flex-col">
        <motion.div 
          animate={{ opacity: 1, y:0 }}
          initial={{ opacity: 0, y:-50 }}
          exit={{ opacity: 0 }}
          transition={{ duration :0.5 }}
          className="text-white h-[70vh] flex justify-center items-center">
          <img src={process.env.PUBLIC_URL+'images/logo02.png'} alt="" />
        </motion.div>
        <div className="text-white">
          <div className="text-zinc-300">請輸入陽間的手機號碼登入世界</div>
          <form onSubmit={handleLogin}>
            <div className="my-3">
              <input
                type="text"
                placeholder="手機號碼"
                className="form-control loginInput text-sm w-full tex-center pb-1 text-center"
                onChange={(e)=>{handleChange(e.target.value)}}
              />
            </div>
            {
              user.name &&  
              <motion.div 
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration :0.5 }}
                className="text-center text-sm">您好！歡迎歸來  {user.name} 大人 </motion.div>
            }
            <div className="text-center text-sm text-zinc-400">
            { isLoginPending && <div>請等待一下...</div> }
            { isLoggedIn && <div>準備著陸！.</div> }
            { loginError && <div>{loginError.message}</div> }
            </div>
 
            
            <button
              className="py-3 px-4  text-white w-full rounded-full text-sm tracking-wider my-10 hover:brightness-110"
              style={{background: `linear-gradient(90deg, rgba(38,94,234,1) 0%, rgba(107,237,251,1) 100%)`}}
            >
              開始遊戲
            </button>
          </form>
        </div>
        
        
      </div>

    </div>
  );
}
export default Login;