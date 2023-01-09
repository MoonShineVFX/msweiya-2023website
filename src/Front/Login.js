import React ,{useState,useContext }from "react";
import { Navigate } from "react-router-dom";
import {auth} from '../firebaseConfig/fireauth'
import {  signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../Auth";
import { motion } from "framer-motion"
function Login() {
  const [user , setUser] = useState({})
  onAuthStateChanged(auth , (currentUser)=>{
    console.log(currentUser)
    setUser(currentUser)
  })

  const handleLogin =  async event =>{
    event.preventDefault()
    const [ email , password] = event.target.elements
    console.log( email.value , password.value)
    try {
      await signInWithEmailAndPassword(auth, email.value , password.value)
      .then((userCredential) => {
        console.log(userCredential.user)
      })
    } catch (error) {
      console.log(error)
    }
  }
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/admin" />;
  }
  return (
    <div 
      className="login  "
    >
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
          <img src={process.env.PUBLIC_URL+'images/logo01.png'} alt="" />
        </motion.div>
        <div className="text-white">
          <div className="text-zinc-300">請輸入陽間的手機號碼登入世界</div>
          <form >
            <div className="my-3">
              <input
                type="email"
                placeholder="手機號碼"
                className="form-control loginInput text-sm w-full tex-center pb-1"
              />
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