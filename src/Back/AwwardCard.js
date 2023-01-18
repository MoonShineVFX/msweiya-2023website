import React, { useState } from 'react'

function AwwardCard({data,index,groupData}) {
  const [active,setActive] = useState(false)
  return (
    <div className=' relative  flex '  id={'section'+index}>
      <div className="">
        <div id="top" className={' bg-white  rounded-md   transition-all duration-700 '} >           
          <div className=' text-lg font-extrabold border p-2 bg-zinc-300 '>{data.level}  {data.quota}名 每人{data.bounty} </div>
        </div>
        <div 
          id="bottom"
          className={'bg-white  bg-cover bg-no-repeat bg-center z-0   transition-all '}
        >
          <div className='rounded-md border-zinc-400 text-black  gap-3  grid grid-cols-5 mt-2'>
            {
              groupData&&
              groupData[index].map((item,index)=>{
                return(
                  <div key={'user'+index} className="text-2xl break-keep">{item.name}</div>
                )
              })
            }

          </div>
        </div>
      </div>

    </div>
  )
}

export default AwwardCard