import main_logo from "../assets/main_logo.png";
import modeIcon from "../assets/lightmode.png";
import langIcon from "../assets/kr.png";

export default function Header() {
   return (
      <header className="flex items-center p-6  shadow-md shadow-gray-300 bg-white fixed w-full z-100">
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
   );
}
