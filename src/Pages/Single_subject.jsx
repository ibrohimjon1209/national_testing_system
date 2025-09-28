import React from 'react'

const Single_subject = () => {
    return (
        <div className='w-full h-full'>


            <div className="header sticky top-0 w-full h-[150px] flex items-center justify-center gradient-primary shadow-modern-lg z-10">
                <h1 className="text-white font-bold text-3xl text-center px-6 leading-tight">Matematika MS Testlar</h1>
            </div>


            <div className='mt-[20px] '>
                <div className='flex items-center justify-between px-[25px] pr-[125px]'>
                    <h1 className='font-inter font-[600] text-[17px] text-white'>Kanal nomi</h1>
                    <h1 className='font-inter font-[600] text-[17px] text-white'>Havola</h1>
                </div>
                <div className='w-full h-full mt-[15px] px-[15px]'>
                    <div className='w-full h-[0.5px] bg-white'></div>
                </div>
            </div>

            {/* ITEM */}
            <div className='w-full h-[140px] py-[5px] flex flex-col justify-between'>
                <div className='w-full h-full flex justify-between items-center pr-[40px] duration-[0.2s] active:bg-[#474747]'>

                    <div className='w-full h-full  pl-[25px] flex flex-col justify-evenly'>
                        <div className='bg-[#815FF5] w-[90px] h-[25px] rounded-[5px] flex justify-center items-center'>
                            <h1 className='font-inter font-[600]  text-[12px] text-white mx-[5px]'>Xonadoshlar</h1>
                        </div>
                        <h1 className='text-white text-[13px]'>2000-09-12 12:00:23</h1>
                    </div>

                    <div>
                        <button className='w-[140px] h-[40px] rounded-[10px] bg-[#3421b0] text-white font-[600] font-inter active:bg-[#6f6de2]'>Kanalga o'tish</button>
                    </div>
                </div>


                <div className='w-full h-full px-[15px]'>
                    <div className='w-full h-[0.5px] bg-white'></div>
                </div>
            </div>





        </div>
    )
}

export default Single_subject