import React,{useState,useEffect} from 'react'
import {LoadingAnim} from '../Helper/HtmlComponents'
import { useRecoilState } from 'recoil';
import { formDisplayState,formStatusState,userState } from './atoms/fromTypes';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//helper
import {getAllUsers} from '../Helper/getfunction'

function Home() {
  const [usersData, setUsersData] = useState([]);
  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const [formStatus, setFormStatus] = useRecoilState(formStatusState);
  const [singleUser, setSingleUser] = useRecoilState(userState);
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
  useEffect(()=>{
    getAllUsers((res)=>{
      setUsersData(res)
    })


  },[])
  return (
    <section className='bg-white w-full p-5'>
      <h1>使用者清單</h1>
      <div id="table" className='w-full mt-5' >
        <table className="table-auto   border border-slate-200 w-full rounded-md ">
          <thead>
            <tr>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>首次登入</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>玩家名</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>手機號碼</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>積分點</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>得獎現金</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>狀態</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>編輯</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {
              usersData ?
              usersData.map((item,index)=>{
                const {uid,coin, display, name, phone,enable,real_money,first_Login} =item
                return(
                  <tr className=' hover:bg-zinc-200' key={uid}>
                    <td className='p-2 text-xs'>{first_Login === '1' ? '已加入' : '這人還沒登入過'}</td>
                    <td className='p-2 text-xs'>{name}</td>
                    <td className='p-2 text-xs'>{phone}</td>
                    <td className='p-2 text-xs'>{coin}</td>
                    <td className='p-2 text-xs'>{real_money}</td>
                    <td className='p-2 text-xs'>{display === '1' ? '顯示' : '不顯示'}</td>
                    <td className='p-2 text-xs'>
                      <button 
                      className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                      onClick={() => {
                        setShowModal(true);
                        setSingleUser(item)
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
    </section>
  )
}

export default Home