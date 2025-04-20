import { useContext, useState } from "react";
import { PokemonContext } from "./PokemonProvider";
import searchIcon from "../assets/search.png";
import Zback from "../assets/Zzz.png";


export default function SearchBox() {
   const { setSearchInfo } = useContext(PokemonContext);
   const [inputValue, setInputValue] = useState("");

   const handleSearch = () => {
      setSearchInfo(inputValue);
   };

   const handleKeyDown = (e) => {
      if (e.key === "Enter") {
         handleSearch();
      }
   };
   return (
      <>
         <img src={Zback} alt="" className="mx-auto pt-10" />
         <div className="flex justify-center p-10 gap-2 -mt-90 ">
            <input
               type="text"
               placeholder="원하는 포켓몬을 검색하세요."
               className="border-3 border-yellow-300 px-4 py-2 rounded-4xl bg-white text-black focus:outline-none w-[400px]"
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={handleKeyDown} 
            />
            <button className="p-3 rounded-4xl bg-yellow-300 hover:bg-yellow-400 transition" onClick={handleSearch}>
               <img className="w-6" src={searchIcon} alt="검색" />
            </button>
         </div>
      </>
   );
}
