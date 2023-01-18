import React, { useState } from 'react'

function AwwardCard2({data,index,groupData}) {
  const [active,setActive] = useState(false)
  const [secondActive,setSecondActive] = useState(false)
  const thousand = val =>{
    if(!val) return
    let str = val + ''
    return str.replace(/\d{1,3}(?=(\d{3})+(\. \d*)?$)/g, '$&,')
  }
   return (
    <div className=' relative  w-auto h-screen my-1 flex justify-center items-center'  id={'section'+index}>
      <div className='relative  h-4/6  bg-rose-200 cursor-pointer' >
        <div 
          id="top" 
          className={'card-5 hover:brightness-150 hover:shadow-[0_35px_60px_15px_rgba(255,255,255,0.3)] bg-white absolute h-full aspect-[8/12] rounded-md bg-cover bg-no-repeat bg-center z-10 left-[50%] transition-all duration-700 ' + (active ? ' -translate-x-[110%] -translate-y-[10%] -rotate-12 ' : '  -translate-x-[50%]')}
          style={{backgroundImage : `url(${process.env.PUBLIC_URL+'/images/'+ data.bgimage})`}}
          onClick={()=>setActive(!active)}
        > 
          
          <div 
            className='text-white text-[4rem] w-full text-center font-bold absolute tracking-wider -top-[10%] left-[50%] -translate-x-[50%]  text6'
            
          >{data.level}</div>
        </div>
        <div 
          id="bottom"
          className={'bg--100 absolute py-8 px-6 h-full aspect-[8/12] rounded-md  bg-cover bg-no-repeat bg-center z-0 left-[50%]   transition-all duration-700 '+ (active ? ' -translate-x-[15%] ' : '  -translate-x-[48%]  translate-y-[1%]')}
          style={{background:`radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
          radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)`}}
          onClick={()=>setSecondActive(!secondActive)}
        >
          <div className='border h-full rounded-md border-zinc-600 border-dashed  text-black flex justify-center items-center  flex-wrap px-4 overflow-hidden overflow-y-auto'>
            
            <div className={'  mx-auto flex flex-col transition-all duration-1000 justify-start items-center h-full' + (secondActive ? '  opacity-100 ' : '   opacity-0')}>
              <div className='   font-bold text-white drop-shadow-xl my-4'>
                <div className='text-base'>每人獎金</div>
                <div className='text-4xl font-extrabold'>{thousand(data.bounty)} 元</div> 
              </div>
              <div className=' grid grid-cols-3 '>
                {
                  groupData&&
                  groupData[index].map((item,index)=>{
                    return(
                      <div key={'user'+index} className="text-3xl break-keep font-bold text-white  drop-shadow-xl p-1 relative">
                        <div className='text-right'> {item.name}</div>
                        <div className='text-xs font-thin text-zinc-600 text-right -mb-2 '>{item.coin} coin</div>
                      </div>
                    )
                  })
                }
              </div>

            </div>


          </div>
        </div>
      </div>

    </div>
  )
}

export default AwwardCard2