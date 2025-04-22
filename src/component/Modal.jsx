import { useContext } from "react";
import { PokemonContext } from "./PokemonProvider";

export default function Modal() {
   const { typeData, modalRef, modallist, setModallist, lang } =
      useContext(PokemonContext);
   if (!modallist) return null;

   const translatedName =
      modallist.species?.names?.find((n) => n.language.name === lang)?.name ||
      modallist.name;

   const normalImg =
      modallist.sprites?.other?.["official-artwork"]?.front_default;
   const shinyImg = modallist.sprites?.other?.["official-artwork"]?.front_shiny;

   return (
      <dialog
         ref={modalRef}
         className="rounded-2xl p-8 border-y-30 border-blue-300 bg-white dark:bg-gray-800  dark:text-white shadow-2xl w-[80%] md:w-[95%] max-w-2xl text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0"
      >
         <button
            onClick={() => {
               setModallist({});
               modalRef.current.close();
            }}
            className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-xl border-0"
         >
            ✕
         </button>

         <div className="flex justify-center gap-6 mb-6">
            {/* 기본 이미지 */}
            <div className="relative w-30 h-30 md:w-40 md:h-40">
               <img
                  src={normalImg}
                  alt="기본"
                  className="w-full h-full object-contain"
               />
               <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                  {lang === "ko" ? "기본" : "Normal"}
               </span>
            </div>

            {/* 이로치 이미지 */}
            <div className="relative w-30 h-30 md:w-40 md:h-40">
               <img
                  src={shinyImg}
                  alt="이로치"
                  className="w-full h-full object-contain"
               />
               <span className="absolute bottom-1 left-1 bg-yellow-500/80 text-white text-xs px-2 py-0.5 rounded">
                  {lang === "ko" ? "이로치" : "Shiny"}
               </span>
            </div>
         </div>

         <div className="flex justify-center gap-3 flex-wrap mb-6">
            {modallist.types?.map((typeObj, index) => {
               const typeName = typeObj.type.name;
               const type = typeData[typeName];

               return (
                  <span
                     key={index}
                     className="flex items-center gap-2 text-white text-base px-4 py-1.5 rounded-full shadow"
                     style={{ backgroundColor: type?.color }}
                  >
                     <img src={type?.icon} alt={typeName} className="w-5 h-5" />
                     {type?.[lang] || typeName}
                  </span>
               );
            })}
         </div>

         <h2 className="text-xl md:text-2xl font-bold mb-2">
            #{modallist.id} {translatedName}
         </h2>

         <div className="text-base text-gray-600 dark:text-gray-300 mb-4">
            <p>
               {lang === "ko" ? "키" : "Height"}: {modallist.height * 10} cm
            </p>
            <p>
               {lang === "ko" ? "무게" : "Weight"}: {modallist.weight / 10} kg
            </p>
         </div>

         <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
            {(lang === "ko"
               ? modallist.species?.flavor_text_entries?.find(
                    (entry) => entry.language.name === "ko"
                 )?.flavor_text
               : modallist.species?.flavor_text_entries?.find(
                    (entry) => entry.language.name === "en"
                 )?.flavor_text) || "설명이 없습니다."}
         </p>
      </dialog>
   );
}
