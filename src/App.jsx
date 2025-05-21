import SearchBar from "./SearchBar";
import "./App.css"; // importo css cosi do stile alla pagina per farlo somigliare a netflix

function App() {   //creiamo il componente app(react va per componenti)
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎬 BoolFlix</h1>                        {/**titolo pagina  */}
        <SearchBar />                               {/**questa è la navbar dove mettiamo i film */}
      </header>
    </div>
  );
}

export default App;                                 //app vienme esportato e reso disponibile dove serve

