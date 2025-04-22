import { useContext, useState } from "react";
import { PokemonContext } from "./PokemonProvider";
import searchIcon from "../assets/search.png";
import Zback from "../assets/Zzz.png";
import { ThemeContext } from "./ThemeProvider";

export default function SearchBox() {
   const { setSearchInfo, isAllLoading, setList } = useContext(PokemonContext);
   const { theme } = useContext(ThemeContext);
   const [inputValue, setInputValue] = useState("");

   const handleSearch = () => {
      setList([]);
      setSearchInfo(inputValue);
   };

   const handleKeyDown = (e) => {
      if (e.key === "Enter") {
         handleSearch();
      }
   };
   return (
      <div className="w-full relative">
         <img src={Zback} alt="" className="mx-auto pt-20 md:pt-15 lg:pt-20" />

         {theme === "dark" && (
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-gray-800 opacity-50 z-10" />
         )}

         <div className="flex justify-center p-10 gap-2 -mt-[70px] lg:-mt-[90px] relative z-20">
            <input
               type="text"
               placeholder="원하는 포켓몬을 검색하세요."
               className="border-2 border-yellow-300 rounded-full bg-white text-black focus:outline-none dark:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed dark:text-white transition-all text-[12px] w-[300px] px-2 py-1 md:px-4 md:py-2 md:text-[16px] md:w-[400px] lg:w-[500px]"
               disabled={isAllLoading}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={handleKeyDown}
            />
            <button
               className="p-2 md:p-3 rounded-full bg-yellow-300 hover:bg-yellow-400 transition"
               onClick={handleSearch}
            >
               <img className="w-3 sm:w-4 md:w-6" src={searchIcon} alt="검색" />
            </button>
         </div>
      </div>
   );
}
