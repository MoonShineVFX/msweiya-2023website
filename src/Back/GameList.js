import React,{useState,useEffect} from 'react'
import {LoadingAnim} from '../Helper/HtmlComponents'
import { useRecoilState } from 'recoil';
import { formDisplayState,formStatusState,workState } from './atoms/fromTypes';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//components
import EditGameForm from './Components/EditGameForm';
//helper
import {getAllGameForBank,updatedGameByGameUid} from '../Helper/getfunction'
function GameList() {
  const [gameListData, setGameListData] = useState([]);
  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const [formStatus, setFormStatus] = useRecoilState(formStatusState);
  const [singleGame, setSingleGame] = useRecoilState(workState);
  const onDelete = (uid)=>{
    confirmAlert({
      title: '確認刪除這筆資料',
      buttons: [
        {
          label: '確定',
          // onClick: () =>  deleteWork(uid,function(res){
          //   fetchWorkDoneFun('刪除資料失敗，錯誤訊息:',res)
          // })
        },
        {
          label: '取消',
        }
      ]
    });
  }
  const handleCreateWork = (data) =>{
    console.log('目前沒有這個功能')
  }
  const handleEditWork = (uid,data) =>{
    console.log(uid,data)
    let currentData ={
      "title": data.title,
      "multiple_choice":data.multiple_choice,
      "display":data.display,
      "enable":data.enable ,
    }

    updatedGameByGameUid(uid,currentData,function(res){
      console.log(res)
      fetchWorkDoneFun('編輯資料失敗，錯誤訊息:',res)

    })


  }
  const fetchWorkDoneFun = (customStr, res)=>{
    setShowModal(false)
    if(res === 'success'){
      getAllGameForBank((res)=>{
        setGameListData(res)
      })
    }else{
      showErrorAlert(customStr,res)
    }
  }
  const showErrorAlert = (str,res) =>{
    confirmAlert({
      title: str+ res,
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
  useEffect(()=>{
    getAllGameForBank((res)=>{
      setGameListData(res)
    })


  },[])
  return (
    <section className='bg-white w-full p-5 min-h-screen'>
      <h1>遊戲清單</h1>
      <div id="table" className='w-full mt-5' >
        <table className="table-auto   border border-slate-200 w-full rounded-md ">
          <thead>
            <tr>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>遊戲名稱</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>單項籌碼上限</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>單選複選</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>前台顯示</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>賽局狀態</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>編輯</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {
              gameListData ?
              gameListData.map((item,index)=>{
                const {uid,title,pay_limit,multiple_choice,u_title, display,enable,special_rule} =item
                return(
                  <tr className=' hover:bg-zinc-200' key={uid}>
                    <td className='p-2 text-xs'>{title} </td>
                    <td className='p-2 text-xs'>{pay_limit}</td>
                    <td className='p-2 text-xs'>{multiple_choice ==='1' ? '可分散多選' : '單選下注'}</td>
                    <td className='p-2 text-xs'>{display === '1' ? <span className='text-green-700'>顯示</span> : <span className='text-rose-700'>不顯示</span>}</td>
                    <td className='p-2 text-xs'>{enable === '1' ?  <span className='text-green-700'>現在可下注</span>: <span className='text-rose-700'>現在不可下注</span> }</td>
                    <td className='p-2 text-xs'>
                      <button 
                      className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                      onClick={() => {
                        setShowModal(true);
                        setSingleGame(item)
                        setFormStatus('EDIT')
                      }}>編輯</button>
                      <button 
                      className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                      onClick={()=> {onDelete(uid)}}>刪除</button>

                    </td>
                  </tr>
                )
              }): <LoadingAnim />
            }

          
          </tbody>
        </table>
      </div>
      {showModal && <EditGameForm  handleCreateWork={handleCreateWork} handleEditWork={handleEditWork} />}
    </section>
  )
}

export default GameList