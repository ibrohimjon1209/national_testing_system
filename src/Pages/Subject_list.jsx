import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import get_subjects from "../Services/get_subjects";

const Subject_list = () => {
  const [subjects, set_subjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_subjects = async () => {
      setLoading(true);
      try {
        const data = await get_subjects();
        set_subjects(data.results || []);
      } catch (e) {
        console.error("Failed to fetch subjects", e);
        set_subjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetch_subjects();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="header sticky top-0 w-full h-[150px] flex items-center justify-center gradient-primary shadow-modern-lg z-10">
        <h1 className="text-white font-bold text-3xl text-center px-6 leading-tight">
          Milliy sertifikat testlari
        </h1>
      </div>

      <div className="subjects w-full flex flex-col">
        {subjects?.map((subject) => (
          <Link key={subject.id} to={`/test/${subject.id}`}>
            <div className="flex flex-col items-center">
              <div className="flex justify-between items-center px-[35px] w-full h-[70px] duration-[0.2s] active:bg-[#2d3a42]">
                <h1 className="font-inter font-[600] text-[17px] text-white">
                  {subject.name}
                </h1>
                <button className=" w-[60px] h-[40px] rounded-[10px] bg-[#4a90e2] text-white font-[600] font-inter active:bg-[#357abd]">
                  {subject.tests_count} ta
                </button>
              </div>
              <div className="w-full h-full px-[15px]">
                <div className="w-full h-[1px] bg-[#3a4a54]"></div>
              </div>
            </div>
          </Link>
        ))}
        {subjects.length === 0 && !loading && (
          <div className="flex items-center justify-center">
            <div className="text-white text-center">
              <p>Ma'lumotlar topilmadi</p>
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-full px-[17px] mt-[25px]">
        <div className="w-full h-[13px] rounded-[5px] bg-[#2d3a42]"></div>
      </div>
      {loading && (
          <div className="flex mt-20 items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a90e2] mx-auto mb-4"></div>
        <p>Yuklanmoqda...</p>
      </div>
    </div>
        )}
    </div>
  );
};

export default Subject_list;
