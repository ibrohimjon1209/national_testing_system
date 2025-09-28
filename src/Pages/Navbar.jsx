import { BookCheck, Plus, Send, User } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

const Navbar = () => {
  const location = useLocation()
  const [hasProfile, setHasProfile] = useState(false)
  const [telegramPhoto, setTelegramPhoto] = useState(null)

  useEffect(() => {
    const profile = localStorage.getItem("userProfile")
    setHasProfile(!!profile)

    // Try to get Telegram user photo if available
    if (window.Telegram && window.Telegram.WebApp) {
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user
      if (tgUser && tgUser.photo_url) {
        setTelegramPhoto(tgUser.photo_url)
      }
    }
  }, [location])

  const links = [
    { to: "/", icon: BookCheck, label: "Testlar" },
    { to: "/create_test", icon: Plus, label: "Yaratish" },
    { to: "/send_test", icon: Send, label: "Javob yuborish" },
    {
      to: hasProfile ? "/profile" : "/register",
      icon: User,
      label: "Profile",
      isProfile: true,
    },
  ]

  return (
    <div className="w-full h-[84px] bg-white shadow-modern-lg border-t border-secondary flex items-center justify-around">
      {links.map(({ to, icon: Icon, label, isProfile }) => {
        const isActive = location.pathname === to
        return (
          <Link to={to} key={to}>
            <div
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors duration-200 cursor-pointer
              ${isActive ? "bg-secondary" : "hover:bg-secondary"}`}
            >
              {isProfile && telegramPhoto ? (
                <div className="w-6 h-6 mb-1 rounded-full overflow-hidden">
                  <img src={telegramPhoto || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                <Icon className={`w-6 h-6 mb-1 ${isActive ? "text-accent" : "text-muted"}`} />
              )}
              <span className={`text-xs font-medium ${isActive ? "text-accent" : "text-muted"}`}>{label}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Navbar
