import { useContext } from "react";
import { PokemonContext } from "./PokemonProvider";
import loading from "../assets/loading.gif";
import searchLoading from "../assets/search.gif";
import searchNull from "../assets/search_loading.gif";
import MainCard from "./MainCard";
import Modal from "./Modal";

export default function Main() {
   const { list, searchInfo, isFiltering } = useContext(PokemonContext);

   const isSearching = searchInfo.trim() !== "";

   return (
      <>
         <main className="p-4">
            <ul className="flex flex-wrap gap-10 justify-center">
               {list.length === 0 ? (
                  <div className="text-center text-gray-400">
                     {isSearching ? ( // 검색어가 없을 경우
                        isFiltering ? (
                           <div>
                              <p>검색 중입니다...</p>
                              <img
                                 className="w-100"
                                 src={searchLoading} // isFiltering 이 true일때 이 화면을 띄운다
                                 alt="검색 중..."
                              />
                           </div>
                        ) : (
                           <div>
                              <p>검색 결과가 없습니다.</p>
                              <img src={searchNull} alt="검색 결과 없음" />
                           </div>
                        )
                     ) : (
                        <img src={loading} alt="로딩 중..." />
                     )}
                  </div>
               ) : (
                  list.map((pokemon, index) => (
                     <MainCard key={index} pokemon={pokemon} /> // 포켓몬 리스트 출력
                  ))
               )}
            </ul>
            <div
               id="observer"
               className="h-[100px] flex justify-center items-center"
            ></div>
         </main>
         <Modal />
      </>
   );
}
