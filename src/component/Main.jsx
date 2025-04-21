import { useContext } from "react";
import { PokemonContext } from "./PokemonProvider";
import loading from "../assets/loading.gif";
import searchNull from "../assets/search_loading.gif";
import searchLoading from "../assets/search.gif";
import MainCard from "./MainCard";
import Modal from "./Modal";

export default function Main() {
   const { list, searchInfo } = useContext(PokemonContext);

   const isSearching = searchInfo.trim() !== "";

   return (
      <>
         <main className="p-4">
            <ul className="flex flex-wrap gap-10 justify-center">
               {list.length === 0 ? (
                  <div className="text-center text-gray-400">
                     {isSearching ? (
                        <div>
                           <p>검색 결과가 없습니다.</p>
                           <img src={searchNull} alt="Loading..." />
                        </div>
                     ) : (
                        <img src={loading} alt="Loading..." />
                     )}
                  </div>
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
               <img src={searchLoading} alt="Loading..." className="w-10" />
            </div>
         </main>
         <Modal />
      </>
   );
}
