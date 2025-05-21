import { useState } from "react"; //importo use state da react (è un hook di react ) cosi gestisco lo stato del componente
import axios from "axios"; //effettue chiamate api

//creo la mia funzione searchbar, che per l'appunto sara la mia navbar
function SearchBar(){

    //qui vado a definire lo stato del mio componente
    const [query, setQuery]=useState("");//query mi conserva il valore che mette l'utente, ed in questo caso è una stringa vuota
                                         //setQuery è una funzione che va ad aggiornare query

    const [filmTrovati, setFilmTrovati]=useState([]);  //contiene la lista dei film trovati dopo la richiesta all'API


    //ora vado a gestire i click sul bottone cerca
    const handleClick=()=>{

        if(query.trim()==="")return; //se la stringa è effetivamente vuota

        console.log("hai cercato", query);//controllo in console se la ricerac è partita 

        //devo fare 2 chiamate axios una per i film e una per le serie tv quindi cambio le richieste 

        const apiKey = "589082eb43c602060916a546e2dfc2ca";  //chiave API

        const urlMovie = "https://api.themoviedb.org/3/search/movie"; //richiesta film
        const urlTV = "https://api.themoviedb.org/3/search/tv"; //richiesta serie

        //richiesta film
        const movieRequest = axios.get(urlMovie, {
            params: {
                api_key: apiKey,
                query: query,
                language: "it-IT",
            },
        });

        //richiesta serie tv
        const tvRequest = axios.get(urlTV, {
            params: {
                api_key: apiKey,
                query: query,
                language: "it-IT",
            },
        });

        //aspetto che entrambi rispondano
        Promise.all([movieRequest, tvRequest])
            .then(([movieRes, tvRes]) => {
                //unisco i risultati, aggiungendo un campo "type" per capire se è film o serie
                const movies = movieRes.data.results.map(item => ({ ...item, type: "film" }));
                const series = tvRes.data.results.map(item => ({ ...item, type: "serie" }));

                //li unisco in un unico array
                const tutto = [...movies, ...series];

                //aggiorno lo stato
                setFilmTrovati(tutto);
            })
            .catch((err) => {
                console.error("Errore nella chiamata:", err); // Gestione degli errori
            });

    };

    //per fare le bandiere creo una funzione che me le coverte
    function getFlag(lang){
        const flags = {
            it: "🇮🇹",
            en: "🇺🇸",
            fr: "🇫🇷",
            ja: "🇯🇵",
            de: "🇩🇪",
            es: "🇪🇸",
            zh: "🇨🇳",
        };
        return flags[lang] || lang; // se la bandiera non nce scrive solo lang;
    };


    //qui metto la parte visiva del mio componente cioe la navbar     
    return(         
        <div>             
            <input             
                //qui creo il mio campo di testo per far mettere il film all'utente             
                type="text"              
                placeholder="Cerca un film o una serie..."             
                value={query}       //qui faccio mostrare sempre il valore di query             
                onChange={(e)=>setQuery(e.target.value)}  //va ad aggiornare query quando l'utente va a scrivere altro             
            />             
            <button onClick={handleClick}>Cerca</button> {/*qui l'utente fa partire la ricerca chiamando la funzione */}             

            <div>             
                {/*qui mappo tutti i film trovati e li mostro in una lista*/}
                {filmTrovati.map((film) => (           
                    <div key={film.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>             
                        {/*mostro il titolo del film*/}
                        <h3>{film.title || film.name}</h3>             
                        {/*mostro il titolo originale del film*/}
                        <p>Titolo originale: {film.original_title || film.original_name}</p>             
                        {/*mostro la lingua originale del film*/}
                        <p>{/*film.original_language  <----- soluzione di prima*/ <p>Lingua: {getFlag(film.original_language)} ({film.original_language})</p>
                    }</p>             
                        {/*mostro il voto medio del film*/}
                        <p>Voto: {film.vote_average}</p>
                        {/*mostro se è film o serie*/}
                        <p>Tipo: {film.type === "film" ? "🎬 Film" : "📺 Serie TV"}</p>           
                    </div>         
                ))}       
            </div>     
        </div>   
    );

    //FINO AD ORA
    //Ho fatto una barra di ricerca per trovare i film tramite l'api di TMDb
    //L'utente va a digitare un film nella barra 
    //preme cerca, quando preme parte la richiesta axioas all'api
    //prende i risultati e li mette inj pagina //unisce sia serie che film e le identifica con le iconer
    
}

export default SearchBar;
