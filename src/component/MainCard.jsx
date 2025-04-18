import { useContext } from "react";
import { PokemonContext } from "./PokemonProvider";

export default function MainCard({ pokemon }) {
   const { typeData } = useContext(PokemonContext);

   return (
      <li
         className="border-3 border-blue-300 rounded-2xl p-5 w-70 h-70 text-center flex justify-between flex-col bg-white 
               transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
      >
         <p className="text-xl">No. {pokemon.id}</p>
         <div className="h-[100px] flex items-center">
            <img
               src={
                  pokemon.sprites?.other?.showdown?.front_default ||
                  pokemon.sprites?.front_default
               }
               alt={pokemon.name}
               className="mx-auto max-h-[100px] object-contain"
            />
         </div>

         <p className="font-bold capitalize text-2xl">{pokemon.name}</p>
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
                     <img src={type?.icon} alt={typeName} className="w-4 h-4" />
                     {typeName}
                  </span>
               );
            })}
         </div>
      </li>
   );
}
