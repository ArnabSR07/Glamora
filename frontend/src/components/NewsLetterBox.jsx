import React from 'react'

const NewsLetterBox = () => {

const onSubmitHandler= (event)=>{
   event.preventDefault();
}

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now & get 20% discount</p>
        <p className='text-gray-400 mt-3'>
            Stay updated with our latest news and exclusive offers by subscribing to our newsletter. Enter your email below and enjoy a 20% discount on your next purchase!
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
            <button type='submit' className='bg-black text-white text-xs px-8  py-4 cursor-pointer'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox