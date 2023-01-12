import React,{useEffect,useState} from 'react'
import {getUserByPhone} from '../Helper/getfunction'
import {useSpring,animated} from 'react-spring'
import AnimatedNumbers from "react-animated-numbers";

function Number({n}){
  const {number} = useSpring({
    from: {number:0},
    number:n,
    delay:200,
    config:{mass:1,tension:20,friction:20}
  });
  return <animated.div>{number.to((n)=>n.toFixed(0))}</animated.div>
}

function Home() {
  const phone = window.localStorage.getItem('phone')
  const [data ,setData] = useState(null)
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
                  animateToNumber={parseInt(data.coin)}
                  includeComma={true}
                  configs={(number, index) => {
                    return { mass: 1, tension: 230 * (index + 1), friction: 140 };
                  }}
                ></AnimatedNumbers> 元</div>
            </div>
            
            
          </div>
      }
    </div>
  )
}

export default Home