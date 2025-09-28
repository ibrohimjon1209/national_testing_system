import React, { useState, useEffect } from 'react';

const Sign_in = () => {
  const [formData, setFormData] = useState({
    ism: '',
    familiya: '',
    telefon: '',
    viloyat: '',
    tuman: ''
  });

  const [tumans, setTumans] = useState([]);
  const regions = {
    "Andijon viloyati": ["Andijon shahri", "Asaka tumani", "Baliqchi tumani", "Bo'z tumani", "Izboskan tumani", "Jalolquduq tumani", "Marhamat tumani", "Oltinko'l tumani", "Paxtaobod tumani", "Qo'rg'ontepa tumani", "Qubodiyon tumani", "Ulug'nor tumani", "Xo'jaobod tumani", "Shaxrixon tumani"],
    "Buxoro viloyati": ["Buxoro shahri", "Alat tumani", "G‘ijduvon tumani", "Jondor tumani", "Kogon tumani", "Olot tumani", "Peshku tumani", "Qorako‘l tumani", "Qorovulbozor tumani", "Romitan tumani", "Shofirkon tumani", "Vobkent tumani"],
    "Farg‘ona viloyati": ["Farg‘ona shahri", "Beshariq tumani", "Buvayda tumani", "Dang‘ara tumani", "Furqat tumani", "Qo‘qon shahri", "Marg‘ilon shahri", "Oltiariq tumani", "O‘zbekiston tumani", "Rishton tumani", "So‘x tumani", "Toshloq tumani", "Uchko‘prik tumani", "Yozyovon tumani"],
    "Jizzax viloyati": ["Jizzax shahri", "Arnasoy tumani", "Baxmal tumani", "Do‘stlik tumani", "Forish tumani", "G‘allaorol tumani", "Mirzacho‘l tumani", "Paxtakor tumani", "Yangiobod tumani", "Zomin tumani", "Zarbdor tumani"],
    "Xorazm viloyati": ["Xiva shahri", "Amudaryo tumani", "Bag‘at tumani", "Gurlan tumani", "Qonliko‘l tumani", "Qo‘shko‘pir tumani", "Shovot tumani", "Urganch tumani", "Xazorasp tumani", "Yangibozor tumani", "Yangiariq tumani"],
    "Namangan viloyati": ["Namangan shahri", "Chortoq tumani", "Chust tumani", "Kosonsoy tumani", "Mingbuloq tumani", "Namangan tumani", "Norin tumani", "Pop tumani", "To‘raqo‘rg‘on tumani", "Uchqo‘rg‘on tumani", "Uychi tumani", "Yangiqo‘rg‘on tumani"],
    "Navoiy viloyati": ["Navoiy shahri", "Konimex tumani", "Karmana tumani", "Qiziltepa tumani", "Nurota tumani", "Tamdi tumani", "Uchquduq tumani", "Xatirchi tumani"],
    "Qashqadaryo viloyati": ["Qarshi shahri", "Chiroqchi tumani", "Dehqonobod tumani", "G‘uzor tumani", "Kamashi tumani", "Kasbi tumani", "Kitob tumani", "Koson tumani", "Muborak tumani", "Nishon tumani", "Qamchiq tumani", "Shahrisabz tumani", "Yakkabog‘ tumani"],
    "Qoraqalpog‘iston Respublikasi": ["Nukus shahri", "Amudaryo tumani", "Beruniy tumani", "Chimboy tumani", "Ellikqal‘a tumani", "Kegeyli tumani", "Mo‘ynoq tumani", "Nukus tumani", "Qanliko‘l tumani", "Qorao‘zak tumani", "Shumanay tumani", "Taxtako‘pir tumani", "To‘rtko‘l tumani", "Xonqa tumani", "Xo‘jayli tumani"],
    "Samarqand viloyati": ["Samarqand shahri", "Bulung‘ur tumani", "Ishtixon tumani", "Jomboy tumani", "Kattakurg‘an tumani", "Narpay tumani", "Oqdaryo tumani", "Paxtachi tumani", "Payariq tumani", "Qamashi tumani", "Rabot tumani", "Toyloq tumani", "Urgut tumani"],
    "Sirdaryo viloyati": ["Guliston shahri", "Boyovut tumani", "Guliston tumani", "Mirzaobod tumani", "Oqqo‘rg‘on tumani", "Sardoba tumani", "Sayxunobod tumani", "Shirindaryo tumani", "Xovos tumani", "Yangiyo‘l tumani"],
    "Surxondaryo viloyati": ["Termiz shahri", "Angor tumani", "Boysun tumani", "Denov tumani", "Jarqo‘rg‘on tumani", "Qiziriq tumani", "Qumqo‘rg‘on tumani", "Sariosiyo tumani", "Sherobod tumani", "Sho‘rchi tumani", "Muzrabot tumani", "Uzun tumani"],
    "Toshkent viloyati": ["Toshkent shahri", "Angren shahri", "Bekabod tumani", "Bo‘ka tumani", "Chinoz tumani", "Ohangaron tumani", "Oqqo‘rg‘on tumani", "Parkent tumani", "Piskent tumani", "Qibray tumani", "Qorasuv tumani", "Toshloq tumani", "Urtachirchiq tumani", "Yangiyo‘l tumani", "Zangiota tumani"],
    "Toshkent shahri": ["Chilonzor tumani", "Mirobod tumani", "Olmazor tumani", "Shayxontohur tumani", "Yunusobod tumani", "Yashnobod tumani"]
  };

  useEffect(() => {
    if (formData.viloyat) {
      setTumans(regions[formData.viloyat] || []);
      setFormData(prev => ({ ...prev, tuman: '' }));
    } else {
      setTumans([]);
    }
  }, [formData.viloyat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='w-full h-full'>
      <div className="header sticky top-0 w-full h-[150px] flex items-center justify-center gradient-primary shadow-modern-lg z-10">
        <h1 className="text-white font-bold text-3xl text-center px-6 leading-tight">Ro'yhatdan o'tish</h1>
      </div>

      <div className='flex flex-col px-[7vw] mt-[25px]'>
        <div className='space-y-6'>
          <div>
            <h1 className='text-white mb-[5px]'>Ism *</h1>
            <input
              type='text'
              name='ism'
              value={formData.ism}
              onChange={handleChange}
              placeholder='Ism'
              className='custom-select w-full h-[45px] px-[10px] rounded-[5px] border-white border-[1px] text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300'
            />
          </div>

          <div>
            <h1 className='text-white mb-[5px]'>Familiya *</h1>
            <input
              type='text'
              name='familiya'
              value={formData.familiya}
              onChange={handleChange}
              placeholder='Familiya'
              className='custom-select w-full h-[45px] px-[10px] rounded-[5px] border-white border-[1px] text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300'
            />
          </div>

          <div>
            <h1 className='text-white mb-[5px]'>Telefon raqam</h1>
            <input
              type='text'
              name='telefon'
              value={formData.telefon}
              onChange={handleChange}
              placeholder='Telefon raqam'
              className='custom-select w-full h-[45px] px-[10px] rounded-[5px] border-white border-[1px] text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300'
            />
          </div>

          <div>
            <h1 className='text-white mb-[5px]'>Manzil</h1>
            <div className='space-y-4'>
              <div>
                <h1 className='text-white mb-[5px]'>Viloyat *</h1>
                <select
                  name='viloyat'
                  value={formData.viloyat}
                  onChange={handleChange}
                  className='custom-select w-full h-[45px] px-[10px] rounded-[5px] border-white border-[1px] text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300'
                >
                  <option value='' disabled>--Viloyatni tanlang--</option>
                  {Object.keys(regions).map((region) => (
                    <option key={region} className='bg-[#242f34]' value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h1 className='text-white mb-[5px]'>Tuman *</h1>
                <select
                  name='tuman'
                  value={formData.tuman}
                  onChange={handleChange}
                  className='custom-select w-full h-[45px] px-[10px] rounded-[5px] border-white border-[1px] text-white bg-[#242f34] focus:outline-none appearance-none focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300'
                  disabled={!formData.viloyat}
                >
                  <option value='' disabled>--Tumanni tanlang--</option>
                  {tumans.map((tuman) => (
                    <option key={tuman} className='bg-[#242f34]' value={tuman}>
                      {tuman}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            className='mt-[30px] active:scale-[95%] active:bg-blue-300 gradient-primary shadow-modern-lg z-10 duration-150 w-full h-[45px] rounded-[5px] text-white font-inter font-[600] text-[13px] flex items-center justify-center gap-[5px] px-[15px]'
          >
            <h1 className='font-[600] text-[15px]'>Ro'yxatdan o'tish</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sign_in;