import Header from "./component/Header";
import Main from "./component/Main";
import SearchBox from "./component/SearchBox";

import { PokemonProvider } from "./component/PokemonProvider";

function App() {
   return (
      <div className="bg-gray-50 min-h-screen bg-[url('./assets/bg_repeat.png')] bg-center">
         <PokemonProvider>
            <Header />
            <SearchBox />
            <Main />
         </PokemonProvider>
      </div>
   );
}

export default App;
