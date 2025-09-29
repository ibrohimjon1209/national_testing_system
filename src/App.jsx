import { Route, Routes, useLocation } from "react-router-dom";
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
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(false);
  const isEditing = !!location.state?.userProfile

  useEffect(() => {
    const checkTelegramWebApp = async () => {
      if (true) { // window.Telegram && window.Telegram.WebApp
        setIsTelegramWebApp(true);
        // window.Telegram.WebApp.ready();

        const telegramId = 534534; // window.Telegram.WebApp.initDataUnsafe?.user?.id

        if (telegramId) {
          try {
            const userData = await get_user(Number(telegramId));
            if (userData) {
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
              setIsFirstTime(false);
              if (!isEditing && location.pathname === "/register") {
                window.location.replace("/");
              }
            }
          } catch (error) {
            console.error("Failed to fetch user:", error);
          }
        }
      } else {
        setTimeout(() => {
          window.location.href = "https://t.me/milliy_test_sertifikat_bot";
        }, 5000);
      }
    };

    const checkUserProfile = () => {
      const profile = localStorage.getItem("userProfile");
      if (profile) {
        try {
          const parsedProfile = JSON.parse(profile);
          // If we have telegram_id in profile, verify it matches current user
          if (parsedProfile.telegram_id) {
            const currentTelegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
            if (currentTelegramId && parsedProfile.telegram_id !== currentTelegramId) {
              // If telegram IDs don't match, clear profile and set as first time
              localStorage.removeItem("userProfile");
              setIsFirstTime(true);
              return;
            }
          }
          setIsFirstTime(false);
        } catch (e) {
          localStorage.removeItem("userProfile");
          setIsFirstTime(true);
        }
      } else {
        setIsFirstTime(true);
      }
    };

    checkTelegramWebApp();
    checkUserProfile();
  }, [location.pathname]);

  useEffect(() => {
    if (isTelegramWebApp && isFirstTime && location.pathname === "/") {
      window.location.replace("/register");
    }
  }, [isFirstTime, location.pathname, isTelegramWebApp]);

  if (!isTelegramWebApp) {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-[#0f1419] text-white text-center p-10">
        <h1 className="text-2xl font-bold mb-4">
          Bu sayt faqat Telegram Web App uchun
        </h1>
        <p className="mb-6 text-xl">Yo'naltirilmoqda...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a90e2]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-auto justify-between items-center overflow-hidden overflow-y-auto">
      <div className="w-full h-full pb-[130px] bg-[#0f1419] mx-auto flex flex-col items-center justify-between">
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
      <div className="fixed w-full mt-[90vh] ">
        {location.pathname !== "/sign_in" &&
          location.pathname !== "/404" &&
          location.pathname !== "/register" && <Navbar />}
      </div>
    </div>
  );
};

export default App;
