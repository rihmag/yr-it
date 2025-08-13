import React from 'react'
import {useForm} from 'react-hook-form'
const EditCourse = () => {
  function submitfunction(formData) {
  }
  const {
    register,
    submit,
    watch,
    errors,

  }=useForm()
  return (

    <div>
      <form action="submitfunction">
        <label htmlFor="course title"> Course Title</label>
        <input {...register("title")} type='text' name='description ' className='rounded-md border-2 border-solid border-amber-950' />
        <br/>
        <label htmlFor='course description'>course description</label>
        <textarea {...register("desc")} name="content" rows={4} cols={40} className='rounded-md border-2 border-solid border-amber-950'/>
        <br />
        <label htmlFor='price' name ="price" {...register("price")}>course price</label>
        
        <input type='text' name='courseprice'className='rounded-md border-2 border-solid border-amber-950'/>
        <br />
        <br />
        <button type="submit" className=' border-solid border-blue-300 border-4 rounded-md bg-slate-100 w-40'>Submit</button>

      </form>
    </div>
  )
}

export default EditCourse
