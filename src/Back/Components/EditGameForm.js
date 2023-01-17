import React, { useEffect,useState } from 'react'
import { constSelector, useRecoilState, useRecoilValue } from 'recoil';
import { formDisplayState, workState,formStatusState } from '../atoms/fromTypes'
import { useForm } from 'react-hook-form';


function EditGameForm({handleCreateWork , handleEditWork}) {
  const {register, handleSubmit, reset, formState: { errors }} = useForm(
    {defaultValues: { title: ""}});
  
  const onSubmit = (data) => {
    console.log(data)
    if(data.method === 'ADD'){
      handleCreateWork(data)
      
    } else if (data.method === 'EDIT'){
      console.log('EDITTT')
      handleEditWork(work.uid,data)
    }
    
  };
  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const work = useRecoilValue(workState);
  const formStatus = useRecoilValue(formStatusState);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleChange = (e)=>{
    console.log(e.target.value)
  }

  useEffect(()=>{ 
    formStatus === 'EDIT' ? reset(work && work) : reset()

    
  },[])
  return (
    <div className={'w-full h-screen  absolute top-0 left-0 z-20 '}>
      <div className=' opacity-30 fixed inset-0 bg-black ' onClick={handleClose}></div>
      <div className=' relative w-4/5 bg-white mx-auto my-10 p-5 overflow-auto '>
        <div className='text-xl text-center font-bold'>{formStatus === 'ADD' ? '新增作品' : '編輯作品'}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className='flex gap-4'>
            <div className='main w-1/2'>
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">遊戲名稱</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  id="exampleURL0"
                  placeholder="遊戲名稱"
                  {...register('title')}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">單項上限</label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  id="exampleURL0"
                  placeholder="單項上限"
                  {...register('pay_limit')}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="multiple_choice" className="form-label inline-block mb-2 text-gray-700">
                  單選複選 
                  </label>
                
                  <div className="flex items-center mb-4">
                      <input  id="default-radio-1" type="radio" value="1"  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...register("multiple_choice")}/>
                      <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">分散下注</label>
                  </div>
                  <div className="flex items-center">
                      <input  id="default-radio-2" type="radio" value="0"  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  {...register("multiple_choice")}/>
                      <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">單選下注</label>
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
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">
                  賽局狀態 
                  </label>
                
                  <div className="flex items-center mb-4">
                      <input  id="default-radio-5" type="radio" value="1" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...register("enable")}/>
                      <label htmlFor="default-radio-5" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">現在可以下注</label>
                  </div>
                  <div className="flex items-center">
                      <input  id="default-radio-6" type="radio" value="0" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  {...register("enable")}/>
                      <label htmlFor="default-radio-6" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">現在不可以下注</label>
                  </div>
              </div>

              
            </div>
            <div className='left w-1/2'>
              <div className="mb-3">
                <label htmlFor="exampleURL0" className="form-label inline-block mb-2 text-gray-700">Credit</label>
                <textarea
                  rows="6"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  placeholder="Credit"
                  {...register('special_rule')}
                ></textarea>
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

export default EditGameForm