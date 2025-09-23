import { useState, useEffect } from "react";

// for the pokemon icon inside the card you should use "sprites.other.official-artwork.front_default"
// 3 LINKS ON MY DISCORD SERVER #USEFUL-LINKS FOR TOMORROW

function Card(){
    const [cards, setCards] = useState([]);
    useEffect(()=>{
        const fetchData =  async ()=>{
            try{
                const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
                const data = await res.json();

                const detailedData = await Promise.all(
                    data.results.map(async(pokemon)=>{
                        const res = await fetch(pokemon.url);                      
                        return await res.json();
                    })
                );
                setCards(detailedData);
                console.log(detailedData);                
            }catch(error){
                console.log(error);                
            }
        }
        fetchData();
    },[]);

    return(
        <div>
            <h1>Memory Card</h1>
            <div className="card-list">
            {cards.length > 0 ? (
                cards.map((card, index)=>(
                    <div key={index} className="card">
                        <h2>{card.name}</h2>
                        <img src={card.sprites.front_default} alt={card.name} />
                    </div>
                ))
            ):(
                "Loading..."
            )}
            </div>
        </div>
    );
}

export default Card;