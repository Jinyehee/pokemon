import { useContext } from "react";
import { PokemonContext } from "./PokemonProvider";

export default function MainCard({ pokemon }) {
   const { typeData, lang, modalRef, setModallist } =
      useContext(PokemonContext);
   // typeData - 포켓몬 타입, 아이콘, 색이 들어있는 데이터파일

   const clickModal = () => {
      if (modalRef.current) {
         modalRef.current.showModal();
         setModallist(pokemon);
      }
   };

   // 포켓몬 이름 한글 가져오기
   // lang에 입력되어있는 문자에 따라 이름 출력
   const translatedName =
      pokemon.species.names?.find((n) => n.language.name === lang)?.name ||
      pokemon.name;

   return (
      <>
         <li
            className="border-3 border-blue-300 rounded-2xl p-5 w-40 h-40 sm:w-70 sm:h-70 text-center flex justify-between flex-col bg-white 
               transition-all duration-300 hover:shadow-lg hover:-translate-y-2 dark:bg-gray-600 dark:text-white"
            onClick={clickModal}
         >
            <p className="text-sm sm:text-xl">No. {pokemon.id}</p>

            <div className="h-[40px] sm:h-[100px] flex items-center">
               <img
                  src={
                     pokemon.sprites?.other?.showdown?.front_default ||
                     pokemon.sprites?.front_default
                  } // 움직이는 gif가 없으면 default사진을 가져온다
                  alt={translatedName}
                  className="mx-auto max-h-[40px] sm:max-h-[100px] object-contain"
               />
            </div>

            <p className="font-bold capitalize text-l sm:text-2xl">
               {translatedName}
            </p>

            <div className="flex justify-center gap-5">
               {pokemon.types.map((typeObj, index) => {
                  // 포켓몬 타입 출력 (아이콘, 색깔, 한국어)
                  const typeName = typeObj.type.name;
                  const type = typeData[typeName];

                  return (
                     <span
                        key={index}
                        className="flex items-center gap-1 sm:gap-2 text-white text-[8px] px-1 py-0.5 sm:px-2 sm:py-1 sm:text-xl rounded"
                        style={{ backgroundColor: type?.color }}
                     >
                        <img
                           src={type?.icon}
                           alt={typeName}
                           className="w-3 h-3 sm:w-4 sm:h-4"
                        />
                        {type?.[lang] || typeName}
                     </span>
                  );
               })}
            </div>
         </li>
      </>
   );
}
