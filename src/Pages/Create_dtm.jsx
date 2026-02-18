import { ChevronLeft, ChevronRight, CircleQuestionMark, Check, CircleCheck, Copy } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Create_dtm = () => {
    // Hard-coded subjects list
    const subjects = [
        { id: 1, name: 'Matematika' },
        { id: 2, name: 'Fizika' },
        { id: 3, name: 'Ingliz tili' },
        { id: 4, name: 'Arab tili' },
        { id: 5, name: 'Biologiya' },
        { id: 6, name: 'Kimyo' },
        { id: 7, name: 'Ona tili' },
        { id: 8, name: 'O‘zbekiston tarixi' },
    ]

    const [selectedMain1, setSelectedMain1] = useState('')
    const [selectedMain2, setSelectedMain2] = useState('')
    const [subjectError, setSubjectError] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [channelUsername, setChannelUsername] = useState('@')
    const [testDate, setTestDate] = useState('')
    const [channelError, setChannelError] = useState('')
    const [dateError, setDateError] = useState('')
    const [answers, setAnswers] = useState({})
    const [success, setSuccess] = useState(false)
    const [testId, setTestId] = useState(null)
    const [copied, setCopied] = useState(false)

    const telegramId = 5021533207
    const csrfToken = 'TVG6EjHSFo86g9nIoXbSYT0B5Q3PgHdBQS3gyM8FW8shMw4e2NQL2f6ehiadCBmT'

    const handleMain1Change = (e) => {
        const value = e.target.value
        setSelectedMain1(value)
        if (value === selectedMain2) {
            setSubjectError("Ikkita asosiy fan bir xil bo'lishi mumkin emas!")
        } else {
            setSubjectError('')
        }
    }

    const handleMain2Change = (e) => {
        const value = e.target.value
        setSelectedMain2(value)
        if (value === selectedMain1) {
            setSubjectError("Ikkita asosiy fan bir xil bo'lishi mumkin emas!")
        } else {
            setSubjectError('')
        }
    }

    const handleCheckbox = () => setIsChecked(!isChecked)

    const handleChannelChange = (e) => {
        let value = e.target.value
        if (!value.startsWith('@')) value = '@' + value.replace(/^@*/, '')
        if (value === '') value = '@'
        setChannelUsername(value)
        setChannelError(value.length < 2 ? "Username kamida 1 belgidan iborat bo'lishi kerak" : "")
    }

    const handleDateChange = (e) => {
        const value = e.target.value
        setTestDate(value)
        if (value) {
            const selected = new Date(value)
            const now = new Date()
            if (selected <= now) {
                setDateError("Test vaqti hozirgi vaqtdan keyin bo'lishi kerak")
            } else {
                setDateError("")
            }
        } else {
            setDateError("")
        }
    }

    const handleAnswerChange = (key, option) => {
        setAnswers(prev => ({ ...prev, [key]: option }))
    }

    const renderOptions = (questionNumber, block) => {
        const options = ['A', 'B', 'C', 'D']
        return options.map((option) => (
            <td key={option} className='border border-gray-600 text-center'>
                <div className='flex justify-center'>
                    <input
                        type='radio'
                        name={`${block}-question-${questionNumber}`}
                        checked={answers[`${block}-${questionNumber}`] === option}
                        onChange={() => handleAnswerChange(`${block}-${questionNumber}`, option)}
                        className='w-[18px] h-[18px] rounded-full appearance-none border border-gray-500 cursor-pointer transition-transform duration-150 ease-in-out active:scale-[97%] checked:bg-blue-500 checked:border-blue-500'
                    />
                </div>
            </td>
        ))
    }

    const isFormValid = () => {
        if (!selectedMain1 || !selectedMain2 || selectedMain1 === selectedMain2) return false
        const allKeys = []
        for (let i = 1; i <= 30; i++) allKeys.push(`main1-${i}`, `main2-${i}`)
        for (let i = 1; i <= 10; i++) allKeys.push(`ona-tili-${i}`, `matematika-${i}`, `tarix-${i}`)
        const allAnswered = allKeys.every(key => answers[key])
        if (!allAnswered) return false
        if (isChecked) {
            if (channelUsername.length < 2 || channelError || !testDate || dateError) return false
        }
        return true
    }

    const getEnglishKey = (fanName) => {
        const map = {
            "Ona tili": "mother_tongue",
            "Matematika": "mathematics",
            "O‘zbekiston tarixi": "uzbekistan_history",
            "Fizika": "physics",
            "Ingliz tili": "english_language",
            "Arab tili": "arabic_language",
            "Biologiya": "biology",
            "Kimyo": "chemistry",
        }
        return map[fanName] || fanName.toLowerCase().replace(/ /g, '_').replace(/‘/g, '')
    }

    const formatAnswers = () => {
        const answer = {}
        // Majburiy fanlar
        answer["ona_tili"] = { type: "mandatory", questions: {} }
        for (let i = 1; i <= 10; i++) {
            const ans = answers[`ona-tili-${i}`]
            if (ans) answer["ona_tili"].questions[i] = ans
        }
        answer["math_mandatory"] = { type: "mandatory", questions: {} }
        for (let i = 1; i <= 10; i++) {
            const ans = answers[`matematika-${i}`]
            if (ans) answer["math_mandatory"].questions[i + 10] = ans
        }
        answer["history"] = { type: "mandatory", questions: {} }
        for (let i = 1; i <= 10; i++) {
            const ans = answers[`tarix-${i}`]
            if (ans) answer["history"].questions[i + 20] = ans
        }
        // Asosiy fanlar
        const main1Key = getEnglishKey(selectedMain1)
        answer[main1Key] = { type: "optional", point_per_question: 3.1, questions: {} }
        for (let i = 1; i <= 30; i++) {
            const ans = answers[`main1-${i}`]
            if (ans) answer[main1Key].questions[i + 30] = ans
        }
        const main2Key = getEnglishKey(selectedMain2)
        answer[main2Key] = { type: "optional", point_per_question: 2.1, questions: {} }
        for (let i = 1; i <= 30; i++) {
            const ans = answers[`main2-${i}`]
            if (ans) answer[main2Key].questions[i + 60] = ans
        }
        return { telegram_id: telegramId, answer }
    }

    const handleCreate = async () => {
        if (!isFormValid()) return
        const payload = formatAnswers()
        console.log('Yuborilayotgan payload:', JSON.stringify(payload, null, 2))
        try {
            const response = await fetch('https://bot.milliy-test.uz/api/block-tests/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFTOKEN': csrfToken
                },
                body: JSON.stringify(payload)
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(JSON.stringify(errorData))
            }
            const data = await response.json()
            console.log('Test yaratildi:', data)
            setTestId(data.id || data.test_id || 'Noma\'lum ID')
            setSuccess(true)
        } catch (error) {
            console.error('Failed to create DTM test:', error)
            alert('Xatolik yuz berdi: ' + error.message)
        }
    }

    const copyToClipboard = () => {
        if (testId) {
            navigator.clipboard.writeText(testId)
                .then(() => {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                })
                .catch(err => console.error('Nusxa olishda xatolik:', err))
        }
    }

    return (
        <div className='w-full h-full relative'>
            <AnimatePresence mode="wait">
                {!success ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='w-full h-full'
                    >
                        <div className="header sticky top-0 w-full h-[150px] flex flex-col justify-center bg-gradient-to-b from-[-10%] to-[100%] from-[#3579bd] to-[#132a41] shadow-modern-lg z-10">
                            <div className='px-[35px] flex items-center justify-between'>
                                <Link to={'/create_test'}>
                                    <div className='w-[50px]'>
                                        <ChevronLeft className='text-white' />
                                    </div>
                                </Link>
                                <h1 className="text-white font-bold text-3xl text-center px-6 leading-tight mt-[10px]">
                                    DTM test yaratish
                                </h1>
                                <div className='w-[50px]'></div>
                            </div>
                        </div>

                        <div className='w-full h-full flex flex-col px-[7vw] mt-[25px]'>
                            {/* Asosiy fanlar tanlash */}
                            <div className='space-y-6'>
                                <div>
                                    <h1 className='text-white mb-[5px]'>Birinchi asosiy fan (30 savol)</h1>
                                    <select
                                        className='custom-select w-full h-[45px] px-[10px] rounded-[5px] border-white border-[1px] text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300'
                                        value={selectedMain1}
                                        onChange={handleMain1Change}
                                    >
                                        <option value="" disabled>-- Birinchi fanni tanlang --</option>
                                        {subjects.map((subject) => (
                                            <option key={subject.id} className='bg-[#242f34]' value={subject.name}>
                                                {subject.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <h1 className='text-white mb-[5px]'>Ikkinchi asosiy fan (30 savol)</h1>
                                    <select
                                        className='custom-select w-full h-[45px] px-[10px] rounded-[5px] border-white border-[1px] text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300'
                                        value={selectedMain2}
                                        onChange={handleMain2Change}
                                    >
                                        <option value="" disabled>-- Ikkinchi fanni tanlang --</option>
                                        {subjects.map((subject) => (
                                            <option key={subject.id} className='bg-[#242f34]' value={subject.name}>
                                                {subject.name}
                                            </option>
                                        ))}
                                    </select>
                                    {subjectError && <div className="text-red-500 text-sm mt-1">{subjectError}</div>}
                                </div>
                            </div>

                            <div className='mt-[30px]'>
                                {/* Asosiy fanlar jadvali */}
                                <div className='mb-10'>
                                    <h2 className='text-white text-lg font-bold mb-4'>Asosiy fanlar (30 savol)</h2>
                                    <div className='mb-8'>
                                        <h3 className='text-white text-md font-semibold mb-3'>
                                            Birinchi fan: {selectedMain1 || "Tanlanmagan"} (optional)
                                        </h3>
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
                                                        {renderOptions(i + 1, 'main1')}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <h3 className='text-white text-md font-semibold mb-3'>
                                            Ikkinchi fan: {selectedMain2 || "Tanlanmagan"} (optional)
                                        </h3>
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
                                                        {renderOptions(i + 1, 'main2')}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <hr className='border-gray-600 mb-8' />

                                {/* Majburiy fanlar */}
                                <div>
                                    <h2 className='text-white text-lg font-bold mb-4'>Majburiy fanlar (10 savol)</h2>
                                    <div className='mb-8'>
                                        <h3 className='text-white text-md font-semibold mb-3'>Ona tili (mandatory)</h3>
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
                                                        {renderOptions(i + 1, 'ona-tili')}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='mb-8'>
                                        <h3 className='text-white text-md font-semibold mb-3'>Matematika (mandatory)</h3>
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
                                                        {renderOptions(i + 1, 'matematika')}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <h3 className='text-white text-md font-semibold mb-3'>O‘zbekiston tarixi (mandatory)</h3>
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
                                                        {renderOptions(i + 1, 'tarix')}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Yaratish tugmasi */}
                                <button
                                    onClick={handleCreate}
                                    disabled={!isFormValid()}
                                    className={`mt-[40px] duration-150 w-full h-[45px] rounded-[5px] text-white font-inter font-[600] text-[13px] flex items-center justify-center gap-[5px] px-[15px]
                                      ${isFormValid()
                                            ? 'active:scale-[95%] active:bg-blue-300 bg-gradient-to-bl from-[-90%] to-[80%] from-[#3579bd] to-[#1b3b5b] shadow-modern-lg z-10'
                                            : 'bg-gray-500 cursor-not-allowed opacity-50'
                                        }`}
                                >
                                    <h1 className='font-[600] text-[15px]'>DTM testni yaratish</h1>
                                    <CircleCheck className='w-[20px] h-[20px]' />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className='w-full h-full flex flex-col items-center justify-center px-6'
                    >
                        <div className='text-center mt-[40px]'>
                            <CircleCheck className='w-24 h-24 text-blue-800 mx-auto mb-6' />
                            <h1 className='text-white text-4xl font-bold mb-4'>Muvaffaqiyatli yaratildi!</h1>
                            <p className='text-gray-300 text-lg mb-8'>Sizning DTM test muvaffaqiyatli yaratildi.</p>

                            <div className='bg-[#1f2937] rounded-xl p-6 w-full max-w-md mb-8'>
                                <p className='text-gray-400 mb-2'>Test ID:</p>
                                <div className='flex items-center justify-between bg-[#242f34] rounded-lg p-4'>
                                    <span className='text-white text-2xl font-mono'>{testId}</span>
                                    <button
                                        onClick={copyToClipboard}
                                        className='p-2 hover:bg-gray-700 rounded-full transition-colors'
                                    >
                                        {copied ? (
                                            <Check className='w-6 h-6 text-green-400' />
                                        ) : (
                                            <Copy className='w-6 h-6 text-gray-400' />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className='flex gap-4 w-full max-w-md'>
                                <Link to="/" className='flex-1'>
                                    <button className='w-full h-14 bg-[#23476b] hover:bg-blue-700 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-3 transition-colors'>
                                        <ChevronLeft className='w-6 h-6' />
                                        Bosh sahifaga
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Create_dtm