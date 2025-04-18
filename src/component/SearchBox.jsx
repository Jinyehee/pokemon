import searchIcon from "../assets/search.png";
import Zback from "../assets/Zzz.png";

export default function SearchBox() {
   return (
      <>
         <img src={Zback} alt="" className="mx-auto pt-10" />
         <div className="flex justify-center p-10 gap-2 -mt-90 ">
            <input
               type="text"
               placeholder="원하는 포켓몬을 검색하세요."
               className="border-3 border-yellow-300 px-4 py-2 rounded-4xl bg-white text-black focus:outline-none w-[400px]"
            />
            <button className="p-3 rounded-4xl bg-yellow-300 hover:bg-yellow-400 transition">
               <img className="w-6" src={searchIcon} alt="검색" />
            </button>
         </div>
      </>
   );
}
