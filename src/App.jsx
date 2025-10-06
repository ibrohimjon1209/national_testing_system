import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Subject_list from "./Pages/Subject_list";
import Create_test from "./Pages/Create_test";
import Send_test from "./Pages/Send_test";
import Navbar from "./Pages/Navbar";
import Single_subject from "./Pages/Single_subject";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import get_user from "./Services/get_user";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Telegram aniqlash
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.ready();
      setIsTelegramWebApp(true);
    } else if (/TelegramDesktop/i.test(userAgent)) {
      setIsTelegramWebApp(true);
    } else {
      window.location.href = "https://t.me/nsd_corporation";
    }
  }, []);

  // ✅ Foydalanuvchini tekshirish
  useEffect(() => {
    const checkTelegramUser = async () => {
      if (!isTelegramWebApp) return;

      const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

      if (!telegramId) {
        console.error("Telegram user ID not found");
        navigate("/register");
        return;
      }

      try {
        const response = await get_user(Number(telegramId));
        const user = response?.data;

        if (user) {
          // ✅ localStorage ga yozish
          localStorage.setItem(
            "userProfile",
            JSON.stringify({
              firstName: user.name || "",
              lastName: user.surname || "",
              middleName: user.father_name || "",
              phone: user.phone || "+998",
              region: user.region || "",
              district: user.district || "",
              id: user.id,
              telegram_id: user.telegram_id,
            })
          );

          // Agar foydalanuvchi Register sahifasida bo‘lsa → asosiy sahifaga o‘tkaz
          if (location.pathname === "/register") navigate("/");
        } else {
          // Foydalanuvchi topilmadi → Register sahifasiga
          localStorage.removeItem("userProfile");
          navigate("/register");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem("userProfile");
        navigate("/register");
      } finally {
        setIsLoading(false);
      }
    };

    checkTelegramUser();

    const timeoutId = setTimeout(() => {
      if (isLoading) {
        window.location.href = "https://t.me/nsd_corporation";
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [isTelegramWebApp, location.pathname, navigate, isLoading]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-[#1a2328] text-[#e2e8f0] text-center p-10">
        <h1 className="text-2xl font-bold mb-4">Yuklanmoqda...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a90e2]"></div>
      </div>
    );
  }

  if (!isTelegramWebApp) {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-[#1a2328] text-[#e2e8f0] text-center p-10">
        <h1 className="text-2xl font-bold mb-4">
          Bu sayt faqat Telegram Web App uchun
        </h1>
        <p className="mb-6 text-xl">Telegram botga yo'naltirilmoqda...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a90e2]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-auto justify-between items-center overflow-hidden overflow-y-auto">
      <div className="w-full h-full pb-[100px] bg-[#1a2328] mx-auto flex flex-col items-center justify-between">
        <Routes>
          <Route path="/" element={<Subject_list />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test/:id" element={<Single_subject />} />
          <Route path="/create_test" element={<Create_test />} />
          <Route path="/send_test" element={<Send_test />} />
          <Route
            path="*"
            element={
              <div className="text-white text-center p-10">404 Not Found</div>
            }
          />
        </Routes>
      </div>

      {location.pathname !== "/register" && (
        <div className="fixed w-full bottom-0">
          <Navbar />
        </div>
      )}
    </div>
  );
};

export default App;