"use client"

import { useState, useEffect } from "react"
import { User, Phone, MapPin, Building, Edit } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate()
  const [userProfile, setUserProfile] = useState(null)
  const [telegramPhoto, setTelegramPhoto] = useState(null)

  useEffect(() => {
    // Get user profile from localStorage
    const profile = localStorage.getItem("userProfile")
    if (profile) {
      setUserProfile(JSON.parse(profile))
    } else {
      // If no profile, redirect to register
      navigate("/register")
    }

    // Try to get Telegram user photo if available
    if (window.Telegram && window.Telegram.WebApp) {
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user
      if (tgUser && tgUser.photo_url) {
        setTelegramPhoto(tgUser.photo_url)
      }
    }
  }, [navigate])

  const handleEdit = () => {
    navigate("/register")
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-[#1a2328] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a90e2] mx-auto mb-4"></div>
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a2328] p-4 pb-[130px]">
      <div className="max-w-md mx-auto">
        <div className="bg-[#2d3a42] rounded-2xl shadow-modern-lg overflow-hidden border border-[#3a4a54]">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#4a90e2] to-[#357abd] p-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {telegramPhoto ? (
                <img src={telegramPhoto || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-white flex items-center justify-center">
                  <User className="w-12 h-12 text-[#4a90e2]" />
                </div>
              )}
            </div>
            <h1 className="text-xl font-bold text-white">
              {userProfile.firstName} {userProfile.lastName}
            </h1>
            <p className="text-white/80 text-sm">{userProfile.middleName}</p>
          </div>

          {/* Profile Info */}
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-[#1a2328] rounded-xl border border-[#3a4a54]">
              <Phone className="w-5 h-5 text-[#4a90e2]" />
              <div>
                <p className="text-xs text-gray-400 font-medium">Telefon raqam</p>
                <p className="text-white font-semibold">{userProfile.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-[#1a2328] rounded-xl border border-[#3a4a54]">
              <MapPin className="w-5 h-5 text-[#4a90e2]" />
              <div>
                <p className="text-xs text-gray-400 font-medium">Viloyat</p>
                <p className="text-white font-semibold">{userProfile.region}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-[#1a2328] rounded-xl border border-[#3a4a54]">
              <Building className="w-5 h-5 text-[#4a90e2]" />
              <div>
                <p className="text-xs text-gray-400 font-medium">Tuman</p>
                <p className="text-white font-semibold">{userProfile.district}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 pt-0">
            <button
              onClick={handleEdit}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#4a90e2] to-[#357abd] text-white py-3 rounded-xl font-semibold hover:from-[#357abd] hover:to-[#2968a3] transition-all duration-200 shadow-lg"
            >
              <Edit className="w-5 h-5" />
              <span>Ma'lumotlarni tahrirlash</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
