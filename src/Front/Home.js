import React,{useEffect,useState} from 'react'
import {getUserByPhone , updateUserCoinByPhone, getAllGame} from '../Helper/getfunction'
import {useSpring,animated} from 'react-spring'
import AnimatedNumbers from "react-animated-numbers";
//loading
import {LoadingAnim} from '../Helper/HtmlComponents'

function Home() {
  const phone = window.localStorage.getItem('phone')
  const [data ,setData] = useState(null)
  const [gameData ,setGameData] = useState()

  const handleClick = () =>{

    let currentdata = {
      "coin" : data.coin +100
    } 
    console.log(data,currentdata)
    updateUserCoinByPhone(data.uid,currentdata,function(res){
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
      
      {
        data &&
          <div className='p-5 rounded-lg border-2'>
            <div>Welcome!</div>
            <div className='flex justify-between'>
              <div>玩家姓名：</div> <div>{data.name}</div>
            </div>
            <div className='flex justify-between'>
              <div>積分資產：</div> 
              <div className="flex items-center">
                <AnimatedNumbers
                  animateToNumber={data.coin}
                  includeComma={true}
                  configs={(number, index) => {
                    return { mass: 1, tension: 230 * (index + 1), friction: 140 };
                  }}
                ></AnimatedNumbers> 元</div>
            </div>
            
            
          </div>
      }
      <button className='border p-2 my-4' onClick={handleClick}> TEST +100積分(當玩家下注贏錢時，增加積分到資料庫)</button>
      <div className='mt-10'>
        <div className='text-xl text-center'>賽局清單 </div>
        {
          gameData ?
          gameData.map((item,index)=>{
            const {title,player,multiple_choice,enable} = item
            return(
              <div className='p-5 rounded-lg border-2 my-4 bg-cover bg-no-repeat bg-center'
              style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/card.jpeg'})`}}
              >
                <div 
                  className='bg-clip-text text-transparent bg-gradient-to-b from-amber-100 to-amber-600 font-bold text-xl' 
                  >{title}</div>
                <div>參賽人數: {player.length}</div>
                <div>下注模式: {multiple_choice === "1" ?  " 可複選下注" : " 單選下注"}</div>
                <div className='flex gap-2 border-t-2 pt-2 mt-2 border-zinc-600 text-sm'>
                  <div className='flex'>狀態:  {enable ==="1"? <div className='text-green-500'> 可下注</div> : <div className='text-rose-600'> 停止下注</div>}</div>
                  <div className='border px-1'> 觀看下注情形 </div>
                </div>
                
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