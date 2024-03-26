import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'


export default function Carrousel() {

    return (
    <>
    <Swiper
        autoplay={{
        delay: 4000, 
        disableOnInteraction: false, 
        }}

        pagination={{
            dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        className="w-full md:w-2/3 max-h-full object-cover"
    >
        <SwiperSlide>
                <div className='relative'>
                    <div className='absolute w-[500px] h-[450px] max-[768px]:hidden'>
                        <p className='absolute font-bold xl:text-5xl xl:pl-4 xl:pt-4 text-[#06A9B2] md:text-3xl'>Get your checkups and studies at Serenety Health Center.</p>
                        <p className='absolute font-bold xl:text-2xl xl:pl-4 xl:pt-4 text-[#06A9B2] xl:top-[200px] md:top-[80px]'>We take care of your health.</p>
                        <button className='absolute bg-[#F19E22] font-bold text-white xl:text-3xl xl:w-72 xl:h-14 rounded-lg xl:top-[270px] xl:ml-4 md:w-48 md:h-10 md:top-[120px]'>See Specialties</button>
                    </div>
                    <img src="/Image01.png" alt="Image family"/>
                </div>
                <p className='font-bold text-3xl pl-4 pt-4 text-[#06A9B2] min-[768px]:hidden'>Get your checkups and studies at Serenety Health Center.</p>
                <p className='font-bold text-2xl pl-4 text-[#06A9B2] min-[768px]:hidden'>We take care of your health.</p>
                <button className='bg-[#F19E22] font-bold text-white w-40 h-10 rounded-lg top-[150px] ml-4 mt-4 min-[768px]:hidden'>See Specialties</button>
        </SwiperSlide>
        

        <SwiperSlide>
                <div className='relative'>
                    <div className='absolute w-[500px] h-[450px] max-[768px]:hidden'>
                        <p className='absolute font-bold xl:text-5xl xl:pl-4 xl:pt-4 text-[#06A9B2] md:text-3xl'>Neurology, Clinical Neurosurgery and Spine Surgery at INECCU.</p>
                        <p className='absolute font-bold xl:text-2xl xl:pl-4 xl:pt-4 text-[#06A9B2] xl:top-[200px] md:top-[80px]'>Specialists for a better quality of life.</p>
                        <button className='absolute bg-[#F19E22] font-bold text-white xl:text-3xl xl:w-72 xl:h-14 rounded-lg xl:top-[270px] xl:ml-4 md:w-48 md:h-10 md:top-[120px]'>View More</button>
                    </div>
                    <img src="/Image02.png" alt="Image family"/>
                </div>
                <p className='font-bold text-3xl pl-4 pt-4 text-[#06A9B2] min-[768px]:hidden'>Neurology, Clinical Neurosurgery and Spine Surgery at INECCU.</p>
                <p className='font-bold text-2xl pl-4 text-[#06A9B2] min-[768px]:hidden'>Specialists for a better quality of life.</p>
                <button className='bg-[#F19E22] font-bold text-white w-40 h-10 rounded-lg top-[150px] ml-4 mt-4 min-[768px]:hidden'>View More</button>
        </SwiperSlide>
    </Swiper>
    </>
    )
}

