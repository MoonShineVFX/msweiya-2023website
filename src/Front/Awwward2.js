import React,{useEffect,useState} from 'react'
import AwwardCard2 from './AwwardCard2'
import {Link} from 'react-scroll'
import { joinPlayer,awardData2} from '../Helper/playerItems'
//helper
import {getAllUsersForRich,getAllUsersRealTime} from '../Helper/getfunction'
function Awwward2() {
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
    const level02 = sortData.slice(6,16)
    const level03 = sortData.slice(17,32)
    const level04 = sortData.slice(33,53)
    const level05 = sortData.slice(54,79)
    const level06 = sortData.slice(80,110)
    const level07 = sortData.slice(111,146)
    const level08 = sortData.slice(147,198)
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
  //  setLevel1(level01)
  //  setLevel2(level02)
  //  setLevel3(level03)
  //  setLevel4(level04)
  //  setLevel5(level05)
  //  setLevel6(level06)
  //  setLevel7(level07)
  //  setLevel8(level08)
  //  setLevel9(level09)
    
  }

  useEffect(()=>{
      fetchData()
  },[])
  console.log(currentList)
  return (
    <div className=''>
      <div className='flex gap-2 text-white fixed z-50 left-50'>
       {
        awardData2.map((item,index)=>{
          return(
            <Link to={"section"+index} spy={true} smooth={true}><div className='border px-1 py-1 cursor-pointer' >{item.level}</div></Link>
          )
        })
       }
       <div className='border px-1 py-1' onClick={fetchData}>刷新計算業績</div>
      </div>
      <div className=' relative  w-10/12  mx-auto flex flex-col '>
        {awardData2.map((item,index)=>{
          return(
            <AwwardCard2  key={index} data={item} index={index} groupData={groupData} />


          )

          
      

        })
      }
        
      </div>
    </div>
  )
}

export default Awwward2