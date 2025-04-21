import Header from "./component/Header";
import Main from "./component/Main";
import SearchBox from "./component/SearchBox";
import { PokemonProvider } from "./component/PokemonProvider";
import { ThemeProvider } from "./component/ThemeProvider";

function App() {
   return (
      <ThemeProvider>
         <div className="bg-gray-50 min-h-screen bg-[url('./assets/bg_repeat.png')] bg-center dark:bg-gray-800 transition-all">
            <PokemonProvider>
               <Header />
               <SearchBox />
               <Main />
            </PokemonProvider>
         </div>
      </ThemeProvider>
   );
}

export default App;
