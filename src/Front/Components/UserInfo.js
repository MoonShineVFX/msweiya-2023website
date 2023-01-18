import React,{useEffect,useState} from 'react'
import AnimatedNumbers from "react-animated-numbers";
function UserInfo({userData}) {

  return (
    <div className='my-4'>
      {
        userData &&
          <div className='p-5 rounded-lg border-2 '>
            <div className='flex justify-between'>
              <div>玩家姓名：</div> <div>{userData.name}</div>
            </div>
            <div className='flex justify-between'>
              <div>積分資產：</div> 
              <div className="flex items-center gap-1">
                {/* <AnimatedNumbers
                  animateToNumber={userData.coin}
                  fontStyle={{
                    color: '#fffedd'
                  }}
                  includeComma={true}
                  configs={(number, index) => {
                    return { mass: 1, tension: 1000 * (index + 1), friction: 140 };
                  }}
                ></AnimatedNumbers>  */}
               {userData.coin}
                 coin </div>
            </div>
            
            
          </div>
      }
    </div>
  )
}

export default UserInfo