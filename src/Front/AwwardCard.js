import React, { useState } from 'react'

function AwwardCard({data,index,groupData}) {
  const [active,setActive] = useState(false)
  return (
    <div className=' relative  w-auto h-screen my-1 flex justify-center items-center'  id={'section'+index}>
      <div className='relative  h-3/6  bg-rose-200 cursor-pointer' onClick={()=>setActive(!active)}>
        <div 
          id="top" 
          className={'card-5 bg-white absolute h-full aspect-[10/8] rounded-md bg-cover bg-no-repeat bg-center z-10 left-[50%] transition-all duration-700 ' + (active ? ' -translate-x-[110%] -translate-y-[10%] -rotate-12 ' : '  -translate-x-[50%]')}
          style={{backgroundImage : `url(${process.env.PUBLIC_URL+'/images/'+ data.bgimage})`}}
        > 
          
          <div className='text-white text-[7rem] w-full text-center font-extrabold absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text6'>{data.level}</div>
        </div>
        <div 
          id="bottom"
          className={'bg-white absolute p-12 h-full aspect-[10/8] rounded-md  bg-cover bg-no-repeat bg-center z-0 left-[50%]   transition-all '+ (active ? ' -translate-x-[20%] ' : '  -translate-x-[50%]')}
        >
          <div className='border-2 h-full rounded-md border-zinc-400 text-black flex justify-center items-center gap-3 flex-wrap px-4 overflow-hidden overflow-y-auto'>
            {
              groupData&&
              groupData[index].map((item,index)=>{
                return(
                  <div key={'user'+index} className="text-3xl break-keep">{item.name}</div>
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