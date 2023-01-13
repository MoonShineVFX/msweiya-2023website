import React,{useEffect,useState} from 'react'
import { useParams, Link } from 'react-router-dom';
import { getGameByGameUid} from '../Helper/getfunction'
function WatchChart() {
  const [gameData , setGameData] = useState(null)
  const {gameuid} = useParams();
  const [totalData , setTotalData] = useState(null)
  
  const first = (data)=>{
    var total = []
    let nameContainer = {}
    data.gambles_list.forEach(element => {
      nameContainer[element.player_code] = nameContainer[element.player_code] || []
      nameContainer[element.player_code].push(element)
    });
    console.log(nameContainer)
    const playerCode = Object.keys(nameContainer)
    playerCode.forEach(nameItem=>{
      let count =0
      nameContainer[nameItem].forEach(item=>{
        count += item.pay_coin
      })
      total.push({'player': nameItem , 'total': count})
    })
    setTotalData(total)
  }

  useEffect(()=>{
    if(!gameuid) return

    getGameByGameUid(gameuid,function(res){
      setGameData(res)
      console.log(res)
      first(res)
    })
  },[])
  return (
    <div className='text-white  w-10/12 mx-auto my-10'>
      <div className='text-center'>
          <div className='bg-clip-text text-transparent bg-gradient-to-b from-amber-100 to-amber-600 font-bold text-2xl' >{gameData.title}</div>
          <div className='text-xl font-extrabold'>即時下注回饋圖</div> 
          <div className='text-zinc-400'>有點即時 又不太即時 </div>
        </div>
      <div className='text-white flex gap-1 justify-between items-end h-[80vh]'>

      {
        totalData &&
        totalData.map((item,index)=>{
          return(
            <div key={'list'+index}  className='flex flex-col items-center justify-center  text-center'>
              <div>
                <div
                  className='bg-zinc-200 text-rose-600 transition-all' 
                  style={{
                    "height" : item.total*2+'px', 
                    "width" : "30px"
                    }}>
                      {item.total}
                </div>
                <div className='mt-3 text-lg'>{item.player}</div>
              </div>
            </div>
          )
        })
      }
    </div>
    </div>
  )
}

export default WatchChart