import React, { useEffect, useState } from 'react'
import { motion,AnimatePresence,Reorder,usePresence } from "framer-motion"
//helper
import {getAllUsersForRich,getAllUsersRealTime} from '../Helper/getfunction'
import Color from 'color'

const transition = { type: 'spring', stiffness: 800, damping: 50, mass: 1 }

function ListItem({ children, onClick, color }) {
  const [isPresent, safeToRemove] = usePresence()

  const animations = {
    layout: true,
    initial: 'out',
    style: {
      color: color.hex(),
      position: isPresent ? 'static' : 'absolute'
    },
    animate: isPresent ? 'in' : 'out',
    whileTap: 'tapped',
    variants: {
      in: { scaleY: 1, opacity: 1, color: color.hex() },
      out: { scaleY:0, opacity: 0, zIndex: -1, color: color.hex() },
      tapped: { scale: 0.98, opacity: 0.5, transition: { duration: 0.1 } }
    },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition
  }

  return (
    <motion.h2 {...animations} onClick={onClick}>
      {children}
    </motion.h2>
  )
}

function TopRich() {
  const [currentList , setCurrentList] = useState([])
  const colorStart = Color('#eeee44')
  const colorEnd = Color('#ff7008')

  const fetchData = ()=>{
    getAllUsersForRich((res)=>{
      const sortData = res.sort((a,b)=> b.coin - a.coin)
      setCurrentList(sortData)
    })
  }
  useEffect(()=>{
    const interval = setInterval(()=>{
      fetchData()
      console.log('更新！')
    },3000)

    return ()=> clearInterval(interval)
  },[currentList])
  return (
    <section className=' '>
      <div className='py-7 flex justify-center items-center flex-col text-amber-700'>
       <div className=' text-4xl font-extrabold text-center tracking-widest'>
          十大富豪榜
        </div>
      <div className='text-lg  my-2'>The 10 Richest People in the World</div>
      </div>
      
      <div className='text-white w-10/12 mx-auto relative text-xl'>
        

        <AnimatePresence>
        {
          currentList &&
          currentList.map((item,index)=>{
            if(index < 10)
              return(
                <ListItem
                  color={colorStart.mix(colorEnd, (1 / 10) * index)}
                  key={item.name}
                >
                  <div className='flex justify-between items-center py-3  '>
                    <div className=''>
                      <div className=' w-4 text-sm '><span>No.</span>{index+1}</div>
                      {item.name}
                    </div>
                    <div className='text-4xl w-1/2 text-right'>{item.coin} </div>
                  </div>
                </ListItem>

              )
            

          })
        }
        </AnimatePresence>
        
      </div>
      
      
    </section>
  )
}

export default TopRich