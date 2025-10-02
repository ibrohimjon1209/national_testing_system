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
  const isEditing = !!location.state?.userProfile;

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    console.log("UserAgent:", userAgent);

    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.ready();
      setIsTelegramWebApp(true);
    } else if (/TelegramDesktop/i.test(userAgent)) {
      setIsTelegramWebApp(true);
    } else {
      window.location.href = "https://t.me/nsd_corporation";
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const checkTelegramUser = async () => {
      if (!isTelegramWebApp) return;

      const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

      if (!telegramId) {
        console.error("Telegram user ID not found");
        return;
      }

      try {
        const userData = await get_user(Number(telegramId));
        if (userData?.data) {
          const user = userData.data;
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
          if (location.pathname === "/register" && !location.state?.userProfile) {
            navigate("/");
          }
        } else {
          const userProfile = localStorage.getItem("userProfile");
          if (!userProfile && location.pathname !== "/register") {
            navigate("/register");
          }
        }
      } catch (error) {
        const userProfile = localStorage.getItem("userProfile");
        if (!userProfile && location.pathname !== "/register") {
          navigate("/register");
        }
        console.error("Failed to fetch user:", error);
      }
    };

    checkTelegramUser();
  }, [isTelegramWebApp, location.pathname, navigate, location.state?.userProfile]);

  // Loading component o'zgarishi
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-[#1a2328] text-[#e2e8f0] text-center p-10">
        <h1 className="text-2xl font-bold mb-4">Yuklanmoqda...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a90e2]"></div>
      </div>
    );
  }

  // Telegram Web App warning o'zgarishi
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
          <Route path="/" element={<Subject_list />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/test/:id" element={<Single_subject />}></Route>
          <Route path="/create_test" element={<Create_test />}></Route>
          <Route path="/send_test" element={<Send_test />}></Route>
          <Route
            path="*"
            element={
              <div className="text-white text-center p-10">404 Not Found</div>
            }
          />
        </Routes>
        <div className=""></div>
      </div>
      <div className="fixed w-full mt-[90vh]">
        {location.pathname !== "/sign_in" &&
          location.pathname !== "/404" &&
          location.pathname !== "/register" && <Navbar />}
      </div>
    </div>
  );
};

export default App;
