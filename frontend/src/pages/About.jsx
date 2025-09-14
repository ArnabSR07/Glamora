import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox.jsx'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'GLAMORA'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
         <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
         <p>Glamora, founded in 2025, was created to bring trendy, affordable fashion to everyone. We blend style, quality, and comfort, making fashion accessible for every occasion.</p>
         <p>At Glamora, we bring our customers a curated collection of styles that inspire confidence and celebrate individuality. From everyday wear to statement pieces, we ensure top-quality fabrics, fresh trends, and an effortless online shopping journey. Our goal is to make every purchase a step towards expressing your unique personality.</p>
         <b className='text-gray-800'>Our Mission</b>
         <p>Our mission is to empower individuals to express their true selves through fashion. We aim to deliver affordable, high-quality styles that inspire confidence, celebrate diversity, and make every customer feel extraordinary.</p>
         </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE GLAMORA?'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We guarantee premium quality in every product, ensuring style, durability, and comfort you can trust.</p>
         </div>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Enjoy hassle-free shopping with easy navigation, quick checkout, fast delivery, and responsive customer support.</p>
         </div>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our dedicated team ensures prompt responses, personalized assistance, and a seamless shopping experience every time.</p>
         </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About