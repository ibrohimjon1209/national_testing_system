import { CircleQuestionMark, Check, CircleCheck } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { motion, AnimatePresence } from 'framer-motion'

const Create_test = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [answers, setAnswers] = useState({})
  const [errors, setErrors] = useState({})
  const startMultiQuestions = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]

  const [multiCounts, setMultiCounts] = useState(
    startMultiQuestions.reduce((acc, q) => ({ ...acc, [q]: 1 }), {})
  )

  const [multiValues, setMultiValues] = useState(
    startMultiQuestions.reduce((acc, q) => ({ ...acc, [q]: [''] }), {})
  )

  const increaseCount = (question) => {
    setMultiCounts(prev => {
      const curr = prev[question] ?? 1
      if (curr >= 45) return prev
      const next = { ...prev, [question]: curr + 1 }
      setMultiValues(vals => {
        const arr = vals[question] ? [...vals[question]] : []
        arr.push('')
        return { ...vals, [question]: arr }
      })
      return next
    })
  }

  const decreaseCount = (question) => {
    setMultiCounts(prev => {
      const curr = prev[question] ?? 1
      if (curr <= 1) return prev
      const next = { ...prev, [question]: curr - 1 }
      setMultiValues(vals => {
        const arr = vals[question] ? [...vals[question]] : []
        arr.pop()
        return { ...vals, [question]: arr.length ? arr : [''] }
      })
      return next
    })
  }

  const handleMultiValueChange = (question, idx, value) => {
    setMultiValues(prev => {
      const arr = prev[question] ? [...prev[question]] : []
      arr[idx] = value
      return { ...prev, [question]: arr }
    })

    setErrors(prev => ({
      ...prev,
      [`${question}-${idx}`]: !value.trim()
    }))
  }

  const renderOptions = (questionNumber) => {
    const allOptions = ['A', 'B', 'C', 'D', 'E', 'F']
    const visibleCount = questionNumber <= 32 ? 4 : 6
    return allOptions.map((option, idx) => (
      <td key={option} className='border border-gray-600 text-center'>
        {idx < visibleCount ? (
          <div className='flex justify-center'>
            <input
              type='radio'
              name={`question-${questionNumber}`}
              checked={answers[questionNumber] === option}
              onChange={() => handleAnswerChange(questionNumber, option)}
              className='w-[18px] h-[18px] rounded-full appearance-none border border-gray-500 cursor-pointer transition-transform duration-300 ease-in-out active:scale-[97%] checked:bg-blue-500 checked:border-blue-500'
            />
          </div>
        ) : (
          <div className='h-[18px]' />
        )}
      </td>
    ))
  }

  const handleCheckbox = () => {
    setIsChecked(!isChecked)
  }

  const handleAnswerChange = (question, option) => {
    setAnswers(prev => ({
      ...prev,
      [question]: option
    }))
  }

  const handleCreate = () => {
    let newErrors = {}
    startMultiQuestions.forEach(q => {
      multiValues[q].forEach((value, idx) => {
        if (!value.trim()) {
          newErrors[`${q}-${idx}`] = true
        }
      })
    })
    setErrors(newErrors)
  }

  return (
    <div className='w-full h-full'>
      <div className="header sticky top-0 w-full h-[150px] flex flex-col justify-center gradient-primary shadow-modern-lg z-10">
        <Link to={"/web.telegram.org"}>
          <div className='flex gap-[5px] ml-[10px] mt-[-40px]'>
            <CircleQuestionMark className='text-white' />
            <h1 className='font-inter text-[15px] underline text-white'>Yo'riqnoma</h1>
          </div>
        </Link>

        <h1 className="text-white font-bold text-3xl text-center px-6 leading-tight mt-[10px]">
          Test yaratish
        </h1>
      </div>

      <div className='w-full h-full flex flex-col px-[7vw] mt-[25px]'>
        <div>
          <h1 className='text-white mb-[5px]'>Fanni tanlang</h1>
          <select
            className='custom-select w-full h-[45px] px-[10px] rounded-[5px] border-white border-[1px] text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300'
            defaultValue=""
          >
            <option value="" disabled>--Fanni tanlang--</option>
            <option className='bg-[#242f34]' value="matematika">Matematika</option>
            <option className='bg-[#242f34]' value="ingliz">Ingliz tili</option>
          </select>
        </div>

        <button
          onClick={handleCheckbox}
          className='active:scale-[97%] active:bg-[#695db6] duration-150 mt-[10px] w-full h-[45px] bg-[#3421b0] rounded-[5px] text-white font-inter font-[600] text-[13px] flex items-center justify-between px-[15px]'
        >
          <span>Test hammaga ko'rinsinmi?</span>
          <div
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            tabIndex={0}
            className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center cursor-pointer transition 
            ${isChecked ? 'bg-green-500 border-green-500' : 'bg-white border-white'}
            ${isFocused ? 'shadow-[0_0_5px_2px_rgba(59,130,246,0.7)] border-blue-500' : ''}`}
          >
            {isChecked && <Check className="w-[14px] h-[14px] text-white" />}
          </div>
        </button>

        <AnimatePresence>
          {isChecked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className='mt-[15px]'>
                <h1 className='text-white mb-[5px] text-[15px] font-[400]'>
                  Test qaysi kanalda o'tkaziladi?
                </h1>
                <input
                  type='text'
                  placeholder='@username'
                  className='custom-select w-full h-[45px] px-[10px] rounded-[5px] border-white border-[1px] text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300'
                />
              </div>

              <div className='mt-[10px]'>
                <h1 className='text-white mb-[5px] text-[15px] font-[400]'>
                  Test qachon o'tkaziladi?
                </h1>
                <input
                  type='datetime-local'
                  className='[color-scheme:dark] custom-select w-full h-[45px] px-[10px] rounded-[5px] border-white border-[1px] text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300'
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className='mt-[20px]'>
          <h1 className='text-center text-white mb-[10px] font-[600]'>To'g'ri javoblarni belgilang</h1>
          <table className='w-full border-collapse border border-gray-700 text-white text-sm'>
            <thead>
              <tr className='bg-[#242f34] h-[10px]'>
                <th className='border border-gray-600 w-[45px] py-1 h-[40px]'>№</th>
                <th className='border border-gray-600 px-2 py-1'>A</th>
                <th className='border border-gray-600 px-2 py-1'>B</th>
                <th className='border border-gray-600 px-2 py-1'>C</th>
                <th className='border border-gray-600 px-2 py-1'>D</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 32 }, (_, index) => (
                <tr key={index + 1} className='h-[40px] font-[600]'>
                  <td className='border border-gray-600 px-2 text-center'>{index + 1}</td>
                  {renderOptions(index + 1)}
                </tr>
              ))}
            </tbody>

            <tr className='bg-[#242f34] h-[10px]'>
              <th className='border border-gray-600 w-[45px] py-1 h-[40px]'>№</th>
              <th className='border border-gray-600 px-2 py-1'>A</th>
              <th className='border border-gray-600 px-2 py-1'>B</th>
              <th className='border border-gray-600 px-2 py-1'>C</th>
              <th className='border border-gray-600 px-2 py-1'>D</th>
              <th className='border border-gray-600 px-2 py-1'>E</th>
              <th className='border border-gray-600 px-2 py-1'>F</th>
            </tr>

            <tbody>
              {Array.from({ length: 3 }, (_, index) => (
                <tr key={index + 1} className='h-[40px] font-[600]'>
                  <td className='border border-gray-600 px-2 text-center'>{index + 33}</td>
                  {renderOptions(index + 33)}
                </tr> 
              ))}
            </tbody>
          </table>

          <div className='mt-[16px] space-y-6'>
            {startMultiQuestions.map(q => (
              <div key={`multi-${q}`} className='bg-[#1b1f22] border border-gray-700 rounded-md p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='text-white font-[600]'>{q}-savol</div>

                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => increaseCount(q)}
                        className='w-8 h-8 rounded-md bg-[#7c3aed] text-white flex items-center justify-center text-lg shadow'
                        disabled={(multiCounts[q] ?? 1) >= 45}
                      >
                        +
                      </button>
                      <button
                        onClick={() => decreaseCount(q)}
                        className='w-8 h-8 rounded-md bg-[#ef4444] text-white flex items-center justify-center text-lg shadow'
                        disabled={(multiCounts[q] ?? 1) <= 1}
                      >
                        -
                      </button>
                    </div>
                  </div>

                  <div className='text-sm text-gray-300'>Jami: {multiCounts[q] ?? 1}</div>
                </div>

                <div className='mt-4 space-y-3'>
                  {Array.from({ length: multiCounts[q] ?? 1 }, (_, idx) => (
                    <div key={`${q}-${idx}-${Date.now()}`} className='flex items-center gap-3'>
                      <div className='w-[26px] text-white text-[14px] font-[600]'>{idx + 1})</div>
                      <input
                        value={(multiValues[q] && multiValues[q][idx]) ?? ''}
                        onChange={(e) => handleMultiValueChange(q, idx, e.target.value)}
                        placeholder='JAVOBNI KIRITIG'
                        className={`w-full h-[42px] px-3 rounded-[6px] border 
                          ${errors[`${q}-${idx}`] ? 'border-red-500' : 'border-gray-600'} 
                          bg-[#242f34] text-white placeholder:text-gray-400`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleCreate}
            className='mt-[30px] active:scale-[95%] active:bg-blue-300 gradient-primary shadow-modern-lg z-10 duration-150 w-full h-[45px] rounded-[5px] text-white font-inter font-[600] text-[13px] flex items-center justify-center gap-[5px] px-[15px]'
          >
            <h1 className='font-[600] text-[15px]'>Yaratish</h1>
            <CircleCheck className='w-[20px] h-[20px]' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Create_test
