import { createContext, useEffect, useState, useRef } from "react";
import typeData from "./Typedata";

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
   const [list, setList] = useState([]);
   const [allPokemons, setAllPokemons] = useState([]); // 전체 데이터 저장
   const [offset, setOffset] = useState(0);
   const [searchInfo, setSearchInfo] = useState("");
   const [lang, setLang] = useState("ko");
   const [modallist, setModallist] = useState({});

   const modalRef = useRef(null);
   const limit = 20;
   const isFetching = useRef(false);

   // 전체 데이터 한 번만 불러오기
   useEffect(() => {
      async function loadAll() {
         try {
            const response = await fetch(
               "https://pokeapi.co/api/v2/pokemon?limit=10000"
            );
            const data = await response.json();

            const details = await Promise.all(
               data.results.map(async (pokemon) => {
                  const response = await fetch(pokemon.url);
                  return await response.json();
               })
            );

            const speciesData = await Promise.all(
               details.map(async (pokemon) => {
                  const speciesResponse = await fetch(pokemon.species.url);
                  return await speciesResponse.json();
               })
            );

            const merged = details.map((pokemon, idx) => ({
               ...pokemon,
               species: speciesData[idx], // species 통째로 붙여줌
            }));

            setAllPokemons(merged);
         } catch (error) {
            console.error(error);
         }
      }
      loadAll();
   }, []);

   // 무한 스크롤용 포켓몬 가져오기
   async function fetchPokemons(offset) {
      if (isFetching.current) return;
      isFetching.current = true;

      try {
         const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
         );
         const data = await response.json();

         const details = await Promise.all(
            data.results.map(async (pokemon) => {
               const response = await fetch(pokemon.url);
               return await response.json();
            })
         );

         // 포켓몬 종류 (species) 데이터 추가
         const speciesData = await Promise.all(
            details.map(async (pokemon) => {
               const speciesResponse = await fetch(pokemon.species.url);
               return await speciesResponse.json();
            })
         );

         const merged = details.map((pokemon, idx) => ({
            ...pokemon,
            species: speciesData[idx], // species 통째로 붙여줌
         }));

         setList((prev) => [...prev, ...merged]);
         setOffset((prev) => prev + limit);
      } catch (error) {
         console.error(error);
      } finally {
         isFetching.current = false;
      }
   }

   // 검색어가 바뀌었을 때 필터링
   useEffect(() => {
      if (searchInfo) {
         const keyword = searchInfo.toLowerCase();

         const filtered = allPokemons.filter((pokemon) => {
            const engName = pokemon.name.toLowerCase();
            const korName =
               pokemon.species?.names?.find((n) => n.language.name === "ko")
                  ?.name || "";

            return (
               engName.includes(keyword) ||
               korName.toLowerCase().includes(keyword)
            );
         });

         setList(filtered); // 필터된 리스트로 업데이트
      } else {
         setList([]); // 검색어 비어 있을 때 리스트 초기화
         setOffset(0); // 오프셋 초기화
         fetchPokemons(0); // 새로운 데이터 로드
      }
   }, [searchInfo]); // lang은 불필요하므로 의존성에서 제외

   // 무한스크롤 Intersection Observer

   useEffect(() => {
      if (!allPokemons) return;
      const observer = new IntersectionObserver((entries) => {
         if (entries[0].isIntersecting && !searchInfo) {
            fetchPokemons(offset);
         }
      });

      const target = document.getElementById("observer");
      if (target) observer.observe(target);

      return () => observer.disconnect();
   }, [offset, searchInfo]);

   return (
      <PokemonContext.Provider
         value={{
            list,
            typeData,
            setSearchInfo,
            searchInfo,
            lang,
            setLang,
            modalRef,
            modallist,
            setModallist,
         }}
      >
         {children}
      </PokemonContext.Provider>
   );
}
