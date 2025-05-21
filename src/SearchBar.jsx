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


        //aspetto che entrambi rispondano
        Promise.all([

            axios.get(urlMovie, { 
                params: { 
                    api_key: apiKey, 
                    query, 
                    language: "it-IT" 
                }
            }),

            axios.get(urlTV, { 
                params: { 
                    api_key: apiKey, 
                    query, 
                    language: "it-IT" 
                }
            })
            
        ])

        .then(([movieRes, tvRes]) => {
            
            //unisco i risultati, aggiungendo un campo "type" per capire se è film o serie
            const movies = movieRes.data.results.map(item => ({ ...item, type: "film" }));

            const series = tvRes.data.results.map(item => ({ ...item, type: "serie" }));

            //li unisco in un unico array
            setFilmTrovati([...movies, ...series]);

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

                {/*creo un contenitore con classe card-grid per visualizzarli in griglia*/}
                <div className="card-grid"> 

                    {filmTrovati.map((film) => (  

                        //ogni elemento dell'array filmTrovati diventa una card
                        <div className="card" key={film.id}> {/* ogni card ha immagine + info visibili con hover */}

                            {/*mostro l'immagine del film o della serie */}
                            {/*se poster_path esiste → mostro immagine; altrimenti messaggio di testo */}
                            {film.poster_path ? (

                                <img
                                    src={`https://image.tmdb.org/t/p/w342${film.poster_path}`} // creo URL completo
                                    alt={film.title || film.name} // se è un film usa title, se è una serie usa name
                                    style={{ width: "150px", display: "block", marginBottom: "10px" }} // stile immagine
                                />

                            ) : (
                                <p>[Nessuna immagine disponibile]</p> // caso in cui manca immagine
                            )}

                            {/*questa parte (card-hover) è nascosta di base e si vede solo con hover*/}
                            <div className="card-hover">

                                {/*mostro il titolo del film/serie*/}
                                <h3>{film.title || film.name}</h3>

                                {/*mostro il titolo originale*/}
                                <p>Titolo originale: {film.original_title || film.original_name}</p>

                                {/*mostro la lingua originale con bandiera e codice lingua*/}
                                {/*uso la funzione getFlag per convertire it → 🇮🇹 ecc*/}
                                <p>Lingua: {getFlag(film.original_language)} ({film.original_language})</p>

                                {/*mostro il voto medio (da 1 a 10) dato dagli utenti*/}
                                <p>Voto: {film.vote_average}</p>

                                {/*mostro se è un film o una serie, con emoji per renderlo più visivo*/}
                                <p>Tipo: {film.type === "film" ? "🎬 Film" : "📺 Serie TV"}</p>

                                {/*mostro la descrizione del contenuto (overview), se presente*/}
                                <p>Descrizione: {film.overview || "Nessuna descrizione disponibile."}</p>

                            </div> {/*fine hover*/}

                        </div> //fine card
                    ))} 

                </div> {/*fine griglia*/}

            </div>     

        </div>     
    );   
}


//FINO AD ORA
//Ho fatto una barra di ricerca per trovare i film tramite l'api di TMDb
//L'utente va a digitare un film nella barra 
//preme cerca, quando preme parte la richiesta axioas all'api
//prende i risultati e li mette inj pagina //unisce sia serie che film e le identifica con le iconer
    

export default SearchBar;
/*
--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
BOOLFLIX – PROGETTO REACT: SPIEGAZIONE COMPLETA DELLA LOGICA
---------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------

COSA HO FATTO:

    1️⃣ progetto React creato con Vite.
    Ho pulito i file iniziali (`App.jsx`, `index.css`, `App.css`) per partire da una base pulita.

    2️⃣ Ho creato un componente chiamato `SearchBar`, che contiene:
    - Un campo input controllato con `useState` per gestire cosa scrive l’utente
    - Un bottone che lancia una funzione `handleClick` per avviare la ricerca

    3️⃣ Quando clicco su “Cerca”:
    -Faccio 2 chiamate API con Axios (una per i film, una per le serie tv)
    - Uso `Promise.all` per aspettare entrambe
    - Unisco i risultati e li salvo nello stato `filmTrovati`

    4️⃣ Con `.map()` ciclo tutti i film/serie trovati e li stampo a schermo:
    - Mostro la **copertina**, il **titolo**, la **lingua** con bandiera 🇮🇹, il **voto**, la **descrizione** e se è **film o serie**

    5️⃣ Ho creato un layout a **griglia di card**:
    - Ogni card è uno stile personalizzato (`.card`) con immagine
    -Quando passo sopra col mouse (hover), appaiono info aggiuntive (`.card-hover`)

    6️⃣ Ho usato CSS per creare lo stile tipo Netflix:
    - Griglia responsive (`.card-grid`)
    - Effetto zoom al passaggio del mouse
    - Contenuto che scorre dal basso con `transform`

    - Tutta la logica si basa su:
    - React → per creare interfaccia con componenti e JSX
    - useState → per gestire stati dinamici (input, risultati)
    - Axios → per fare richieste API
    - map → per stampare dinamicamente i risultati
    - CSS + Hover → per creare un’interfaccia moderna

    -milestone principali:
    - Milestone 1 → ricerca film
    - Milestone 2 → ricerca serie + lingua con bandiera
    - Milestone 3 → copertina + info
    - Milestone 4 → layout griglia + hover

   ------------------------------------------------------------------------------------------------------------
   ------------------------------------------------------------------------------------------------------------

*/ 


