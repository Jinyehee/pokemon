import { useContext } from "react";
import { PokemonContext } from "./PokemonProvider";
import krIcon from "../assets/kr.png";
import enIcon from "../assets/en.png";
import mainLogo from "../assets/main_logo.png";
import dark from "../assets/darkmode.png";
import light from "../assets/lightmode.png";
import { ThemeContext } from "./ThemeProvider";
import HeaderAction from "./HeaderAction";

export default function Header() {
   const { lang, setLang } = useContext(PokemonContext);
   const { theme, changeTheme } = useContext(ThemeContext);

   const toggleLang = () => {
      setLang((prev) => (prev === "ko" ? "en" : "ko"));
   };

   return (
      <header className="flex items-center justify-between p-6 shadow-md shadow-gray-300 bg-white fixed w-full z-100 dark:bg-gray-500 dark:shadow-gray-600 transition-all">
         <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src={mainLogo} alt="로고" className="h-15 md:h-20" />
         </div>
         <div className="flex items-center space-x-4">
            <button
               className="p-1 md:p-2 rounded-4xl bg-gray-600"
               onClick={changeTheme}
            >
               <img
                  className="w-5 md:w-7"
                  src={theme === "light" ? light : dark}
                  alt="모드"
               />
            </button>
            <button
               className="p-1 md:p-2 rounded-4xl bg-gray-600"
               onClick={toggleLang}
            >
               <img
                  className="w-5 md:w-7"
                  src={lang === "ko" ? krIcon : enIcon}
                  alt="언어"
               />
            </button>
         </div>
         <HeaderAction />
      </header>
   );
}
