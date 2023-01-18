import React,{useEffect, useRef,useState} from 'react'
import AwwardCard from './AwwardCard'
import {Link} from 'react-scroll'
//helper
import {getAllUsersForRich,getAllUsersRealTime} from '../Helper/getfunction'
function Awwward() {
  const [currentList, setCurrentList] = useState(null)
  const [groupData, seGroupData] = useState(null)

  const fetchData = ()=>{
    getAllUsersForRich((res)=>{
      const sortData = res.sort((a,b)=> b.coin - a.coin)
      setCurrentList(sortData)
    })
    
  }
  const joinPlayer = [
    {name:"陳映璇"}, 
    {name:"宋書瑜"}, 
    {name:"王昱涵"}, 
    {name:"李浚瑋"}, 
    {name:"李鼎昱"}, 
    {name:"李佳霖"}, 
    {name:"張瀚文"}, 
    {name:"李易儒"}, 
    {name:"石仲豪"}, 
    {name:"蘇子涵"}, 
    {name:"王伊屏"}, 
    {name:"黃思豪"}, 
    {name:"陳傳融"},
    {name:"吳品興"}, 
  ]
  const getAllLevelData = ()=>{
    let newArray = []
    const level01 = currentList.slice(0,5)
    const level02 = currentList.slice(6,16)
    const level03 = currentList.slice(17,32)
    const level04 = currentList.slice(33,53)
    const level05 = currentList.slice(54,79)
    const level06 = currentList.slice(80,110)
    const level07 = currentList.slice(111,146)
    const level08 = currentList.slice(147,198)
    const level09 = currentList.slice(199,213)
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
  const awardData=[
    {level:"尊爵榮譽",  bounty:30000,   quota:5  ,bgimage:"bg01.jpeg"},
    {level:"白金榮耀",  bounty:20000,   quota:10 ,bgimage:"bg02.jpeg"},
    {level:"金鑽精英",  bounty:10000,   quota:15 ,bgimage:"bg03.jpeg"},
    {level:"銀級幹部",  bounty:5000,    quota:20 ,bgimage:"bg04.jpeg"},
    {level:"三級黨員",  bounty:4000,    quota:25 ,bgimage:"bg05.jpeg"},
    {level:"二級黨員",  bounty:3000,    quota:30 ,bgimage:"bg06.jpeg"},
    {level:"一級黨員",  bounty:2000,    quota:35 ,bgimage:"bg07.jpeg"},
    {level:"走路工",    bounty:1000,    quota:51 ,bgimage:"bg08.jpeg"},
    {level:"參加獎",      bounty:1000,    quota:14 ,bgimage:"bg09.jpeg"}
  ]
  useEffect(()=>{

      fetchData()

  },[])
  console.log(currentList)
  return (
    <div className=''>
      <div className='flex gap-2 text-white fixed z-50 left-50'>
       {
        awardData.map((item,index)=>{
          return(
            <Link to={"section"+index} spy={true} smooth={true}><div className='border px-1 py-1 cursor-pointer' >{item.level}</div></Link>
          )
        })
       }
       <div className='border px-1 py-1' onClick={getAllLevelData}>計算業績</div>
      </div>
      <div className=' relative  w-10/12  mx-auto flex flex-col '>
        {awardData.map((item,index)=>{
          return(
            <AwwardCard  key={index} data={item} index={index} groupData={groupData} />


          )

          
      

        })
      }
        
      </div>
    </div>
  )
}

export default Awwward