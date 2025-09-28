import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Subject_list from './Pages/Subject_list'
import Create_test from './Pages/Create_test'
import Send_test from './Pages/Send_test'
import Navbar from './Pages/Navbar'
import Single_subject from './Pages/Single_subject'
import Sign_in from './Pages/Sign_in'

const App = () => {

  const location = useLocation();


  return (
    <div className='flex flex-col h-auto justify-between items-center overflow-hidden overflow-y-auto'>
      <div className='w-full h-full bg-[#242f34] pb-[130px] mx-auto flex flex-col items-center justify-between'>

        <Routes>
          <Route path='/' element={<Subject_list />}></Route>
          <Route path='/sign_in/' element={<Sign_in />}></Route>
          <Route path='/test_1' element={<Single_subject />}></Route>
          <Route path='/create_test' element={<Create_test />}></Route>
          <Route path='/send_test' element={<Send_test />}></Route>
          <Route path='*' element={<div className="text-white text-center p-10">404 Not Found</div>} />
        </Routes>

        <div className=''>

        </div>

      </div>
      <div className='fixed w-full mt-[90vh] '>
        {location.pathname !== '/sign_in' && location.pathname !== '/404' && <Navbar />}

      </div>
    </div>
  )
}

export default App