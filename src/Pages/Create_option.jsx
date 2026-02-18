import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Create_option = () => {
    return (
        <div className='w-full h-full px-[30px]'>

            <div className='w-full flex justify-between mt-[40px] items-center'>
                <Link to={'/'}>
                    <div className='w-[50px]'><ChevronLeft /></div>
                </Link>
                <h1 className='font-inter font-[700] text-[28px] '>TEST YARATISH</h1>
                <div className='w-[50px]'></div>
            </div>


            <div className='px-[15px] py-[15px] flex flex-col  justify-evenly mt-[30px] w-full h-[20vh] rounded-[15px] border-[1px] border-gray-400'>

                <Link to={'/create_national'}>
                    <button className=' font-inter font-[600]  w-full h-[6vh] rounded-[15px] bg-amber-500'>
                        Milliy Sertifikat
                    </button>
                </Link>

                <Link to={'/create_dtm'}>
                    <button className='font-inter font-[600]  w-full h-[6vh] rounded-[15px] bg-blue-700'>
                        DTM
                    </button>
                </Link>

            </div>



        </div>
    )
}

export default Create_option