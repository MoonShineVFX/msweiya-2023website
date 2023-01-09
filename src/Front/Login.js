import React ,{useState,useContext }from "react";
import { Navigate } from "react-router-dom";
import {auth} from '../firebaseConfig/fireauth'
import {  signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../Auth";

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
    <div className="login  ">
      Login
      
    </div>
  );
}
export default Login;