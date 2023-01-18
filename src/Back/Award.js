import React,{useEffect,useState}  from 'react'
import {getAllUsersForRich,getAllUsersRealTime} from '../Helper/getfunction'
import { joinPlayer,awardData} from '../Helper/playerItems'
import AwwardCard from './AwwardCard'
function Award() {
  const [currentList, setCurrentList] = useState(null)
  const [groupData, seGroupData] = useState(null)

    const fetchData = ()=>{
      getAllUsersForRich((res)=>{
        const sortData = res.sort((a,b)=> b.coin - a.coin)
        setCurrentList(sortData)
        getAllLevelData(sortData)
      })
    }
    const getAllLevelData = (sortData)=>{
      let newArray = []
      const level01 = sortData.slice(0,5)
      const level02 = sortData.slice(5,15)
      const level03 = sortData.slice(15,30)
      const level04 = sortData.slice(30,50)
      const level05 = sortData.slice(50,75)
      const level06 = sortData.slice(75,105)
      const level07 = sortData.slice(105,140)
      const level08 = sortData.slice(140,191)
      const level09 = sortData.slice(199,213)
      newArray.push(level01)
      newArray.push(level02)
      newArray.push(level03)
      newArray.push(level04)
      newArray.push(level05)
      newArray.push(level06)
      newArray.push(level07)
      newArray.push(level08)
      newArray.push(joinPlayer)
      console.log(newArray)
      seGroupData(newArray)

    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <section className='bg-white w-full p-5 min-h-screen'>
      <div className='flex items-center gap-3'>
        
        <div className='border p-3 bg-slate-300 rounded-md hover:bg-slate-400 cursor-pointer' onClick={fetchData}>刷新排名</div>
        <div>前台網址 https://web-msweiya2023.web.app/#/award</div> 
      </div>

      <div className=' relative  mx-auto grid grid-cols-2 gap-5 my-4'>
        {
        currentList&&
          awardData.map((item,index)=>{
          return(
            <AwwardCard  key={index} data={item} index={index} groupData={groupData} />


          )

          
      

        })
      }
        
      </div>

    </section>
  )
}

export default Award