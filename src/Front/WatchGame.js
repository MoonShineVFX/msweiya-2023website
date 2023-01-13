import React,{useEffect,useState} from 'react'
import { useParams, Link } from 'react-router-dom';
import { getGameByUid,updatedGameBetsByGameUid,updateUserCoinByPhone} from '../Helper/getfunction'
import PlusMinusInput from './Components/PlusMinusInput';
import UserInfo from './Components/UserInfo';
import {useOutletContext} from 'react-router-dom'
function WatchGame() {
  const user_phone = window.localStorage.getItem('phone')
  const {gameuid} = useParams();
  const [data , setData] = useState(null)
  const {userData} = useOutletContext()
  const handleInputClick = (items) => {
    let currentData = {
      "user_phone": user_phone,
      "pay_coin": items.pay_money,
      "player_code" :  items.player
    }
    console.log(currentData)
    updatedGameBetsByGameUid(gameuid,currentData,function(res){
      console.log(res)
    })
    let payCoindata = {
      "coin" : userData.coin - items.pay_money
    } 
    updateUserCoinByPhone(userData.uid,payCoindata,function(res){
      console.log(res)
    })

  }
  useEffect(()=>{
    if(!gameuid) return

    getGameByUid(gameuid,function(res){
      setData(res)
    })

  },[])
  return (
    <div className='text-white w-11/12 mx-auto my-4'>
      <UserInfo userData={userData}/>
      {
        data &&
        
        <div>
          <div className='flex justify-between my-4 items-end border-b border-zinc-400 pb-4'>
            <div 
            className='bg-clip-text text-transparent bg-gradient-to-b from-amber-100 to-amber-600 font-bold text-xl' 
            >{data.title}</div>
            <div>{data.multiple_choice === "1" ?  " 可複選下注" : " 單選下注"}</div>
            <div>上限 {data.pay_limit}</div>
            <div className='flex'> {data.enable ==="1"? <div className='text-green-500'> 可下注</div> : <div className='text-rose-600'> 停止下注</div>}</div>
            
          </div>


          <div className='text-center'>
            <div>
              <div className='text-xl font-extrabold'>下注區</div> 
              <div className='text-zinc-400'>謹慎博弈 小賭怡情 大賭傷身 </div>
            </div>
            {
              data.player.map((item,index)=>{
                return(
                  <div className='p-5 rounded-lg border-2 my-4 bg-cover bg-no-repeat bg-center cursor-pointer' key={'game'+index}>
                    <div>挑戰者: <span className='text-lg font-bold'>{item.code_name}</span></div>
                    <PlusMinusInput  player={item.code_name} handleInputClick={handleInputClick}/>
                  </div>
                )
              })
            }
          </div>
        </div>


        
        
      }
    </div>
  )
}

export default WatchGame