import React, { useState } from 'react'

function AwwardCard2({data,index,groupData}) {
  const [active,setActive] = useState(false)
  const [secondActive,setSecondActive] = useState(false)
  return (
    <div className=' relative  w-auto h-screen my-1 flex justify-center items-center'  id={'section'+index}>
      <div className='relative  h-4/6  bg-rose-200 cursor-pointer' >
        <div 
          id="top" 
          className={'card-5 bg-white absolute h-full aspect-[8/12] rounded-md bg-cover bg-no-repeat bg-center z-10 left-[50%] transition-all duration-700 ' + (active ? ' -translate-x-[110%] -translate-y-[10%] -rotate-12 ' : '  -translate-x-[50%]')}
          style={{backgroundImage : `url(${process.env.PUBLIC_URL+'/images/'+ data.bgimage})`}}
          onClick={()=>setActive(!active)}
        > 
          
          <div 
            className='text-white text-[4rem] w-full text-center font-bold absolute tracking-wider -top-[10%] left-[50%] -translate-x-[50%]  text6'
            
          >{data.level}</div>
        </div>
        <div 
          id="bottom"
          className={'bg--100 absolute p-6 h-full aspect-[8/12] rounded-md  bg-cover bg-no-repeat bg-center z-0 left-[50%]   transition-all '+ (active ? ' -translate-x-[15%] ' : '  -translate-x-[49%]  translate-y-[2%]')}
          style={{background:`radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
          radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)`}}
          onClick={()=>setSecondActive(!secondActive)}
        >
          <div className='border h-full rounded-md border-zinc-600 border-dashed  text-black flex justify-center items-center  flex-wrap px-4 overflow-hidden overflow-y-auto'>
            <div className={'  mx-auto flex flex-wrap transition-all duration-1000' + (secondActive ? '  opacity-100 ' : '   opacity-0')}>
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

export default AwwardCard2