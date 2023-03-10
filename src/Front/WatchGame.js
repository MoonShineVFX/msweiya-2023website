import React,{useEffect,useState} from 'react'
import { useParams, Link } from 'react-router-dom';
import { getGameByUid,updatedGameBetsByGameUid,updateUserCoinByUid,updateGameUserHavePlay} from '../Helper/getfunction'
import PlusMinusInput from './Components/PlusMinusInput';
import UserInfo from './Components/UserInfo';
import {useOutletContext} from 'react-router-dom'
import { useForm,useWatch } from 'react-hook-form';
import { FaFlagCheckered } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameState } from './Components/atoms/fromTypes';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
function WatchGame() {
  const user_phone = window.localStorage.getItem('phone')
  const singleGame = useRecoilValue(gameState);
  const [ betSuccess, setBetSuccess] = useState('')
  const [ getPaySuccess, setGetPaySuccess] = useState('')
  const {gameuid} = useParams();
  const {userData} = useOutletContext()
  const [gameData , setGameData] = useState(null)
  const [currentUserBet , setCurrentUserBet] = useState(0)
  const [isCanBet , setIsCanBet] = useState(false)
  const { register, handleSubmit, watch,setValue,getValues,control,reset, formState: { errors } } = useForm({ defaultValues:{
    pay_moneyA:0,
    pay_moneyB:0,
    pay_moneyC:0,
    pay_moneyD:0,
    pay_moneyE:0,
    pay_moneyF:0,
    pay_moneyG:0,
    pay_moneyH:0,
  }});

  const onSubmit = (data) => {
    console.log(userData)
    console.log(data)

    let itemValues =  Object.values(data) 
    let itemReduse = itemValues.reduce((a,b) => parseInt(a)  + parseInt(b) )
    if(itemReduse > userData.coin) {
      stopPlay('超過你的本金，不能下注喔')
      return
    }
    // confirmBet('下好離手，起手無回')
    let currentData = []
    for(const [index, [key, value]] of Object.entries(Object.entries(data))){
      console.log(key, value)
        currentData.push({
          "pay_coin" : parseInt(value)  ,
          "player_code":key.slice(-1),
          "user_phone":userData.phone,
          "userid": userData.uid,
        })
    }
    console.log(currentData)
    confirmAlert({
      title: '下好離手，起手無回',
      buttons: [
        {
          label: '確定',
          onClick: () => {
            currentData.map((item,index)=>{
              if(item.pay_coin > 0){
                updatedGameBetsByGameUid(gameuid,item,function(res){
                  console.log(res)
                  setBetSuccess('已經下注成功')
                })
              }
            })
            let payCoindata = {
              "coin" : userData.coin - itemReduse
            } 
            updateUserCoinByUid(userData.uid,payCoindata,function(res){
              console.log(res)
              setGetPaySuccess('已經扣款成功')
            })
            updateGameUserHavePlay(gameuid,userData.phone,function(res){
              console.log(res)
            })
          }
        },
        {
          label: '取消',
          onClick: ()=>{
            currentData = []
          }
        }
      ]
    });
    
    
    
  }
  const stopPlay = (msg) =>{
    confirmAlert({
      title: msg,
      buttons: [
        {
          label: '確定',
        }
      ]
    });
  }
  const confirmBet = (msg)=>{
    confirmAlert({
      title: msg,
      buttons: [
        {
          label: '確定',
        },
        {
          label: '取消',
        }
      ]
    });
  }
  

  //暫時沒用到
  const handleInputClick = (items) => {
    //需要拆出單項 再記錄到下注單
    let currentData = {
      "user_phone": user_phone,
      "pay_coin": items.pay_money,
      "player_code" :  items.player
    }
    console.log(currentData)
    updatedGameBetsByGameUid(gameuid,currentData,function(res){
      console.log(res)
    })
    let payCoindata = {
      "coin" : userData.coin - items.pay_money
    } 
    updateUserCoinByUid(userData.uid,payCoindata,function(res){
      console.log(res)
    })

  }
  const checkBetCoinLimit = (item) =>{
    const itemValues =  Object.values(item) 
    const itemReduse = itemValues.reduce((a,b) => parseInt(a)  + parseInt(b) )

    if(!itemReduse ){
      return
    } else if(itemReduse > singleGame.pay_limit){
      console.log('超過下注限制金額')
      setIsCanBet(false)
    } else{
      setIsCanBet(true)
      setCurrentUserBet(itemReduse)
      
    }
    
  }
  
  const handleChange = (e,code_name) => {
    let value = e.target.value
    let code_group = ["A","B","C","D","E","F","G"]
    code_group.splice(code_group.indexOf(code_name),1)
    // console.log(new_group)
    if(singleGame.multiple_choice === "0"){
      console.log('這是單選題')
      const obj = {};
      code_group.forEach((item)=>{
        obj['pay_money'+item] = 0;
      })
      reset(obj)

      if(value > singleGame.pay_limit){
        setValue("pay_money"+code_name, singleGame.pay_limit)
      } else if (value < 0) {
        setValue("pay_money"+code_name, 0)
      }

    }
    else{
      if(value > singleGame.pay_limit){
        setValue("pay_money"+code_name, singleGame.pay_limit)
      } else if (value < 0) {
        setValue("pay_money"+code_name, 0)
      }
    }


    
  }

  useEffect(()=>{
      if(!gameuid) return

      getGameByUid(gameuid,function(res){
        setGameData(res)
        console.log(res)
      })
      // const watchAll = watch((value, { name, type }) => {

      //     if(checkBetCoinLimit){
      //       checkBetCoinLimit(value)
      //     }
      // });
      // return () => watchAll.unsubscribe();


  },[])

  return (
    <div className='text-white w-11/12 mx-auto my-4'>
      <UserInfo userData={userData}/>
      {
        gameData &&
        
        <div>
          <div className='flex flex-col justify-between my-4 items-center border-b border-zinc-500 pb-2'>
            <div 
            className='bg-clip-text text-transparent bg-gradient-to-b from-amber-100 to-amber-600 font-bold text-xl' 
            >{gameData.title}</div>
            <div className='text-sm text-amber-100'>{gameData.multiple_choice === "1" ?  " 可分散下注" : " 單選下注"}</div>
            
          </div>


          <div className='text-center'>
            <div>
              <div className='text-xl font-extrabold'>下注區</div> 
              <div className='text-zinc-400'>謹慎博弈 小賭怡情 大賭傷身 </div>
              <div className='text-rose-500'>
                <div>{betSuccess} {getPaySuccess}</div>
              </div>

            </div>
            <div className='flex text-sm gap-5 mt-3  justify-center'>
              <div className='flex'> 現在{gameData.enable ==="1"? <div className='text-green-500'> 可下注</div> : <div className='text-rose-600'> 停止下注</div>}</div>
              <div>單項下注上限 {gameData.pay_limit} 籌碼</div>
              {/* <div>你已下注 {currentUserBet} 籌碼</div> */}
            </div>
            { isCanBet && <div className='text-rose-300 text-sm my-2'>拍謝，再點就超過超過下注限制了唷</div>}
            <div className='p-5 rounded-lg border-2 my-4'>
              <form onSubmit={handleSubmit(onSubmit)} >
              {
                gameData.player.map((item,index)=>{
                  return(
                     <div className=' text-sm  my-4 ' key={'input'+item.code_name}>
                       <div className='flex gap-2 items-center justify-center'>
                        <label htmlFor={'pay_money'+item.code_name} className="flex flex-col pr-3 items-start" >
                          <span className='text-xs text-zinc-300'>挑戰者</span> 
                          <div className='flex items-center'>
                            <FaFlagCheckered className='mr-2' size="12"  color="#e5b849"/> 
                            <span className='text-lg'> {item.code_name}</span>
                          </div>
                          
                        
                        </label>
                       
                        <div className='flex '>

                          <input type="number" 
                            className=" shadow appearance-none border rounded-l-md text-right text-zinc-800 bg-gray-200 py-1  text-lg w-40" 
                            min="0" 
                            
                            {...register('pay_money'+item.code_name )}
                            onChange={(e)=> {handleChange(e,item.code_name)}}
                            
                          />
                          <div className='text-zinc-600 text-xs flex items-center break-keep px-2 bg-gray-200'>籌 碼</div>
                          <input type="button" value="-" className=' w-8 bg-zinc-300 text-zinc-600  text-lg' 
                            onClick={()=>{
                              const values = getValues("pay_money"+item.code_name)
                              let code_group = ["A","B","C","D","E","F","G"]
                              if(singleGame.multiple_choice === "0"){
                                console.log('這是單選題')
                                const obj = {};
                                code_group.forEach((item)=>{
                                  obj['pay_money'+item] = 0;
                                })
                                reset(obj)
                              }
                              if(values !== 0 ){
                                setValue("pay_money"+item.code_name, parseInt(values)-1)
                                
                              }else{
                                setValue("pay_money"+item.code_name, 0)
                              }
                            }}
                          />
                          <input type="button" value="+" className=' w-8 bg-zinc-300 text-zinc-600 rounded-r-md text-lg border-l border-zinc-500' 
                            onClick={()=>{
                              const values = getValues("pay_money"+item.code_name)
                              let code_group = ["A","B","C","D","E","F","G"]
                              if(singleGame.multiple_choice === "0"){
                                console.log('這是單選題')
                                const obj = {};
                                code_group.forEach((item)=>{
                                  obj['pay_money'+item] = 0;
                                })
                                reset(obj)
                              }
                              if(values >singleGame.pay_limit-1){
                                setValue("pay_money"+item.code_name, singleGame.pay_limit)
                              }else{
                                setValue("pay_money"+item.code_name, parseInt(values)+1)
                              }
                             
                              
                              
                            }}
                          />
                          
                        </div>
                       
                       </div>
                       <div className='border-b border-dotted border-zinc-500 w-1/2 mx-auto my-4'></div>
                        
                        
                        
                     </div>
                     
                  
                     
                   
                  )
                })

              }
              
              <div>
                <button type="submit" 
                className="py-1 px-2 text-white w-1/2 rounded-md text-base tracking-wider my-3 "
                style={{background: `linear-gradient(to top, #574a00 0%, #e5a533 100%)`}} >
                        下好離手
                </button>
                <div className='text-xs text-zinc-200'>要確耶</div>
              </div>

             </form>
            </div>

          </div>
        </div>


        
        
      }
    </div>
  )
}

export default WatchGame