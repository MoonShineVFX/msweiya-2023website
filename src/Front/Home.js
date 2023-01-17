import React,{useEffect,useState} from 'react'
import {getUserByPhone , updateUserCoinByPhone, getAllGame} from '../Helper/getfunction'
import { Link  } from "react-router-dom";
import AnimatedNumbers from "react-animated-numbers";
import UserInfo from './Components/UserInfo';
import {useOutletContext} from 'react-router-dom'
//loading
import {LoadingAnim} from '../Helper/HtmlComponents'
import { useRecoilState } from 'recoil';
import { gameState } from './Components/atoms/fromTypes';

function Home() {
  const phone = window.localStorage.getItem('phone')
  const [data ,setData] = useState(null)
  const [gameData ,setGameData] = useState()
  const {userData} = useOutletContext()
  const [singleGame, setSingleGame] = useRecoilState(gameState);

  const handleClick = () =>{

    let currentdata = {
      "coin" : userData.coin +100
    } 
    updateUserCoinByPhone(userData.uid,currentdata,function(res){
      console.log(res)
    })
  
  }

  useEffect(()=>{
    getUserByPhone(phone,function(res){
      console.log(res)
      setData(res)
    })
    getAllGame((res)=>{
      setGameData(res)
    })
  },[])
  return (
    <div className='text-white w-11/12 mx-auto my-4'>
      <UserInfo userData={userData}/>
      
      <div className='mt-10'>
        <div className='text-xl text-center'>賽局清單 </div>
        {
          gameData ?
          gameData.map((item,index)=>{
            const {title,player,multiple_choice,enable,uid,pay_limit,u_title,special_rule} = item
            return(
              <div 
                className={'p-5 rounded-lg border-2 my-4 bg-cover bg-no-repeat bg-center cursor-pointer ' + (enable ==="1"? " brightness-100 saturate-100" : " brightness-50  saturate-50 ") }
                style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/card.jpeg'})`}}
              >
                <Link to={'/watchgame/' +uid } 
                  style={(enable ==="1"? { } : {pointerEvents: "none"})}
                  onClick={()=>{
                    setSingleGame(item)
                  }}>
                <div 
                  className='bg-clip-text text-transparent bg-gradient-to-b from-amber-100 to-amber-600 font-bold text-xl' 
                  >{title}</div>
                <div>參賽人數: {player.length}</div>
                <div>下注模式: {multiple_choice === "1" ?  " 可複選下注" : " 單選下注"}</div>
                <div>下注上限: {pay_limit} 個籌碼</div>
                <div className='flex gap-2 border-t-2 pt-2 mt-2 border-zinc-600 text-sm'>
                  <div className='flex'>狀態:  {enable ==="1"? <div className='text-green-500'> 可下注</div> : <div className='text-rose-300'> 停止下注</div>}</div>
                  <Link to={'/watchchart/' +u_title }>
                    <div className='border px-1'> 觀看下注情形 </div>
                  </Link>
                </div>
                </Link>
                
              </div>
            )
          })
          : <LoadingAnim />

        }
      </div>
    </div>
  )
}

export default Home