import React from 'react'
import { Link } from 'react-router-dom'

const Subject_list = () => {
  return (
    <div className='w-full h-full'>

      <div className="header sticky top-0 w-full h-[150px] flex items-center justify-center gradient-primary shadow-modern-lg z-10">
        <h1 className="text-white font-bold text-3xl text-center px-6 leading-tight">Milliy sertifikat testlari</h1>
      </div>

      <div className='subjects w-full flex flex-col'>
        <Link to={"/test_1"}>

          <div className='flex flex-col items-center'>
            <div className='flex justify-between items-center px-[35px] w-full h-[70px] duration-[0.2s] active:bg-[#474747]'>
              <h1 className='font-inter font-[600] text-[17px] text-white'>Ma tematika</h1>
              <button className=' w-[60px] h-[40px] rounded-[10px] bg-[#3421b0] text-white font-[600] font-inter active:bg-[#6f6de2]'>1 ta</button>
            </div>
            <div className='w-full h-full px-[15px]'>
              <div className='w-full h-[1px] bg-white'></div>
            </div>
          </div>
        </Link>

        <div className='flex flex-col items-center'>
          <div className='flex justify-between items-center px-[35px] w-full h-[70px] duration-[0.2s] active:bg-[#474747]'>
            <h1 className='font-inter font-[600] text-[17px] text-white'>Matematika</h1>
            <button className=' w-[60px] h-[40px] rounded-[10px] bg-[#3421b0] text-white font-[600] font-inter active:bg-[#6f6de2]'>1 ta</button>
          </div>
          <div className='w-full h-full px-[15px]'>
            <div className='w-full h-[1px] bg-white'></div>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div className='flex justify-between items-center px-[35px] w-full h-[70px] duration-[0.2s] active:bg-[#474747]'>
            <h1 className='font-inter font-[600] text-[17px] text-white'>Arab tili</h1>
            <button className=' w-[60px] h-[40px] rounded-[10px] bg-[#3421b0] text-white font-[600] font-inter active:bg-[#6f6de2]'>3 ta</button>
          </div>
          <div className='w-full h-full px-[15px]'>
            <div className='w-full h-[1px] bg-white'></div>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div className='flex justify-between items-center px-[35px] w-full h-[70px] duration-[0.2s] active:bg-[#474747]'>
            <h1 className='font-inter font-[600] text-[17px] text-white'>Ingliz tili</h1>
            <button className=' w-[60px] h-[40px] rounded-[10px] bg-[#3421b0] text-white font-[600] font-inter active:bg-[#6f6de2]'>2 ta</button>
          </div>
          <div className='w-full h-full px-[15px]'>
            <div className='w-full h-[1px] bg-white'></div>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div className='flex justify-between items-center px-[35px] w-full h-[70px] duration-[0.2s] active:bg-[#474747]'>
            <h1 className='font-inter font-[600] text-[17px] text-white'>Matematika</h1>
            <button className=' w-[60px] h-[40px] rounded-[10px] bg-[#3421b0] text-white font-[600] font-inter active:bg-[#6f6de2]'>1 ta</button>
          </div>
          <div className='w-full h-full px-[15px]'>
            <div className='w-full h-[1px] bg-white'></div>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div className='flex justify-between items-center px-[35px] w-full h-[70px] duration-[0.2s] active:bg-[#474747]'>
            <h1 className='font-inter font-[600] text-[17px] text-white'>Rus tili</h1>
            <button className=' w-[60px] h-[40px] rounded-[10px] bg-[#3421b0] text-white font-[600] font-inter active:bg-[#6f6de2]'>1 ta</button>
          </div>
          <div className='w-full h-full px-[15px]'>
            <div className='w-full h-[1px] bg-white'></div>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div className='flex justify-between items-center px-[35px] w-full h-[70px] duration-[0.2s] active:bg-[#474747]'>
            <h1 className='font-inter font-[600] text-[17px] text-white'>Rus tili</h1>
            <button className=' w-[60px] h-[40px] rounded-[10px] bg-[#3421b0] text-white font-[600] font-inter active:bg-[#6f6de2]'>1 ta</button>
          </div>
          <div className='w-full h-full px-[15px]'>
            <div className='w-full h-[1px] bg-white'></div>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div className='flex justify-between items-center px-[35px] w-full h-[70px] duration-[0.2s] active:bg-[#474747]'>
            <h1 className='font-inter font-[600] text-[17px] text-white'>Rus tili</h1>
            <button className=' w-[60px] h-[40px] rounded-[10px] bg-[#3421b0] text-white font-[600] font-inter active:bg-[#6f6de2]'>1 ta</button>
          </div>
          <div className='w-full h-full px-[15px]'>
            <div className='w-full h-[1px] bg-white'></div>
          </div>
        </div>        <div className='flex flex-col items-center'>
          <div className='flex justify-between items-center px-[35px] w-full h-[70px] duration-[0.2s] active:bg-[#474747]'>
            <h1 className='font-inter font-[600] text-[17px] text-white'>Rus tili</h1>
            <button className=' w-[60px] h-[40px] rounded-[10px] bg-[#3421b0] text-white font-[600] font-inter active:bg-[#6f6de2]'>1 ta</button>
          </div>
          <div className='w-full h-full px-[15px]'>
            <div className='w-full h-[1px] bg-white'></div>
          </div>
        </div>        <div className='flex flex-col items-center'>
          <div className='flex justify-between items-center px-[35px] w-full h-[70px] duration-[0.2s] active:bg-[#474747]'>
            <h1 className='font-inter font-[600] text-[17px] text-white'>Rus tili</h1>
            <button className=' w-[60px] h-[40px] rounded-[10px] bg-[#3421b0] text-white font-[600] font-inter active:bg-[#6f6de2]'>1 ta</button>
          </div>
          <div className='w-full h-full px-[15px]'>
            <div className='w-full h-[1px] bg-white'></div>
          </div>
        </div>        <div className='flex flex-col items-center'>
          <div className='flex justify-between items-center px-[35px] w-full h-[70px] duration-[0.2s] active:bg-[#474747]'>
            <h1 className='font-inter font-[600] text-[17px] text-white'>Rus tili</h1>
            <button className=' w-[60px] h-[40px] rounded-[10px] bg-[#3421b0] text-white font-[600] font-inter active:bg-[#6f6de2]'>1 ta</button>
          </div>
          <div className='w-full h-full px-[15px]'>
            <div className='w-full h-[1px] bg-white'></div>
          </div>
        </div>

      </div>

      <div className='w-full h-full px-[17px] mt-[25px]'>
        <div className='w-full h-[13px] rounded-[5px] bg-[#4d4d4d]'></div>
      </div>

    </div>
  )
}

export default Subject_list