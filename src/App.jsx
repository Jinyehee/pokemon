import main_logo from "./assets/main_logo.png";
import modeIcon from "./assets/lightmode.png";
import langIcon from "./assets/kr.png";
import searchIcon from "./assets/search.png";
import { useEffect } from "react";

function App() {
   useEffect(()=>{
      async function getPokemon() {
         try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon-species/1/");
            const data = await response.json();
            console.log(data)
         } catch (error) {
            console.log("오류났습니다");
         }
         
      }
      getPokemon();
   })
   return (
      <div className="bg-gray-50 h-screen">
         <header className="relative flex items-center p-6  shadow-md shadow-gray-300">
            <div className="absolute left-1/2 transform -translate-x-1/2">
               <img src={main_logo} alt="로고" className="h-20" />
            </div>
            <div className="flex items-center space-x-4 ml-auto">
               <button className="px-2 py-2 rounded-4xl bg-gray-600">
                  <img className="w-7" src={modeIcon} alt="모드" />
               </button>
               <button className="px-2 py-2 rounded-4xl bg-gray-600">
                  <img className="w-7" src={langIcon} alt="언어" />
               </button>
            </div>
         </header>
         <div className="flex justify-center p-10 gap-2">
            <input
               type="text"
               placeholder="원하는 포켓몬을 검색하세요."
               className="px-4 py-2 rounded-4xl bg-gray-600 text-white focus:outline-none w-[400px]"
            />
            <button className="p-3 rounded-4xl">
               <img className="w-6" src={searchIcon} alt="" />
            </button>
         </div>
         <main className="p-4">
            <ul className="flex">
               <li className="">
                  <img src="" alt="" />
                  <p></p>
                  <p></p>
               </li>
            </ul>
         </main>
      </div>
   );
}

export default App;
