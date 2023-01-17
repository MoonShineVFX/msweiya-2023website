import React,{useEffect,useState,useRef} from 'react'
import {  useRecoilState, useRecoilValue } from 'recoil';
import {  workState } from './atoms/fromTypes'
import {LoadingAnim} from '../Helper/HtmlComponents'
import { useForm } from 'react-hook-form';
//helper
import {updatedGameRankByGameUid,getGameByUid,updateUserCoinByUid,getUserByPhone,getUserByUid} from '../Helper/getfunction'
import { elements } from 'chart.js';
function WatchGame() {
  const work = useRecoilValue(workState);
  const [data , setData] = useState(null)
  const [gameListData , setGameListData] = useState(null)
  const [playerData , setPlayerData] = useState(null)
  const [winnerData , setWinnerData]  = useState(null)
  const [sendCoin, setSendCoin] = useState(0)
  const [ isSuccess , setIsSuccess] = useState(false)
  const userRef = useRef()
  const { register, handleSubmit, watch,setValue,getValues,control,reset, formState: { errors } } = useForm();
  const handleClickRank = () =>{}
  console.log(work.betting[2])
  const onSubmit = (data) => {
    console.log(data)
    let currentData = []
    for(const [index, [key, value]] of Object.entries(Object.entries(data))){
      currentData.push({
        "code_name" : key.slice(-1) ,
        [key.slice(0,-1)]:value,
        "odds": work.betting[value] ? work.betting[value]  : "+0" }
      )
   

    }
    setPlayerData(currentData)
    console.log(playerData)
    updatedGameRankByGameUid(work.uid,currentData,function(res){
      console.log(res)
      getGameByUid(work.uid,function(res){
        setData(res)
        console.log(res)
      })

    })
    // updatedGameRankByGameUid(work.uid,{"code_name" :"A", "ranking" : "9"},function(res){
    //   console.log(res)
    // })
  }
  const rankinglist = [ 
    { "value":'0' , "title":"第一名" },
    { "value":'1' , "title":"第二名" },
    { "value":'2' , "title":"第三名" },
    { "value":'3' , "title":"第四名" },
    { "value":'4' , "title":"第五名" },
    { "value":'5' , "title":"第六名" },
    { "value":'6' , "title":"第七名" },
  ]
  const calcAwardCoin = (bet, betCoin) =>{
    if(playerData !== null){
      const oddData = playerData.filter((element)=>{
        return element.code_name === bet
      })
      if(oddData[0].ranking === 'no'){
        return '輸了'
      }else{
        return (betCoin+ "+" +betCoin + oddData[0].odds +" = ")+  (betCoin+eval( betCoin+oddData[0].odds))
      }
      
    } else{
      return 0
    }
  
    // console.log(bet, betCoin,odds[0].odds)
  }
  const getUserDataAndId = (user_phone)=>{
    getUserByPhone(user_phone,function(res){
     setWinnerData(res)
    })
   
  }
  const sendCoinToUser = (bet, betCoin,userid)=>{
    let sendCoin = 0
    console.log(userid)
    if(playerData !== null){
      const oddData = playerData.filter((element)=>{
        return element.code_name === bet
      })
      sendCoin=(eval(betCoin+betCoin+oddData[0].odds)) 
    }

    getUserByUid(userid,function(res){
      setWinnerData(res)
      console.log(res)
      // upCoin(res,sendCoin)
      let currentdata = {
        "coin" : res.coin + sendCoin
      } 
      console.log(currentdata)
      updateUserCoinByUid(userid,currentdata,function(res){
        console.log(res)
        setIsSuccess(true)
      })
    })
    // let currentdata = {
    //   "coin" : winnerData.coin + sendCoin
    // } 
    // updateUserCoinByUid(winnerData.uid,currentdata,function(res){
    //   console.log(res)
    //   setIsSuccess(true)
    // })
  
  }
  const upCoin = (data,sendCoin)=>{
    
  } 
  useEffect(()=>{
      if(!work) return

      getGameByUid(work.uid,function(res){
        setData(res)
        setGameListData(res.gambles_list)
        console.log(res)
      })

  },[])
  return (
    <section className='bg-white w-full p-5 min-h-screen'>
      <div>{work.title}</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <thead>
            <tr>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>挑戰者</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>設定名次</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>賠率</th>
            </tr>
          </thead>
          
          <tbody className='divide-y divide-slate-200'>

            {
              data ?
              data.player.map((item,index)=>{
                const {code_name,ranking,odds} =item
                return(
                  <tr className=' hover:bg-zinc-200' key={index}>
                    <td className='p-2 text-xs'>{code_name} (指定名次:{rankinglist[ranking]?.title})</td>
                    <td className='p-2 text-xs flex items-center  gap-2'>
                      <select className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " id="ranking" {...register("ranking"+code_name)}
                      >
                        <option key="no" value="no">沒名次</option>
                        {rankinglist.map((item,index)=>{
                          return(
                            <option key={item.value} value={item.value}>{item.title}</option>
                          )
                        })}
                      </select>
                    </td>
                    <td className='p-2 text-xs'> ({odds})</td>
                  </tr>
                )
              }): <LoadingAnim />
            }

            

          </tbody>


        </table>
        <button 
          className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 break-keep '
        >確定名次</button>
        </form>
      </div>
      <div id="table" className='w-full mt-5' >
        <table className="table-auto   border border-slate-200 w-full rounded-md ">
          <thead>
            <tr>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>玩家</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>下注</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>下注籌碼</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>應得獎金</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>發送</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {
              gameListData ?
              gameListData.map((item,index)=>{
                const {user_phone,player_code,pay_coin,userid} =item
                return(
                  <tr className=' hover:bg-zinc-200' key={index}>
                    <td className='p-2 text-xs'>{user_phone} </td>
                    <td className='p-2 text-xs'>{player_code}</td>
                    <td className='p-2 text-xs'>{pay_coin }</td>
                    <td className='p-2 text-xs'>{calcAwardCoin(player_code,pay_coin)}</td>
                    <td className='p-2 text-xs'>
                      {calcAwardCoin(player_code,pay_coin) === '輸了' ?
                        
                        <button className='text-xs  rounded-md bg-zinc-300 text-white py-2 px-6 '>- -</button>
                        :
                        <button 
                          className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                          onClick={() => {
                            sendCoinToUser(player_code,pay_coin,userid)
                          }}
                        >發送</button>
                      }

                      {/* <div>{isSuccess ? '錢錢已發送' : ' '}</div> */}
        


                    </td>
                  </tr>
                )
              }): <LoadingAnim />
            }

          
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default WatchGame