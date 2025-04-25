import { createContext, useEffect, useState, useRef } from "react";
import typeData from "./Typedata";
export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
   const [list, setList] = useState([]); // 현재 보여지는 포켓몬 목록
   const [allPokemons, setAllPokemons] = useState([]); // 전체 데이터 저장
   const [offset, setOffset] = useState(0); // 현재까지 보여준 포켓몬 수
   const [searchInfo, setSearchInfo] = useState(""); // 검색어
   const [lang, setLang] = useState("ko"); // 언어
   const [modallist, setModallist] = useState({});
   const [isFiltering, setIsFiltering] = useState(false); // 검색 중 상태

   const modalRef = useRef(null);
   const limit = 20;
   const isFetching = useRef(false);

   // 전체 데이터 한 번만 불러오기 (첫 검색 시)
   useEffect(() => {
      async function loadAll() {
         try {
            // 검색중임을 알림
            setIsFiltering(true);
            const response = await fetch(
               "https://pokeapi.co/api/v2/pokemon?limit=1500"
            );
            const data = await response.json();

            // 데이터를 500개씩 나눠서 요청 (서버 터짐 방지)
            const batchSize = 500;
            const batches = Math.ceil(data.results.length / batchSize); // 나누었을때 결과가 소수점이 나오면 올림
            const allDetails = []; // 데이터를 담을 변수

            for (let i = 0; i < batches; i++) {
               const batch = data.results.slice(
                  i * batchSize,
                  (i + 1) * batchSize
               ); // (0~499) (500~999) 이런식으로 500개를 나눠서 요청
               const batchDetails = await Promise.all(
                  batch.map(async (pokemon) => {
                     const response = await fetch(pokemon.url);
                     return await response.json();
                  })
               );
               allDetails.push(...batchDetails);
            }

            // species 데이터 추가
            const speciesData = await Promise.all(
               allDetails.map(async (pokemon) => {
                  const speciesResponse = await fetch(pokemon.species.url);
                  return await speciesResponse.json();
               })
            );

            const merged = allDetails.map((pokemon, idx) => ({
               ...pokemon,
               species: speciesData[idx], // species 통째로 붙여줌
            }));

            setAllPokemons(merged); // allPokemons 배열에 담는다
         } catch (error) {
            console.error(error);
         } finally {
            setIsFiltering(false); // 검색 완료
         }
      }

      if (searchInfo && allPokemons.length === 0) {
         loadAll(); // 처음 검색할 때만 loadAll 호출
      }
   }, [searchInfo, allPokemons]);

   // 검색 필터링
   useEffect(() => {
      if (searchInfo) {
         const keyword = searchInfo.toLowerCase();

         const filtered = allPokemons.filter((pokemon) => {
            const engName = pokemon.name.toLowerCase();
            const korName =
               pokemon.species?.names?.find((n) => n.language.name === "ko")
                  ?.name || "";
            const id = pokemon.id?.toString() || "";

            return (
               engName.includes(keyword) ||
               korName.toLowerCase().includes(keyword) ||
               id.includes(keyword)
            );
         });

         setList(filtered);
      } else {
         setList([]);
         setOffset(0);
      }
   }, [searchInfo, allPokemons]);

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

   // 무한스크롤 Intersection Observer
   useEffect(() => {
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
            isFiltering,
         }}
      >
         {children}
      </PokemonContext.Provider>
   );
}
