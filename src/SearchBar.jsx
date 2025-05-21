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

        if(query.trim()==="")return;

        console.log("hai ceracto", query);

        axios
      .get("https://api.themoviedb.org/3/search/movie", {  //FA LA RICHIESTA HTTP DI TIPO GET
        params: {//passiamo chiave d acercare
          api_key: "589082eb43c602060916a546e2dfc2ca",  //accedo alla mia api fatta sul sito
          query: query,     //rappresenta cio che è stato ncercato
          language: "it-IT", //la lingua
        },
      })
      .then((res) => {                //se la richiesta va bene, mostra in console, aggiorn i film
        console.log(res.data.results); // lista film
        setFilmTrovati(res.data.results); // aggiorna lo stato
      })
      .catch((err) => {
        console.error("Errore nella chiamata:", err); //se ce un errore stampa un messaggio di errore
      });
  
    

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
                    <h3>{film.title}</h3>             
                    {/*mostro il titolo originale del film*/}
                    <p>Titolo originale: {film.original_title}</p>             
                    {/*mostro la lingua originale del film*/}
                    <p>Lingua: {film.original_language}</p>             
                    {/*mostro il voto medio del film*/}
                    <p>Voto: {film.vote_average}</p>           
                </div>         
            ))}       
        </div>     
    </div>   
);





}

export default SearchBar;