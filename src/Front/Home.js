import React,{useEffect,useState} from 'react'
import {getUserByPhone , updateUserCoinByPhone} from '../Helper/getfunction'
import {useSpring,animated} from 'react-spring'
import AnimatedNumbers from "react-animated-numbers";


function Home() {
  const phone = window.localStorage.getItem('phone')
  const [data ,setData] = useState(null)

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
    </div>
  )
}

export default Home