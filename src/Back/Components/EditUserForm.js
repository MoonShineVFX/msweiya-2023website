import React, { useEffect,useState } from 'react'
import { constSelector, useRecoilState, useRecoilValue } from 'recoil';
import { formDisplayState, userState,formStatusState } from '../atoms/fromTypes'
import { useForm } from 'react-hook-form';


function EditUserForm({handleCreateWork , handleEditWork}) {
  const {register, handleSubmit, reset, formState: { errors }} = useForm(
    {defaultValues: { title: ""}});
  
  const onSubmit = (data) => {
    console.log(data)
    if(data.method === 'ADD'){
      handleCreateWork(data)
      
    } else if (data.method === 'EDIT'){
      console.log('EDITTT')
      handleEditWork(user.uid,data)
    }
    
  };
  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const user = useRecoilValue(userState);
  const formStatus = useRecoilValue(formStatusState);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleChange = (e)=>{
    console.log(e.target.value)
  }

  useEffect(()=>{ 
    formStatus === 'EDIT' ? reset(user && user) : reset()

    
  },[])
  return (
    <div className={'w-full h-screen  fixed top-0 left-0 z-20 '}>
      <div className=' opacity-30 fixed inset-0 bg-black ' onClick={handleClose}></div>
      <div className=' relative w-4/5 bg-white mx-auto my-10 p-5 overflow-auto '>
        <div className='text-xl text-center font-bold'>{formStatus === 'ADD' ? '新增玩家' : '編輯玩家'}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className='flex gap-4'>
            <div className='main w-1/2'>
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">玩家名稱</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  id="exampleURL0"
                  placeholder="玩家名稱"
                  {...register('name')}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">積分籌碼</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  id="exampleURL0"
                  placeholder="單項上限"
                  {...register('coin')}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="multiple_choice" className="form-label inline-block mb-2 text-gray-700">
                  身份別 
                  </label>
                
                  <div className="flex items-center mb-4">
                      <input  id="default-radio-1" type="radio" value="adminer"  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...register("permission")}/>
                      <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">銀行/管理員</label>
                  </div>
                  <div className="flex items-center">
                      <input  id="default-radio-2" type="radio" value="player"  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  {...register("permission")}/>
                      <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">玩家</label>
                  </div>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">
                  前台顯示 
                  </label>
                
                  <div className="flex items-center mb-4">
                      <input  id="default-radio-3" type="radio" value="1" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...register("display")}/>
                      <label htmlFor="default-radio-3" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">顯示此局</label>
                  </div>
                  <div className="flex items-center">
                      <input  id="default-radio-4" type="radio" value="0" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  {...register("display")}/>
                      <label htmlFor="default-radio-4" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">不顯示此局</label>
                  </div>
              </div>

              
            </div>

          </div>
          
         
          
          <div>
            {
              formStatus === 'EDIT' ? 
              <button type="submit" className="py-2 px-4 bg-black text-white  rounded-md" >
                儲存編輯<input type="hidden" value="EDIT"  {...register('method')}/></button>
              :
              <button type="submit" className="py-2 px-4 bg-black text-white  rounded-md" >
                新增作品<input type="hidden" value="ADD"  {...register('method')}/></button>
            }
            <div className='text-xs inline-block ml-3' >縮圖請建立作品後再上傳</div>
          </div>
        
        </form>
      </div>
    </div>
  )
}

export default EditUserForm