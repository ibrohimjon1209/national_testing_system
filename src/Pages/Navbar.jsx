import { BookCheck, Plus, Send } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
  const location = useLocation()

  const links = [
    { to: "/", icon: BookCheck, label: "Testlar" },
    { to: "/create_test", icon: Plus, label: "Yaratish" },
    { to: "/send_test", icon: Send, label: "Javob yuborish" }
  ]

  return (
    <div className="w-full h-[84px] bg-white shadow-modern-lg border-t border-secondary flex items-center justify-around px-4">
      {links.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to
        return (
          <Link to={to} key={to}>
            <div
              className={`flex flex-col items-center w-[120px] justify-center p-3 rounded-xl transition-colors duration-200 cursor-pointer
              ${isActive ? "bg-secondary" : "hover:bg-secondary"}`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? "text-accent" : "text-muted"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-accent" : "text-muted"}`}>
                {label}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Navbar
