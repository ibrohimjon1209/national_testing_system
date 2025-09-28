import { CircleCheck, Loader2, CheckCircle } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { redirect, useNavigate } from 'react-router-dom'

const Send_test = () => {
  const [isFind, setIsFind] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    if (/^\d{0,4}$/.test(value)) {
      setIsError(false)
    } else {
      setIsError(true)
    }
  }

  const handleIsFind = () => {
    if (/^\d{4}$/.test(inputValue)) {
      setLoading(true)
      setIsError(false)
      setTimeout(() => {
        setIsFind(true)
        setLoading(false)
      }, 500)
    } else {
      setIsFind(false)
      setIsError(true)
    }
  }

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

    if (Object.keys(newErrors).length === 0) {
      setSubmitting(true)
      setTimeout(() => {
        setSubmitting(false)
        setSubmitted(true)
      }, 1000)
    }
  }




  const closeModal = () => {
    setSubmitted(false);
    navigate('/');
  };

  return (
    <div className='w-full h-full relative'>
      <div className="header sticky top-0 w-full h-[150px] flex items-center justify-center gradient-primary shadow-modern-lg z-10">
        <h1 className="text-white font-bold text-[30px] text-center px-6 leading-tight">MS testni yuborish</h1>
      </div>

      <div className='w-full h-full px-[25px]'>
        <div className='mt-[20px]'>
          <h1 className='text-white mb-[5px] text-[15px] font-[400]'>
            {isError ? "Faqat 4 ta raqam bo'lishi kerak!" : "Test kodini kiriting"}
          </h1>
          <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Kod XXXX"
            className={`custom-select w-full h-[45px] px-[10px] rounded-[5px] border text-white bg-[#242f34] 
              focus:outline-none appearance-none 
              focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] 
              transition-shadow duration-300
              ${isError ? 'border-red-500 placeholder:text-red-500' : 'border-white'}
            `}
          />
        </div>

        <button
          onClick={handleIsFind}
          disabled={loading}
          className='mt-[30px] active:scale-[95%] active:bg-blue-300 gradient-primary shadow-modern-lg z-10 duration-150 w-full h-[45px] rounded-[5px] text-white font-inter font-[600] text-[13px] flex items-center justify-center gap-[5px] px-[15px]'
        >
          {loading ? (
            <Loader2 className='w-5 h-5 animate-spin' />
          ) : (
            <h1 className='font-[600] text-[15px]'>OK</h1>
          )}
        </button>

        {isFind && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='test-div mt-[20px]'
          >
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
                      <div key={`${q}-${idx}`} className='flex items-center gap-3'>
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
              disabled={submitting}
              className='mt-[30px] active:scale-[95%] gradient-primary shadow-modern-lg z-10 duration-150 w-full h-[45px] rounded-[5px] text-white font-inter font-[600] text-[13px] flex items-center justify-center gap-[5px] px-[15px]'
            >
              {submitting ? (
                <Loader2 className='w-5 h-5 animate-spin' />
              ) : (
                <>
                  <h1 className='font-[600] text-[15px]'>Javoblarni yuborish</h1>
                  <CircleCheck className='w-[20px] h-[20px]' />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className='bg-[#1f2937] rounded-xl p-6 w-[300px] text-center shadow-lg'
          >
            <CheckCircle className='w-14 h-14 text-green-400 mx-auto mb-3' />
            <h1 className='text-white text-lg font-bold mb-2'>Test yuborildi!</h1>
            <p className='text-gray-300 text-sm'>Sizning test javoblaringiz muvaffaqiyatli yuborildi.</p>
            <button
              onClick={closeModal}
              className='mt-4 w-full h-[40px] rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition'
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Send_test
