import { useState } from "react"; //importo use state da react (è un hook di react ) cosi gestisco lo stato del componente

//creo la mia funzione searchbar, che per l'appunto sara la mia navbar
function SearchBar(){

    //qui vado a definire lo stato del mio componente
    const [query, setQuery]=useState("");//query mi conserva il valore che mette l'utente, ed in questo caso è una stringa vuota
                                         //setQuery è una funzione che va ad aggiornare query


    //ora vado a gestire i click sul bottone cerca
    const handleClick=()=>{

        console.log("hai ceracto", query);

    };


    //qui metto la parte visisva del mio componente cioe la navbar
    return(
        <div>
            <input             //qui creo il mio campo di testo per far mettere il film all'utente
            type="text" 
            placeholder="Cerca un film o una serie..."
            value={query}       //qui faccio mostrare sempre il valore di query
            onChange={(e)=>setQuery(e.target.value)}  //va ad aggiornare query quando l'utente va a scrivere altro
            />
            <button onClick={handleClick}>Cerca</button> {/*qui l'utente fda partire la ricerca chiamando la funzione */ }
        </div>
    );






}

export default SearchBar;