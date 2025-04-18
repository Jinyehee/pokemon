// PokemonProvider.jsx

import { createContext, useEffect, useState, useRef } from "react";
import typeData from "./Typedata";

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
   const [list, setList] = useState([]);
   const [offset, setOffset] = useState(0);
   const limit = 20;
   const isFetching = useRef(false); // 중복 호출 방지

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
         setList((prev) => [...prev, ...details]);
         setOffset((prev) => prev + limit);
      } catch (error) {
         console.error(error);
      } finally {
         isFetching.current = false;
      }
   }

   useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
         if (entries[0].isIntersecting) {
            fetchPokemons(offset);
         }
      });

      const target = document.getElementById("observer");
      if (target) observer.observe(target);

      return () => observer.disconnect();
   }, [offset]);

   return (
      <PokemonContext.Provider value={{ list, typeData }}>
         {children}
      </PokemonContext.Provider>
   );
}
