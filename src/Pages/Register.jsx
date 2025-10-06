import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import register from "../Services/register";
import get_user from "../Services/get_user";
import update_user from "../Services/update_user";
import { Building, MapPin, Phone, User } from "lucide-react";
import get_subjects from "../Services/get_subjects";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [s, ss] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "+998",
    region: "",
    district: "",
    id: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    Sirdaryo: [
      "Boyovut",
      "Guliston",
      "Mirzaobod",
      "Oqoltin",
      "Sardoba",
      "Sayxunobod",
      "Sirdaryo",
      "Xovos",
    ],
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
  };
  useEffect(() => {
    const fetchSubjectsAndTests = async () => {
      try {
        const data = await get_subjects();
        const subjectsList = data.results || ["not found"];
        ss(subjectsList);
      } catch (e) {
        ss(error);
        console.error("Failed to fetch data", e);
      }
    };

    fetchSubjectsAndTests();
  }, []);

  useEffect(() => {
    const profileFromState = location.state?.userProfile;
    if (profileFromState) {
      setFormData((prev) => ({ ...prev, ...profileFromState }));
      return;
    }

    const stored = localStorage.getItem("userProfile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {}
    }
  }, [location.state]);

  const isEditing = localStorage.getItem("is_edit");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    let response;

    const telegram_id = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

    const existingUser = await get_user(telegram_id);

    if (existingUser?.data) {
      response = await update_user(formData);
      localStorage.setItem("is_edit", "false");
    } else {
      response = await register(formData);
    }

    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        ...formData,
        id: response?.id || existingUser?.data?.id,
        telegram_id: telegram_id,
      })
    );

    navigate(existingUser?.data ? "/profile" : "/");
  } catch (error) {
    console.error("Xatolik:", error);
    if (error?.response?.status === 404) {
      setError("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi");
    }

    if (error?.response?.status === 404) {
      localStorage.removeItem("userProfile");
      navigate("/register");
      window.location.reload();
    } else if (error?.response?.status === 400) {
      setError("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi");
    } else {
      setError(
        "Ro'yxatdan o'tishda yoki ma'lumotlarni yangilashda xatolik yuz berdi"
      );
    }
  } finally {
    setLoading(false);
  }
};
  const [tgUser, setTgUser] = useState(null);
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();

      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      console.log("Telegram foydalanuvchi ma'lumotlari:", user);

      setTgUser(user || null);
    } else {
      alert("Telegram WebApp topilmadi!");
      console.warn("Telegram WebApp topilmadi!");
    }
  }, []);

  return (
    <div className="w-full p-4.5 -mb-30">
      <div className="w-full max-w-md bg-[#2d3a42] rounded-2xl shadow-modern-lg p-6 border border-[#3a4a54]">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#4a90e2] to-[#357abd] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold mb-4">
            {isEditing == "true" ? "Tahrirlash" : "Ro'yhatdan o'tish"}
          </h1>
          user:{tgUser || "not found"}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Ism
            </label>
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
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Familiya
            </label>
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
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Sharif
            </label>
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
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Telefon raqam
            </label>
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
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Viloyat
            </label>
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
                  <option
                    key={region}
                    value={region}
                    className="bg-[#1a2328] text-white"
                  >
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Tuman
            </label>
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
                    <option
                      key={district}
                      value={district}
                      className="bg-[#1a2328] text-white"
                    >
                      {district}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="flex space-x-4 mt-6">
            {isEditing == "true" && (
              <button
                type="button"
                onClick={() => (window.location.href = "/profile")}
                className="w-full bg-gray-400 text-gray-900 py-3 rounded-xl font-semibold 
        hover:bg-gray-600 transition-all duration-200 shadow-lg"
              >
                Bekor qilish
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-bl from-[-50%] to-[90%] from-[#3579bd] to-[#1b3b5b] text-white py-3 rounded-xl font-semibold 
      ${
        loading
          ? "opacity-50 cursor-not-allowed"
          : "hover:from-[#357abd] hover:to-[#2968a3]"
      } 
      transition-all duration-200 shadow-lg`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  <span>Yuklanmoqda...</span>
                </div>
              ) : isEditing == "true" ? (
                "Tahrirlash"
              ) : (
                "Ro'yhatdan o'tish"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
