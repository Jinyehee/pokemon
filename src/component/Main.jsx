import { useContext } from "react";
import { PokemonContext } from "./PokemonProvider";
import loading from "../assets/loading.gif";
import MainCard from "./MainCard";

export default function Main() {
   const { list } = useContext(PokemonContext);

   return (
      <main className="p-4 mt-40">
         <ul className="flex flex-wrap gap-10 justify-center">
            {list.length === 0 ? (
               <img src={loading} />
            ) : (
               list.map((pokemon, index) => (
                  <MainCard key={index} pokemon={pokemon} />
               ))
            )}
         </ul>
         <div
            id="observer"
            className="h-[100px] flex justify-center items-center"
         >
            <img src={loading} alt="Loading..." className="w-10" />
         </div>
      </main>
   );
}
