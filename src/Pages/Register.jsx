"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Phone, MapPin, Building } from "lucide-react"

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "+998",
    region: "",
    district: "",
  })

  const regions = {
    Toshkent: [
      "Bekobod",
      "Bo'stonliq",
      "Bo'ka",
      "Chinoz",
      "Qibray",
      "Oqqo'rg'on",
      "Ohangaron",
      "Parkent",
      "Piskent",
      "Quyi Chirchiq",
      "Toshkent",
      "O'rta Chirchiq",
      "Yangiobod",
      "Yuqori Chirchiq",
      "Zangiota",
    ],
    Andijon: [
      "Andijon",
      "Asaka",
      "Baliqchi",
      "Bo'z",
      "Buloqboshi",
      "Izboskan",
      "Jalaquduq",
      "Marhamat",
      "Oltinko'l",
      "Paxtaobod",
      "Qo'rg'ontepa",
      "Shahrixon",
      "Ulug'nor",
      "Xo'jaobod",
    ],
    Buxoro: [
      "Buxoro",
      "G'ijduvon",
      "Jondor",
      "Kogon",
      "Olot",
      "Peshku",
      "Qorako'l",
      "Qorovulbozor",
      "Romitan",
      "Shofirkon",
      "Vobkent",
    ],
    "Farg'ona": [
      "Beshariq",
      "Bog'dod",
      "Buvayda",
      "Dang'ara",
      "Farg'ona",
      "Furkat",
      "Oltiariq",
      "Qo'shtepa",
      "Quva",
      "Rishton",
      "So'x",
      "Toshloq",
      "Uchko'prik",
      "Uzbekiston",
      "Yozyovon",
    ],
    Jizzax: [
      "Arnasoy",
      "Baxtiyor",
      "Dostlik",
      "Forish",
      "G'allaorol",
      "Jizzax",
      "Mirzacho'l",
      "Paxtakor",
      "Yangiobod",
      "Zafarobod",
      "Zarbdor",
      "Zomin",
    ],
    Xorazm: [
      "Bog'ot",
      "Gurlan",
      "Hazorasp",
      "Khiva",
      "Qo'shko'pir",
      "Shovot",
      "Urganch",
      "Xonqa",
      "Yangiariq",
      "Yangibozor",
    ],
    Namangan: [
      "Chortoq",
      "Chust",
      "Kosonsoy",
      "Mingbuloq",
      "Namangan",
      "Norin",
      "Pop",
      "To'raqo'rg'on",
      "Uchqo'rg'on",
      "Uychi",
      "Yangiqo'rg'on",
    ],
    Navoiy: [
      "Kanimex",
      "Karmana",
      "Konimex",
      "Navbahor",
      "Navoiy",
      "Nurota",
      "Qiziltepa",
      "Tomdi",
      "Uchquduq",
      "Xatirchi",
    ],
    Qashqadaryo: [
      "Chiroqchi",
      "Dehqonobod",
      "G'uzor",
      "Kasbi",
      "Kitob",
      "Koson",
      "Mirishkor",
      "Muborak",
      "Nishon",
      "Qamashi",
      "Qarshi",
      "Shahrisabz",
      "Yakkabog'",
    ],
    "Qoraqalpog'iston": [
      "Amudaryo",
      "Beruniy",
      "Chimboy",
      "Ellikqal'a",
      "Kegeyli",
      "Mo'ynoq",
      "Nukus",
      "Qanliko'l",
      "Qoraozak",
      "Shumanay",
      "Taxtako'pir",
      "To'rtko'l",
      "Xo'jayli",
    ],
    Samarqand: [
      "Bulung'ur",
      "Ishtixon",
      "Jomboy",
      "Kattaqo'rg'on",
      "Narpay",
      "Nurobod",
      "Oqdaryo",
      "Payariq",
      "Pastdarg'om",
      "Qo'shrabot",
      "Samarqand",
      "Toyloq",
      "Urgut",
    ],
    Sirdaryo: ["Boyovut", "Guliston", "Mirzaobod", "Oqoltin", "Sardoba", "Sayxunobod", "Sirdaryo", "Xovos"],
    Surxondaryo: [
      "Angor",
      "Bandixon",
      "Boysun",
      "Denov",
      "Jarqo'rg'on",
      "Muzrabot",
      "Oltinsoy",
      "Qiziriq",
      "Qumqo'rg'on",
      "Sariosiyo",
      "Sherobod",
      "Sho'rchi",
      "Termiz",
      "Uzun",
    ],
    "Toshkent shahri": [
      "Bektemir",
      "Chilonzor",
      "Mirobod",
      "Mirzo Ulug'bek",
      "Olmazor",
      "Sergeli",
      "Shayxontohur",
      "Uchtepa",
      "Yakkasaroy",
      "Yashnobod",
      "Yunusobod",
    ],
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "phone") {
      // Ensure phone always starts with +998
      if (!value.startsWith("+998")) {
        return
      }
      // Limit to +998 + 9 digits
      if (value.length > 13) {
        return
      }
    }

    if (name === "region") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        district: "", // Reset district when region changes
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.middleName ||
      !formData.phone ||
      formData.phone.length !== 13 ||
      !formData.region ||
      !formData.district
    ) {
      alert("Iltimos, barcha maydonlarni to'ldiring!")
      return
    }

    // Save to localStorage
    localStorage.setItem("userProfile", JSON.stringify(formData))

    // Navigate to home
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-[#1a2328] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#2d3a42] rounded-2xl shadow-modern-lg p-6 border border-[#3a4a54]">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#4a90e2] to-[#357abd] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Ro'yxatdan o'tish</h1>
          <p className="text-gray-300 mt-2">Ma'lumotlaringizni kiriting</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Ism</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#1a2328] border border-[#3a4a54] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent text-white placeholder-gray-400"
              placeholder="Ismingizni kiriting"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Familiya</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#1a2328] border border-[#3a4a54] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent text-white placeholder-gray-400"
              placeholder="Familiyangizni kiriting"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Sharif</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#1a2328] border border-[#3a4a54] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent text-white placeholder-gray-400"
              placeholder="Sharifingizni kiriting"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Telefon raqam</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-[#1a2328] border border-[#3a4a54] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent text-white placeholder-gray-400"
                placeholder="+998901234567"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Viloyat</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-[#1a2328] border border-[#3a4a54] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent appearance-none text-white"
                required
              >
                <option value="" className="bg-[#1a2328] text-gray-400">
                  Viloyatni tanlang
                </option>
                {Object.keys(regions).map((region) => (
                  <option key={region} value={region} className="bg-[#1a2328] text-white">
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Tuman</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-[#1a2328] border border-[#3a4a54] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent appearance-none text-white"
                required
                disabled={!formData.region}
              >
                <option value="" className="bg-[#1a2328] text-gray-400">
                  Tumanni tanlang
                </option>
                {formData.region &&
                  regions[formData.region]?.map((district) => (
                    <option key={district} value={district} className="bg-[#1a2328] text-white">
                      {district}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4a90e2] to-[#357abd] text-white py-3 rounded-xl font-semibold hover:from-[#357abd] hover:to-[#2968a3] transition-all duration-200 mt-6 shadow-lg"
          >
            Ro'yxatdan o'tish
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
