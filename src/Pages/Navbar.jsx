import { BookCheck, Plus, Send, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import dtm_logo from './../Pages/images/dtm.png';

const Navbar = () => {
  const location = useLocation();
  const [hasProfile, setHasProfile] = useState(false);
  const [telegramPhoto, setTelegramPhoto] = useState(null);

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    setHasProfile(!!profile);
    // Try to get Telegram user photo if available
    if (window.Telegram && window.Telegram.WebApp) {
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (tgUser && tgUser.photo_url) {
        setTelegramPhoto(tgUser.photo_url);
      }
    }
  }, [location]);

  const links = [
    { to: "/", icon: BookCheck, label: "Testlar" },
    { to: "/dtm", icon: dtm_logo, label: "DTM", isImage: true },
    { to: "/create_test", icon: Plus, label: "Yaratish" },
    { to: "/send_test", icon: Send, label: "Yuborish" },
    {
      to: hasProfile ? "/profile" : "/register",
      icon: User,
      label: "Profile",
      isProfile: true,
    },
  ];

  return (
    <div className="w-full h-[84px] bg-[#1a2328] shadow-modern-lg border-t border-[#3a4a54] flex items-center justify-around">
      {links.map(({ to, icon: Icon, label, isProfile, isImage }) => {
        const isActive = location.pathname === to;
        return (
          <Link to={to} key={to}>
            <div
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors duration-200 cursor-pointer
              ${isActive ? "bg-[#2d3a42]" : "hover:bg-[#2d3a42]"}`}
            >
              {isProfile && telegramPhoto ? (
                <div className="w-6 h-6 mb-1 rounded-full overflow-hidden">
                  <img src={telegramPhoto || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : isImage ? (
                <img
                  src={Icon}
                  alt={label}
                  className={`w-6 h-6 mb-1 ${isActive ? "text-[#4a90e2]" : "text-[#94a3b8]"}`} // 'text-' classlari rasm uchun kerak emas, lekin saqlab qo'ydim agar filter yoki boshqa narsa bo'lsa
                />
              ) : (
                <Icon className={`w-6 h-6 mb-1 ${isActive ? "text-[#4a90e2]" : "text-[#94a3b8]"}`} />
              )}
              <span className={`text-xs font-medium ${isActive ? "text-[#4a90e2]" : "text-[#94a3b8]"}`}>{label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;