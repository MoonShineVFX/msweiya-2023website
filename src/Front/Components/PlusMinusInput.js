import React,{useState} from 'react'
import { useForm } from 'react-hook-form';
function PlusMinusInput({player,handleInputClick}) {
  let [count, setCount] = useState(0);
  const { register, handleSubmit, watch,setValue,getValues, formState: { errors } } = useForm({
    defaultValues:{
      pay_money:0
    }
  });
  const onSubmit = (data) => {
    console.log(data)
    handleInputClick(data)
  }


  return (
    <div className=''>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col justify-center items-center">
        <div className='flex gap-3 my-5'>
          <input type="button" value="-" className=' w-7 bg-yellow-600 rounded-md text-lg' 
            onClick={()=>{
              const values = getValues("pay_money")
              if(values !== 0 ){
                setValue("pay_money", values-1)
              }else{
                setValue("pay_money", 0)
              }
            }}
          />
          <input type="number" className="gameNumber" min="0" {...register('pay_money')}/>
          <input type="button" value="+" className=' w-7 bg-yellow-600 rounded-md text-lg' 
            onClick={()=>{
              const values = getValues("pay_money")
              setValue("pay_money", values+1)
            }}
          />
          <input type="hidden" value={player}  {...register('player')}/>
        </div>
        <button type="submit" 
        className="py-1 px-2 text-white w-1/2 rounded-full text-base tracking-wider my-3 "
        style={{background: `linear-gradient(to top, #574a00 0%, #e5a533 100%)`}} >
                下好離手
        </button>
      </form>


    </div>
  )
}

export default PlusMinusInput