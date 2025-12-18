import { useParams } from "react-router-dom";
import get_subject_tests from "../Services/get_subject_tests";
import { useEffect, useState } from "react";

const Single_subject = () => {
  const { id } = useParams();
  const [tests, set_tests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ISO created_at ni "YYYY-MM-DD HH:mm:ss" ko'rinishiga o'giruvchi yordamchi
  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d)) return iso; // noto'g'ri format bo'lsa originalni qaytar
    const pad = (n) => String(n).padStart(2, "0");
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const min = pad(d.getMinutes());
    const ss = pad(d.getSeconds());
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  useEffect(() => {
    const fetch_tests = async () => {
      setLoading(true);
      try {
        const data = await get_subject_tests(id);
        set_tests(data.filter((test) => test.is_public));
      } catch (e) {
        console.error("Failed to fetch tests", e);
        set_tests([]);
      } finally {
        setLoading(false);
      }
    };
    fetch_tests();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="header sticky top-0 w-full h-[150px] flex items-center justify-center bg-gradient-to-b from-[-10%] to-[100%] from-[#3579bd] to-[#132a41] shadow-modern-lg z-10">
        <h1 className="text-white font-bold text-3xl text-center px-6 leading-tight">
          {tests[0]?.subject_name || "Fan"} MS Testlar
        </h1>
      </div>

      {loading ? (
        <div className="flex mt-20 items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a90e2] mx-auto mb-4"></div>
            <p>Yuklanmoqda...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-[20px]">
            <div className="flex items-center justify-between px-[25px] pr-[125px]">
              <h1 className="font-inter font-[600] text-[17px] text-white">
                Kanal nomi
              </h1>
              <h1 className="font-inter font-[600] text-[17px] text-white">
                Havola
              </h1>
            </div>
            <div className="w-full h-full mt-[15px] px-[15px]">
              <div className="w-full h-[0.5px] bg-[#3a4a54]"></div>
            </div>
          </div>

          <div className="flex flex-col">
            {tests.length > 0 ? (
              tests.map((test) => (
                <div
                  key={test.id || test.channel_username}
                  className="w-full h-[90px] py-[5px] flex-col justify-between"
                >
                  <div className="w-full h-full flex justify-between items-center pr-[40px]">
                    <div className="w-full h-full  pl-[25px] flex flex-col justify-evenly">
                      <div className="bg-gradient-to-bl from-[-50%] to-[96%] from-[#3579bd] to-[#1b3b5b] w-[140px] h-[25px] overflow-hidden rounded-[5px] flex justify-center items-center">
                        <h1 className="font-inter font-[600] text-[12px] max-w-[140] truncate text-white mx-[5px]">
                          {test.channel_username}
                        </h1>
                      </div>
                      <h1 className="text-white text-[13px]">
                        {formatDate(test.start_time) || "Nomalum"}
                      </h1>
                    </div>

                    <div>
                      <button
                        onClick={() => window.open(`https://t.me/${test.channel_username.replace('@', '')}`)}
                        className="w-[140px] h-[40px] rounded-[10px] bg-gradient-to-bl from-[-40%] to-[96%] from-[#3579bd] to-[#1b3b5b] text-white font-[600] font-inter active:bg-[#357abd]"
                      >
                        Kanalga o'tish
                      </button>
                    </div>
                  </div>

                  <div className="w-full h-full px-[15px]">
                    <div className="w-full h-[0.5px] bg-[#3a4a54]"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center mt-5">
                <div className="text-white text-center">
                  <p>Testlar topilmadi</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Single_subject;
