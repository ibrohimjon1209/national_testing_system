import { CircleQuestionMark, Check, CircleCheck, ChevronLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { motion, AnimatePresence } from 'framer-motion'
import get_subjects from '../Services/get_subjects'
import create_test from '../Services/create_test'

const Create_test = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [answers, setAnswers] = useState({})
  const [errors, setErrors] = useState({})
  const [subjects, set_subjects] = useState([])
  const [channelError, setChannelError] = useState("")
  const [dateError, setDateError] = useState("")
  const [testDate, setTestDate] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const startMultiQuestions = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]

  useEffect(() => {
    const fetch_subjects = async () => {
      try {
        const data = await get_subjects();
        set_subjects(data.results || []);
      } catch (e) {
        console.error("Failed to fetch subjects", e);
        set_subjects([]);
      }
    };
    fetch_subjects();
  }, []);

  // order of questions (allows moving a "removed" question to the end)
  const [questionsOrder, setQuestionsOrder] = useState([...startMultiQuestions])

  // Initial state setup for multiCounts and multiValues
  // Initialize with count 1 instead of 0
  const [multiCounts, setMultiCounts] = useState(
    startMultiQuestions.reduce((acc, q) => ({ ...acc, [q]: 1 }), {})
  )

  // Initialize with one empty string for each question
  const [multiValues, setMultiValues] = useState(
    startMultiQuestions.reduce((acc, q) => ({ ...acc, [q]: [''] }), {})
  )

  // Synchronize multiValues with multiCounts to ensure length matches
  useEffect(() => {
    setMultiValues(prev => {
      const newVals = { ...prev };
      questionsOrder.forEach(q => {
        const count = multiCounts[q] ?? 0;
        let arr = prev[q] || [];

        if (count === 0) {
          newVals[q] = [];
        } else {
          // Trim if too long, fill with '' if too short
          arr = arr.slice(0, count);
          while (arr.length < count) {
            arr.push('');
          }
          newVals[q] = arr;
        }
      });
      return newVals;
    });
  }, [multiCounts, questionsOrder]);

  const increaseCount = (question) => {
    setMultiCounts(prev => {
      const curr = prev[question] ?? 0
      if (curr >= 45) return prev
      const nextCount = curr + 1
      // ensure values array has slot
      setMultiValues(vals => {
        const arr = vals[question] ? [...vals[question]] : []
        arr.push('')
        return { ...vals, [question]: arr }
      })

      // If coming back from 0, place after the last active question
      if (curr === 0) {
        setQuestionsOrder(prevOrder => {
          const without = prevOrder.filter(x => x !== question)
          const activeQuestions = without.filter(q => (multiCounts[q] ?? 0) > 0)

          if (activeQuestions.length === 0) {
            return [question, ...without]
          }

          const insertIndex = without.indexOf(activeQuestions[activeQuestions.length - 1]) + 1
          return [
            ...without.slice(0, insertIndex),
            question,
            ...without.slice(insertIndex)
          ]
        })
      }

      return { ...prev, [question]: nextCount }
    })
  }

  const decreaseCount = (question) => {
    setMultiCounts(prev => {
      const curr = prev[question] ?? 0
      if (curr <= 0) return prev
      const next = curr - 1

      setMultiValues(vals => {
        const arr = vals[question] ? [...vals[question]] : []
        arr.pop()
        return { ...vals, [question]: next === 0 ? [] : (arr.length ? arr : ['']) }
      })

      // If count becomes 0, move question to the end
      if (next === 0) {
        setQuestionsOrder(prevOrder => {
          const currentIndex = prevOrder.indexOf(question);
          const newOrder = [...prevOrder];

          for (let i = currentIndex; i < newOrder.length - 1; i++) {
            newOrder[i] = newOrder[i + 1];
          }
          newOrder[newOrder.length - 1] = question;

          return newOrder;
        });
      }

      return { ...prev, [question]: next }
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

  const [channelUsername, setChannelUsername] = useState("@");

  const handleChannelChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("@")) {
      value = "@" + value.replace(/^@*/, "");
    }
    if (value === "") {
      value = "@";
    }
    setChannelUsername(value);
    if (value.length < 2) {
      setChannelError("Username kamida 1 belgidan iborat bo'lish kerak");
    } else {
      setChannelError("");
    }
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setTestDate(value);
    if (value) {
      const selected = new Date(value);
      const now = new Date();
      const timeDifference = selected.getTime() - now.getTime();
      if (timeDifference <= 0) {
        setDateError("Test vaqti hozirgi vaqtdan keyin bo'lishi kerak");
      } else {
        setDateError("");
      }
    } else {
      setDateError("");
    }
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  }

  const isFormValid = () => {
    if (!selectedSubject) return false;

    const singleAnswersValid = Array.from({ length: 32 }, (_, i) => i + 1)
      .every(i => answers[i]);

    if (!singleAnswersValid) return false;

    const multipleChoiceValid = Array.from({ length: 3 }, (_, i) => i + 33)
      .every(i => answers[i]);

    if (!multipleChoiceValid) return false;

    const writtenAnswersValid = questionsOrder.every(q => {
      const count = multiCounts[q] ?? 0;
      const rawValues = multiValues[q] || [];
      const values = rawValues.slice(0, count); // Safety trim

      return count === 0 || (
        values.length === count &&
        values.every(value => value?.trim().length > 0)
      );
    });

    if (!writtenAnswersValid) return false;

    if (isChecked) {
      if (channelUsername.length < 2) return false;
      if (!testDate) return false;
      if (channelError || dateError) return false;
    }

    return true;
  }

  const formatAnswers = () => {
    const formattedAnswers = {};

    for (let i = 1; i <= 35; i++) {
      if (answers[i]) {
        formattedAnswers[i] = answers[i].toUpperCase();
      }
    }

    for (let idx = 0; idx < questionsOrder.length; idx++) {
      const originalQ = questionsOrder[idx]
      const count = multiCounts[originalQ] ?? 0

      if (count > 0) {
        const rawValues = multiValues[originalQ] || []
        const values = rawValues.slice(0, count) // Safety trim
        const isComplete = values.length === count &&
          values.every(value => value && value.trim().length > 0)

        if (isComplete) {
          formattedAnswers[36 + idx] = {}
          values.forEach((value, index) => {
            formattedAnswers[36 + idx][index + 1] = value.trim().toUpperCase()
          })
        }
      }
    }

    return formattedAnswers;
  };

  const handleCreate = async () => {
    let newErrors = {}
    for (let idx = 0; idx < questionsOrder.length; idx++) {
      const q = questionsOrder[idx]
      const vals = multiValues[q] || []
      if ((multiCounts[q] ?? 0) > 0) {
        vals.forEach((value, i) => {
          if (!value.trim()) {
            newErrors[`${q}-${i}`] = true
          }
        })
      }
    }

    if (isChecked) {
      if (channelUsername.length < 2) {
        setChannelError("Username kamida 1 belgidan iborat bo'lish kerak");
        return;
      }
      if (dateError) {
        return;
      }
      if (!testDate) {
        setDateError("Sanani tanlang");
        return;
      }
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      const formattedAnswers = formatAnswers();
      try {
        const selectedSubjectData = subjects.find(s => s.name === selectedSubject);
        if (!selectedSubjectData) {
          console.error('Selected subject not found');
          return;
        }

        let formattedDate = null;
        if (isChecked && testDate) {
          const date = new Date(testDate);
          formattedDate = date.toISOString().slice(0, -1) + "+05:00";
        }

        await create_test(
          formattedAnswers,
          selectedSubjectData,
          isChecked,
          isChecked ? channelUsername : null,
          formattedDate
        );

        window.location.href = "/"
      } catch (error) {
        console.error('Failed to create test:', error);
      }
    }
  }

  return (
    <div className='w-full h-full'>
      <div className="header sticky top-0 w-full h-[120px] flex flex-col justify-center bg-gradient-to-b from-[-10%] to-[100%] from-[#3579bd] to-[#132a41] shadow-modern-lg z-10">
        <div className='mt-[0px] px-[35px] flex  items-center justify-between'>
          <Link to={'/create_test' } className='w-[50px] flex items-center'>
              <ChevronLeft />
          </Link>

          <h1 className="text-white font-bold text-2xl text-center px-6 leading-tight mt-[10px]">
            Test yaratish
          </h1>
          <div className='w-[50px]'></div>
        </div>
      </div>

      <div className='w-full h-full flex flex-col px-[7vw] mt-[25px]'>
        <div>
          <h1 className='text-white mb-[5px]'>Fanni tanlang</h1>
          <select
            className='custom-select w-full h-[45px] px-[10px] rounded-[5px] border-white border-[1px] text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300'
            defaultValue=""
            onChange={handleSubjectChange}
          >
            <option value="" disabled>--Fanni tanlang--</option>
            {subjects.map((subject) => (
              <option key={subject.id} className='bg-[#242f34]' value={subject.name}>{subject.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCheckbox}
          className='active:scale-[97%] active:bg-[#695db6] duration-150 mt-[10px] w-full h-[45px] bg-gradient-to-bl from-[-90%] to-[80%] from-[#3579bd] to-[#1b3b5b] rounded-[5px] text-white font-inter font-[600] text-[13px] flex items-center justify-between px-[15px]'
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
                  value={channelUsername}
                  onChange={handleChannelChange}
                  placeholder='@username'
                  className={`custom-select w-full h-[45px] px-[10px] rounded-[5px] border-white border-[1px] text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300 ${channelError ? "border-red-500" : ""}`}
                />
                {channelError && <div className="text-red-500 text-sm mt-1">{channelError}</div>}
              </div>

              <div className='mt-[10px]'>
                <h1 className='text-white mb-[5px] text-[15px] font-[400]'>
                  Test qachon o'tkaziladi?
                </h1>
                <input
                  type='datetime-local'
                  value={testDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().slice(0, 16)}
                  className={`[color-scheme:dark] custom-select w-full h-[45px] px-[10px] rounded-[5px] border-white border-[1px] text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300 ${dateError ? "border-red-500" : ""}`}
                />
                {dateError && <div className="text-red-500 text-sm mt-1">{dateError}</div>}
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
            {questionsOrder.map((originalQ, orderIdx) => {
              const count = multiCounts[originalQ] ?? 0
              const values = multiValues[originalQ] || []
              const displayNumber = 36 + orderIdx
              return (
                <div key={`multi-${originalQ}`} className='bg-[#1b1f22] border border-gray-700 rounded-md p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='text-white font-[600]'>{displayNumber}-savol</div>

                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => increaseCount(originalQ)}
                          className='w-8 h-8 rounded-md bg-gradient-to-bl from-[-30%] to-[90%] from-[#3579bd] to-[#1b3b5b] text-white flex items-center justify-center text-lg shadow'
                          disabled={(count) >= 45}
                        >
                          +
                        </button>
                        <button
                          onClick={() => decreaseCount(originalQ)}
                          className='w-8 h-8 rounded-md bg-[#ef4444] text-white flex items-center justify-center text-lg shadow'
                          disabled={(count) <= 0}
                        >
                          -
                        </button>
                      </div>
                    </div>

                    <div className='text-sm text-gray-300'>Jami: {count}</div>
                  </div>

                  <div className='mt-4 space-y-3'>
                    {count > 0 ? (
                      Array.from({ length: count }, (_, idx) => (
                        <div key={`${originalQ}-${idx}`} className='flex items-center gap-3'>
                          <div className='w-[26px] text-white text-[14px] font-[600]'>{idx + 1})</div>
                          <input
                            value={values[idx] ?? ''}
                            onChange={(e) => handleMultiValueChange(originalQ, idx, e.target.value)}
                            placeholder='JAVOBNI KIRITIG'
                            className={`w-full h-[42px] px-3 uppercase rounded-[6px] border 
                              ${errors[`${originalQ}-${idx}`] ? 'border-red-500' : 'border-gray-600'} 
                              bg-[#242f34] text-white placeholder:text-gray-400`}
                          />
                        </div>
                      ))
                    ) : (
                      <div className='text-gray-400 italic'>Javoblar mavjud emas</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={handleCreate}
            disabled={!isFormValid()}
            className={`mt-[30px] duration-150 w-full h-[45px] rounded-[5px] text-white font-inter font-[600] text-[13px] flex items-center justify-center gap-[5px] px-[15px]
              ${isFormValid()
                ? 'active:scale-[95%] active:bg-blue-300 bg-gradient-to-bl from-[-90%] to-[80%] from-[#3579bd] to-[#1b3b5b] shadow-modern-lg z-10'
                : 'bg-gray-500 cursor-not-allowed opacity-50'
              }`}
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