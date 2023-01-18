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
          className={'bg--100 absolute p-8 h-full aspect-[10/8] rounded-md  bg-cover bg-no-repeat bg-center z-0 left-[50%]   transition-all '+ (active ? ' -translate-x-[15%] ' : '  -translate-x-[49%]  translate-y-[2%]')}
          style={{background:`radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
          radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)`}}
        >
          <div className='border-2 h-full rounded-md border-amber-300 text-black flex justify-center items-center gap-3 flex-wrap px-4 overflow-hidden overflow-y-auto'>
            <div className='  mx-auto flex flex-wrap'>
              {
                groupData&&
                groupData[index].map((item,index)=>{
                  return(
                    <div key={'user'+index} className="text-3xl break-keep font-bold text-white  drop-shadow-xl p-1">{item.name}</div>
                  )
                })
              }
            </div>


          </div>
        </div>
      </div>

    </div>
  )
}

export default AwwardCard