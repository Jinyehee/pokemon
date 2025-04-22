import { useContext } from "react";
import { PokemonContext } from "./PokemonProvider";

export default function MainCard({ pokemon }) {
   const { typeData, lang, modalRef, setModallist } =
      useContext(PokemonContext);

   const clickModal = () => {
      if (modalRef.current) {
         modalRef.current.showModal();
         setModallist(pokemon);
      }
   };

   // 포켓몬 이름 한글 가져오기
   const translatedName =
      pokemon.species.names?.find((n) => n.language.name === lang)?.name ||
      pokemon.name;

   return (
      <>
         <li
            className="border-3 border-blue-300 rounded-2xl p-5 w-50 h-50 sm:w-70 sm:h-70 text-center flex justify-between flex-col bg-white 
               transition-all duration-300 hover:shadow-lg hover:-translate-y-2 dark:bg-gray-600 dark:text-white"
            onClick={clickModal}
         >
            <p className="text-l sm:text-xl">No. {pokemon.id}</p>

            <div className="h-[60px] sm:h-[100px] flex items-center">
               <img
                  src={
                     pokemon.sprites?.other?.showdown?.front_default ||
                     pokemon.sprites?.front_default
                  }
                  alt={translatedName}
                  className="mx-auto max-h-[60px] sm:max-h-[100px] object-contain"
               />
            </div>

            <p className="font-bold capitalize text-xl sm:text-2xl">
               {translatedName}
            </p>

            <div className="flex justify-center gap-5">
               {pokemon.types.map((typeObj, index) => {
                  const typeName = typeObj.type.name;
                  const type = typeData[typeName];

                  return (
                     <span
                        key={index}
                        className="flex items-center gap-2 text-white px-2 py-1 rounded"
                        style={{ backgroundColor: type?.color }}
                     >
                        <img
                           src={type?.icon}
                           alt={typeName}
                           className="w-4 h-4"
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
