import { CircleCheck, Loader2, CheckCircle } from 'lucide-react'
import { useState, useCallback, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import check_answers from '../Services/check_answers'

const Dtm = () => {
  const [isFind, setIsFind] = useState(false)
  const [showPercentages, setShowPercentages] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)

  const [inputValue, setInputValue] = useState('')
  const [ball1, setBall1] = useState('')
  const [ball2, setBall2] = useState('')

  const [isError, setIsError] = useState(false)
  const [isBallError1, setIsBallError1] = useState(false)
  const [isBallError2, setIsBallError2] = useState(false)

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [testData, setTestData] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [resultData, setResultData] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  const telegramId = 5021533207

  // ==================== YORDAMCHI ====================
  const getFanName = (key) => {
    const names = {
      ona_tili: "Ona tili",
      math_mandatory: "Matematika (majburiy)",
      history: "O‘zbekiston tarixi",
      math_optional: "Matematika",
      physics: "Fizika",
    }
    return names[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const optionalFans = useMemo(() => {
    if (!testData?.meta) return []
    return Object.keys(testData.meta).filter(key => testData.meta[key].type === 'optional')
  }, [testData])

  // ==================== INPUT ====================
  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    setIsError(!/^\d*$/.test(value))
  }

  const handleBallChange1 = (e) => {
    const value = e.target.value
    setBall1(value)
    setIsBallError1(!/^\d*\.?\d*$/.test(value))
  }

  const handleBallChange2 = (e) => {
    const value = e.target.value
    setBall2(value)
    setIsBallError2(!/^\d*\.?\d*$/.test(value))
  }

  // ==================== FETCH TEST ====================
  const verifyTest = async (testId) => {
    if (!/^\d+$/.test(testId)) {
      setIsError(true)
      return
    }

    setLoading(true)
    setApiError(null)

    try {
      const res = await fetch('https://bot.milliy-test.uz/api/block-tests/')
      if (!res.ok) throw new Error('Server xatosi')

      const data = await res.json()
      const found = data.results?.find(item => String(item.id) === testId)

      if (!found || !found.meta || Object.keys(found.meta).length === 0) {
        throw new Error('Test topilmadi')
      }

      setTestData(found)
      setIsFind(true)
      setShowPercentages(true)
    } catch (err) {
      setApiError(err.message || "Test topilmadi yoki xatolik yuz berdi")
      setIsFind(false)
    } finally {
      setLoading(false)
    }
  }

  const handleIsFind = () => verifyTest(inputValue)

  // ==================== BALL SUBMIT ====================
  const handleBallSubmit = () => {
    let hasError = false
    if (!/^\d*\.?\d*$/.test(ball1)) { setIsBallError1(true); hasError = true }
    if (!/^\d*\.?\d*$/.test(ball2)) { setIsBallError2(true); hasError = true }
    if (!hasError) setShowAnswers(true)
  }

  useEffect(() => {
    if (location.state?.testId) {
      const id = location.state.testId.toString()
      setInputValue(id)
      verifyTest(id)
    }
  }, [location.state])

  // ==================== JAVOBLAR ====================
  const [answers, setAnswers] = useState({})

  const handleAnswerChange = useCallback((key, option) => {
    setAnswers(prev => ({ ...prev, [key]: option }))
  }, [])

  const renderOptions = (questionNumber, block) => {
    const options = ['A', 'B', 'C', 'D']
    return options.map(option => (
      <td key={option} className='border border-gray-600 text-center'>
        <div className='flex justify-center'>
          <input
            type='radio'
            name={`${block}-question-${questionNumber}`}
            checked={answers[`${block}-${questionNumber}`] === option}
            onChange={() => handleAnswerChange(`${block}-${questionNumber}`, option)}
            className='w-[18px] h-[18px] rounded-full appearance-none border border-gray-500 cursor-pointer transition-all duration-150 ease-in-out active:scale-[97%] checked:bg-blue-500 checked:border-blue-500'
          />
        </div>
      </td>
    ))
  }

  // ==================== CHECK API ====================
  const handleCreate = async () => {
    setSubmitting(true)
    setApiError(null)

    try {
      const userAnswers = {}

      // Majburiy fanlar
      Object.keys(testData.meta).forEach(key => {
        if (testData.meta[key].type === 'mandatory') {
          userAnswers[key] = {
            type: "mandatory",
            questions: {}
          }
          for (let i = 1; i <= 10; i++) {
            const answerKey = key === 'math_mandatory' ? i + 10 : key === 'history' ? i + 20 : i
            const answer = answers[`${key}-${answerKey}`]
            if (answer) userAnswers[key].questions[answerKey] = answer
          }
        }
      })

      // Asosiy (optional) fanlar
      optionalFans.forEach((key, idx) => {
        const ball = idx === 0 ? parseFloat(ball1) || 0 : parseFloat(ball2) || 0

        if (ball > 0) {
          userAnswers[key] = { questions: ball }
        } else {
          userAnswers[key] = { questions: {} }
          for (let i = 1; i <= 30; i++) {
            const answer = answers[`${key}-${i}`]
            if (answer) userAnswers[key].questions[i] = answer
          }
        }
      })

      const payload = {
        user_answers: userAnswers,
        telegram_id: telegramId
      }

      const res = await fetch(`https://bot.milliy-test.uz/api/block-tests/${inputValue}/check/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Tekshirishda xatolik')

      const result = await res.json()
      setResultData(result)
      setSubmitted(true)

    } catch (error) {
      console.error(error)
      setApiError("Javoblarni tekshirishda xatolik yuz berdi")
    } finally {
      setSubmitting(false)
    }
  }

  const closeModal = () => {
    setSubmitted(false)
    setResultData(null)
    navigate('/')
  }

  return (
    <div className='w-full h-full relative'>
      <div className="header sticky top-0 w-full h-[150px] flex items-center justify-center bg-gradient-to-b from-[-10%] to-[100%] from-[#3579bd] to-[#132a41] shadow-modern-lg z-10">
        <h1 className="text-white font-bold text-[30px] text-center px-6 leading-tight">DTM testni yuborish</h1>
      </div>

      <div className='w-full h-full px-[25px]'>

        {/* 1. TEST KODI */}
        {!showPercentages && (
          <>
            <div className='mt-[20px]'>
              <h1 className='text-white mb-[5px] text-[15px] font-[400]'>
                {isError ? "Faqat raqam kiritilishi kerak!" : "Test kodini kiriting"}
              </h1>
              <input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Kod XXXX"
                className={`custom-select w-full h-[45px] px-[10px] rounded-[5px] border text-white bg-[#242f34] 
                  focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] 
                  transition-shadow duration-300
                  ${isError ? 'border-red-500 placeholder:text-red-500' : 'border-white'}`}
              />
              {apiError && <div className="mt-2 text-red-500 text-sm">{apiError}</div>}
            </div>

            <button
              onClick={handleIsFind}
              disabled={loading}
              className='mt-[30px] active:scale-[95%] active:bg-blue-300 bg-gradient-to-bl from-[-50%] to-[90%] from-[#3579bd] to-[#1b3b5b] shadow-modern-lg w-full h-[45px] rounded-[5px] text-white font-inter font-[600] text-[13px] flex items-center justify-center gap-2'
            >
              {loading ? <Loader2 className='w-5 h-5 animate-spin' /> : 'OK'}
            </button>
          </>
        )}

        {/* 2. BALL KIRITISH */}
        {showPercentages && !showAnswers && testData && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className='border-t-[1px] mt-[30px] pt-[30px] flex flex-col items-center'>
            <h1 className='text-[23px] font-[600] text-white'>Sertifikat ballari</h1>

            <div className='w-full mt-4'>
              <h1 className='text-white mb-[5px] text-[15px] font-[400]'>
                Birinchi fan ballini kiriting | {getFanName(optionalFans[0])} (maks 93 ball)
              </h1>
              <input 
                type='text' 
                value={ball1} 
                onChange={handleBallChange1} 
                placeholder="Ball" 
                className={`custom-select w-full h-[45px] px-[10px] rounded-[5px] border text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] ${isBallError1 ? 'border-red-500' : 'border-blue-800'}`} 
              />
            </div>

            <div className='w-full mt-4'>
              <h1 className='text-white mb-[5px] text-[15px] font-[400]'>
                Ikkinchi fan ballini kiriting | {getFanName(optionalFans[1])} (maks 63 ball)
              </h1>
              <input 
                type='text' 
                value={ball2} 
                onChange={handleBallChange2} 
                placeholder="Ball" 
                className={`custom-select w-full h-[45px] px-[10px] rounded-[5px] border text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] ${isBallError2 ? 'border-red-500' : 'border-blue-800'}`} 
              />
            </div>

            <button onClick={handleBallSubmit} className='mt-[20px] active:scale-[95%] bg-gradient-to-bl from-[-50%] to-[90%] from-[#3579bd] to-[#1b3b5b] shadow-modern-lg w-full h-[45px] rounded-[5px] text-white font-inter font-[600] text-[13px]'>
              OK
            </button>
          </motion.div>
        )}

        {/* 3. JAVOBLAR */}
        {showAnswers && testData && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className='test-div mt-[20px]'>
            <h1 className='text-center text-white mb-[15px] font-[600] text-xl'>To'g'ri javoblarni belgilang</h1>

            {/* ASOSIY FANLAR */}
            <div className='mb-10'>
              <h2 className='text-white text-lg font-bold mb-6'>Asosiy fanlar (30 savoldan)</h2>
              {optionalFans.map((key, index) => {
                const enteredBall = index === 0 ? parseFloat(ball1) || 0 : parseFloat(ball2) || 0
                const hasCert = enteredBall > 0

                return (
                  <div key={key} className='mb-8'>
                    <h3 className='text-white text-md font-semibold mb-3 flex items-center gap-3'>
                      {index === 0 ? 'Birinchi fan: ' : 'Ikkinchi fan: '}{getFanName(key)}
                      {hasCert && <span className='text-green-400 text-sm font-medium'>✓ {enteredBall} ball sertifikat</span>}
                    </h3>

                    {!hasCert && (
                      <table className='w-full border-collapse border border-gray-700 text-white text-sm'>
                        <thead>
                          <tr className='bg-[#242f34]'>
                            <th className='border border-gray-600 w-[45px] py-1'>№</th>
                            <th className='border border-gray-600 px-2 py-1'>A</th>
                            <th className='border border-gray-600 px-2 py-1'>B</th>
                            <th className='border border-gray-600 px-2 py-1'>C</th>
                            <th className='border border-gray-600 px-2 py-1'>D</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: 30 }, (_, i) => (
                            <tr key={i + 1} className='h-[40px] font-[600]'>
                              <td className='border border-gray-600 px-2 text-center'>{i + 1}</td>
                              {renderOptions(i + 1, key)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )
              })}
            </div>

            {/* MAJBURIY FANLAR */}
            <div>
              <h2 className='text-white text-lg font-bold mb-4'>Majburiy fanlar (10 savoldan)</h2>
              {Object.keys(testData.meta)
                .filter(key => testData.meta[key].type === 'mandatory')
                .map(key => {
                  // Agar bu majburiy fan asosiy fanlardan birida sertifikat bo'lsa
                  const isCoveredByOptional = optionalFans.some((optKey, idx) => {
                    const enteredBall = idx === 0 ? parseFloat(ball1) || 0 : parseFloat(ball2) || 0
                    return enteredBall > 0 && getFanName(optKey).includes(getFanName(key))
                  })

                  return (
                    <div key={key} className='mb-6'>
                      <h3 className='text-white text-md font-semibold mb-3 flex items-center gap-3'>
                        {getFanName(key)}
                        {isCoveredByOptional && <span className='text-green-400 text-sm font-medium'>✓ 10/10 - 11 ball</span>}
                      </h3>

                      {!isCoveredByOptional && (
                        <table className='w-full border-collapse border border-gray-700 text-white text-sm'>
                          <thead>
                            <tr className='bg-[#242f34]'>
                              <th className='border border-gray-600 w-[45px] py-1'>№</th>
                              <th className='border border-gray-600 px-2 py-1'>A</th>
                              <th className='border border-gray-600 px-2 py-1'>B</th>
                              <th className='border border-gray-600 px-2 py-1'>C</th>
                              <th className='border border-gray-600 px-2 py-1'>D</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: 10 }, (_, i) => (
                              <tr key={i + 1} className='h-[40px] font-[600]'>
                                <td className='border border-gray-600 px-2 text-center'>{i + 1}</td>
                                {renderOptions(i + 1, key)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  )
                })}
            </div>

            <button
              onClick={handleCreate}
              disabled={submitting}
              className='mt-[30px] active:scale-[95%] bg-gradient-to-bl from-[-90%] to-[80%] from-[#3579bd] to-[#1b3b5b] shadow-modern-lg w-full h-[45px] rounded-[5px] text-white font-inter font-[600] text-[13px] flex items-center justify-center gap-2'
            >
              {submitting ? <Loader2 className='w-5 h-5 animate-spin' /> : (
                <>
                  <span className='font-[600] text-[15px]'>Javoblarni yuborish</span>
                  <CircleCheck className='w-5 h-5' />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* SUCCESS MODAL */}
      {submitted && resultData && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
          <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='bg-[#1f2937] rounded-xl p-6 w-[320px] text-center shadow-lg'>
            <CheckCircle className='w-16 h-16 text-green-400 mx-auto mb-4' />
            <h1 className='text-white text-2xl font-bold mb-1'>Test yakunlandi!</h1>
            <p className='text-gray-300 mb-6'>Sizning natijangiz</p>

            <div className='bg-[#242f34] rounded-lg p-4 mb-6'>
              <div className='flex justify-between text-white text-lg mb-2'>
                <span>Umumiy ball:</span>
                <span className='font-bold text-green-400'>{resultData.total_score}</span>
              </div>
              <div className='flex justify-between text-white text-lg'>
                <span>To‘g‘ri javoblar:</span>
                <span className='font-bold'>{resultData.correct_answers}</span>
              </div>
            </div>

            <button onClick={closeModal} className='w-full h-[45px] rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold'>
              Yopish
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Dtm