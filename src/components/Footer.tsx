import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import {FaPhone, FaVk, FaYoutube} from "react-icons/fa";
import {FaHouseMedical} from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-orange-800 to-orange-600 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">


                <div className="space-y-3 ">
                    <div className='bg-white rounded-2xl p-3'>
                        <Image src='/logo.png' alt='logo' width={60} height={60} className='w-[70px] h-[70px]' />
                    </div>
                     <p className="text-sm">
                        Создавайте курсы с помощью ИИ и изучайте любые темы легко и интересно.
                    </p>
                </div>


                <div>
                    <h2 className="font-semibold mb-3">Курсы</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/workspace/explore" className="hover:underline">Все курсы</a></li>
                        <li><a href="/workspace" className="hover:underline">Создать курс</a></li>
                        <li><a href="/workspace/explore" className="hover:underline">Популярные темы</a></li>
                    </ul>
                </div>


                <div>
                    <h2 className="font-semibold mb-3">О компании</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/about" className="hover:underline">О нас</a></li>
                        <li><a href="#support" className="hover:underline">Поддержка</a></li>
                        <li><a href="#support" className="hover:underline">Контакты</a></li>
                    </ul>
                </div>


                <div>
                    <h2 className="font-semibold mb-3">Следите за нами</h2>
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Facebook" className="hover:text-gray-200"><Facebook /></a>
                        <a href="#" aria-label="Twitter" className="hover:text-gray-200"><Twitter /></a>
                        <a href="#" aria-label="Instagram" className="hover:text-gray-200"><FaYoutube size={24} /></a>
                        <a href="#" aria-label="vK" className="hover:text-gray-200"><FaVk size={24} /></a>
                    </div>

                    <h2 className="font-semibold my-3 flex items-center gap-2">
                        <FaHouseMedical/>
                        Адрес Штаб Квартиры: </h2>
                    <p className='text-gray-200 cursor-pointer font-semibold text-sm '>
                        <a target="_blank" href="https://google.com">Город Томск, Улица Ленина 2</a>
                    </p>
                    <h2 className="font-semibold my-3 flex items-center gap-2">
                        <FaPhone/>
                        Номер телефона: </h2>
                    <p className='text-gray-200 cursor-pointer font-semibold text-sm '>
                        <a target="_blank" href="https://google.com">+8-952-163-71-68</a>
                    </p>
                </div>

            </div>

            <div className="bg-orange-700 text-center py-4 text-sm">
                © {new Date().getFullYear()} КурсоГен. Все права защищены.
            </div>
        </footer>
    );
};

export default Footer;
